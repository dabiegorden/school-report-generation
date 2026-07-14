import "server-only"
import { desc, eq } from "drizzle-orm"

import { db, reports, type Report } from "@/db"

/** All saved reports, newest first. */
export async function getReports(): Promise<Report[]> {
  return db.select().from(reports).orderBy(desc(reports.createdAt))
}

/** A single report by id, or undefined if not found. */
export async function getReportById(id: string): Promise<Report | undefined> {
  const [report] = await db
    .select()
    .from(reports)
    .where(eq(reports.id, id))
    .limit(1)
  return report
}
