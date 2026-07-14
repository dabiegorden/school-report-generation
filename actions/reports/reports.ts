"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

import { db, reports, type NewReport } from "@/db"
import { getCurrentUser } from "@/lib/auth/auth"
import { buildSubjectScores, getSummary } from "@/lib/calculations"
import { reportFormSchema } from "@/lib/validations/report"

export type ReportActionResult = {
  success: boolean
  error?: string
  id?: string
}

/**
 * Turn validated form values into the persisted report shape. Totals, grades
 * and the summary are recomputed here so stored numbers never depend on
 * client-supplied values.
 */
function toReportRow(values: unknown): NewReport | { error: string } {
  const parsed = reportFormSchema.safeParse(values)
  if (!parsed.success) {
    return { error: "Please fix the highlighted fields and try again." }
  }

  const data = parsed.data
  const subjects = buildSubjectScores(data.subjects)
  const summary = getSummary(subjects)

  return {
    studentName: data.studentName,
    admissionNumber: data.admissionNumber,
    currentClass: data.currentClass,
    rollNumber: data.rollNumber,
    attendance: data.attendance,
    classTeacher: data.classTeacher,
    academicYear: data.academicYear,
    term: data.term,
    subjects,
    grandTotal: summary.grandTotal,
    average: summary.average,
    percentage: summary.percentage,
    overallGrade: summary.overallGrade,
    interest: data.interest,
    attitude: data.attitude,
    conduct: data.conduct,
    headTeacherRemark: data.headTeacherRemark,
    classTeacherRemark: data.classTeacherRemark,
  }
}

/** Create a new report. */
export async function saveReport(
  values: unknown
): Promise<ReportActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: "Not authenticated." }

  const row = toReportRow(values)
  if ("error" in row) return { success: false, error: row.error }

  const [created] = await db.insert(reports).values(row).returning({
    id: reports.id,
  })

  revalidatePath("/dashboard/reports")
  return { success: true, id: created.id }
}

/** Update an existing report. */
export async function updateReport(
  id: string,
  values: unknown
): Promise<ReportActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: "Not authenticated." }

  const row = toReportRow(values)
  if ("error" in row) return { success: false, error: row.error }

  await db.update(reports).set(row).where(eq(reports.id, id))

  revalidatePath("/dashboard/reports")
  revalidatePath(`/dashboard/reports/${id}`)
  return { success: true, id }
}

/** Delete a report. */
export async function deleteReport(id: string): Promise<ReportActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: "Not authenticated." }

  await db.delete(reports).where(eq(reports.id, id))

  revalidatePath("/dashboard/reports")
  return { success: true }
}
