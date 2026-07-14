"use server"

import { revalidatePath } from "next/cache"

import { db, reports, type NewReport } from "@/db"
import { getCurrentUser } from "@/lib/auth/auth"
import { computeClassResults } from "@/lib/calculations"
import { getSchoolSettings } from "@/features/settings/queries"
import { parseWorkbook } from "@/lib/excel/parser"
import type { ParseResult } from "@/lib/excel/types"
import { importPayloadSchema } from "@/lib/validations/import"

const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10 MB
const ACCEPTED_EXTENSIONS = [".xlsx", ".xls"]

export type SaveImportResult = {
  success: boolean
  error?: string
  count?: number
}

/** Parse and validate an uploaded workbook, returning preview data. */
export async function parseImport(formData: FormData): Promise<ParseResult> {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: "Not authenticated." }

  const file = formData.get("file")
  if (!(file instanceof File)) {
    return { ok: false, error: "No file was uploaded." }
  }
  if (file.size === 0) {
    return { ok: false, error: "The uploaded file is empty." }
  }
  if (file.size > MAX_FILE_BYTES) {
    return { ok: false, error: "The file exceeds the 10 MB limit." }
  }
  if (!ACCEPTED_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext))) {
    return { ok: false, error: "Only .xlsx and .xls files are supported." }
  }

  const buffer = await file.arrayBuffer()
  return parseWorkbook(buffer)
}

/**
 * Persist a validated class of reports. Totals, grades and positions are
 * recomputed server-side over the final set so stored values are trustworthy.
 * All rows are written in a single multi-row INSERT — atomic by nature, so a
 * failure rolls back the whole import (no partial writes).
 */
export async function saveImport(payload: unknown): Promise<SaveImportResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: "Not authenticated." }

  const parsed = importPayloadSchema.safeParse(payload)
  if (!parsed.success) {
    return {
      success: false,
      error: "Some rows are invalid. Please fix or remove them and try again.",
    }
  }

  const students = parsed.data

  // Guard against duplicate admission numbers within the batch.
  const seen = new Set<string>()
  for (const student of students) {
    const key = student.admissionNumber.toLowerCase()
    if (seen.has(key)) {
      return {
        success: false,
        error: `Duplicate admission number in import: ${student.admissionNumber}`,
      }
    }
    seen.add(key)
  }

  const results = computeClassResults(
    students.map((s) => ({ subjects: s.subjects }))
  )

  // Fill period/teacher defaults from the single school-settings record.
  const settings = await getSchoolSettings()

  const rows: NewReport[] = students.map((student, index) => {
    const { subjects, summary, overallPosition } = results[index]
    return {
      studentName: student.studentName,
      admissionNumber: student.admissionNumber,
      currentClass: student.currentClass,
      rollNumber: student.rollNumber,
      attendance: student.attendance,
      classTeacher: settings.defaultClassTeacher,
      academicYear: settings.academicYear,
      term: settings.currentTerm,
      subjects,
      grandTotal: summary.grandTotal,
      average: summary.average,
      percentage: summary.percentage,
      overallGrade: summary.overallGrade,
      overallPosition,
      interest: student.interest,
      attitude: student.attitude,
      conduct: student.conduct,
      headTeacherRemark: student.headTeacherRemark,
      classTeacherRemark: student.classTeacherRemark,
    }
  })

  try {
    await db.insert(reports).values(rows)
  } catch {
    return {
      success: false,
      error: "Could not save the reports. No records were imported.",
    }
  }

  revalidatePath("/dashboard/reports")
  return { success: true, count: rows.length }
}
