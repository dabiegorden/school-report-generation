import {
  REPORT_SORTS,
  type ReportFilters,
  type ReportSort,
} from "@/features/reports/queries"

/** Read report filters from URL search params (all optional). */
export function parseReportFilters(
  params: URLSearchParams | Record<string, string | string[] | undefined>
): ReportFilters {
  const get = (key: string): string => {
    const value =
      params instanceof URLSearchParams ? params.get(key) : params[key]
    return (Array.isArray(value) ? value[0] : value)?.trim() ?? ""
  }

  const filters: ReportFilters = {}
  const q = get("q")
  const currentClass = get("class")
  const term = get("term")
  const academicYear = get("year")

  if (q) filters.q = q
  if (currentClass) filters.currentClass = currentClass
  if (term) filters.term = term
  if (academicYear) filters.academicYear = academicYear

  const sort = get("sort")
  if (REPORT_SORTS.includes(sort as ReportSort)) {
    filters.sort = sort as ReportSort
  }
  return filters
}
