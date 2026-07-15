import "server-only"
import { and, asc, desc, eq, ilike, or, type SQL } from "drizzle-orm"

import { db, reports, type Report } from "@/db"

export const REPORT_SORTS = ["newest", "oldest", "highest", "lowest"] as const
export type ReportSort = (typeof REPORT_SORTS)[number]

export type ReportFilters = {
  q?: string
  currentClass?: string
  term?: string
  academicYear?: string
  sort?: ReportSort
}

/** Map a sort key to its ORDER BY clause. */
function orderFor(sort: ReportSort | undefined): SQL {
  switch (sort) {
    case "oldest":
      return asc(reports.createdAt)
    case "highest":
      return desc(reports.grandTotal)
    case "lowest":
      return asc(reports.grandTotal)
    case "newest":
    default:
      return desc(reports.createdAt)
  }
}

/** Build the WHERE clause for the given filters (undefined = no filtering). */
function buildConditions(filters: ReportFilters): SQL | undefined {
  const conditions: SQL[] = []

  if (filters.q) {
    const pattern = `%${filters.q}%`
    const search = or(
      ilike(reports.studentName, pattern),
      ilike(reports.admissionNumber, pattern)
    )
    if (search) conditions.push(search)
  }
  if (filters.currentClass) {
    conditions.push(eq(reports.currentClass, filters.currentClass))
  }
  if (filters.term) conditions.push(eq(reports.term, filters.term))
  if (filters.academicYear) {
    conditions.push(eq(reports.academicYear, filters.academicYear))
  }

  return conditions.length > 0 ? and(...conditions) : undefined
}

/** Reports matching the filters, newest first. */
export async function getReports(
  filters: ReportFilters = {}
): Promise<Report[]> {
  return db
    .select()
    .from(reports)
    .where(buildConditions(filters))
    .orderBy(orderFor(filters.sort))
}

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * A single report by id, or undefined if not found. Malformed ids are treated
 * as "not found" rather than reaching Postgres, which would raise an invalid
 * uuid error and surface as a 500.
 */
export async function getReportById(id: string): Promise<Report | undefined> {
  if (!UUID_PATTERN.test(id)) return undefined

  const [report] = await db
    .select()
    .from(reports)
    .where(eq(reports.id, id))
    .limit(1)
  return report
}

export type ReportFilterOptions = {
  classes: string[]
  terms: string[]
  academicYears: string[]
}

/** Distinct, non-empty values for the filter dropdowns. */
export async function getReportFilterOptions(): Promise<ReportFilterOptions> {
  const rows = await db
    .select({
      currentClass: reports.currentClass,
      term: reports.term,
      academicYear: reports.academicYear,
    })
    .from(reports)

  const distinct = (values: string[]) =>
    [...new Set(values.filter((v) => v.trim() !== ""))].sort()

  return {
    classes: distinct(rows.map((r) => r.currentClass)),
    terms: distinct(rows.map((r) => r.term)),
    academicYears: distinct(rows.map((r) => r.academicYear)),
  }
}
