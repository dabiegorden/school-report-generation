import "server-only"
import { avg, count, countDistinct, max } from "drizzle-orm"

import { db, reports } from "@/db"

export type DashboardStats = {
  totalReports: number
  classes: number
  averageScore: number
  topScore: number
}

/** Aggregate figures for the dashboard home cards. */
export async function getDashboardStats(): Promise<DashboardStats> {
  const [row] = await db
    .select({
      total: count(),
      classes: countDistinct(reports.currentClass),
      average: avg(reports.average),
      top: max(reports.grandTotal),
    })
    .from(reports)

  return {
    totalReports: row?.total ?? 0,
    classes: row?.classes ?? 0,
    averageScore: row?.average ? Math.round(Number(row.average) * 10) / 10 : 0,
    topScore: row?.top ?? 0,
  }
}
