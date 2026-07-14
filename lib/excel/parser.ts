import "server-only"
import * as XLSX from "xlsx"

import { MAX_CLASS_SCORE, MAX_EXAM_SCORE } from "@/lib/calculations"
import { subjectColumns, templateHeaders } from "./columns"
import type { ImportedStudent, ImportedSubject, ParseResult } from "./types"

/** Attendance must look like "52/54". */
const ATTENDANCE_PATTERN = /^\s*\d+\s*\/\s*\d+\s*$/

type Cell = string | number | boolean | null | undefined
type SheetRow = Record<string, Cell>

function asText(value: Cell): string {
  if (value === null || value === undefined) return ""
  return String(value).trim()
}

/** Validate one score cell, returning either the number or an error message. */
function readScore(
  value: Cell,
  label: string,
  max: number
): { value: number; error?: string } {
  if (value === "" || value === null || value === undefined) {
    return { value: 0, error: `${label} is empty` }
  }
  const num = Number(value)
  if (Number.isNaN(num)) {
    return { value: 0, error: `${label} must be a number` }
  }
  if (num < 0 || num > max) {
    return { value: num, error: `${label} must be between 0 and ${max}` }
  }
  return { value: num }
}

/**
 * Parse and validate an uploaded workbook. Reads the first worksheet, checks
 * that all required columns are present, then validates every row — collecting
 * all errors rather than stopping at the first. Never throws on bad input.
 */
export function parseWorkbook(data: ArrayBuffer): ParseResult {
  let sheetRows: SheetRow[]
  let headers: string[]

  try {
    const workbook = XLSX.read(data, { type: "array" })
    const sheetName = workbook.SheetNames[0]
    if (!sheetName) {
      return { ok: false, error: "The workbook has no sheets." }
    }
    const sheet = workbook.Sheets[sheetName]
    sheetRows = XLSX.utils.sheet_to_json<SheetRow>(sheet, { defval: "" })
    const headerMatrix = XLSX.utils.sheet_to_json<Cell[]>(sheet, {
      header: 1,
      range: 0,
    })
    headers = (headerMatrix[0] ?? []).map(asText)
  } catch {
    return {
      ok: false,
      error: "Could not read the file. It may be corrupted or not a workbook.",
    }
  }

  // Header validation.
  const required = templateHeaders()
  const present = new Set(headers)
  const missing = required.filter((h) => !present.has(h))
  if (missing.length > 0) {
    return {
      ok: false,
      error: `The file is missing required columns: ${missing.join(", ")}.`,
    }
  }

  if (sheetRows.length === 0) {
    return { ok: false, error: "The file has no data rows." }
  }

  const columns = subjectColumns()

  const students: ImportedStudent[] = sheetRows.map((row, index) => {
    const errors: string[] = []
    const rowNumber = index + 2 // header occupies row 1

    const studentName = asText(row["Student Name"])
    const admissionNumber = asText(row["Admission Number"])
    const currentClass = asText(row["Current Class"])
    const attendance = asText(row["Attendance"])

    if (!studentName) errors.push("Student Name is required")
    if (!admissionNumber) errors.push("Admission Number is required")
    if (!currentClass) errors.push("Current Class is required")
    if (!ATTENDANCE_PATTERN.test(attendance)) {
      errors.push('Attendance must look like "52/54"')
    }

    const subjects: ImportedSubject[] = columns.map((column) => {
      const ca = readScore(row[column.ca], `${column.subject} CA`, MAX_CLASS_SCORE)
      const exam = readScore(
        row[column.exam],
        `${column.subject} Exam`,
        MAX_EXAM_SCORE
      )
      if (ca.error) errors.push(ca.error)
      if (exam.error) errors.push(exam.error)
      return {
        subject: column.subject,
        classScore: ca.value,
        examScore: exam.value,
      }
    })

    return {
      id: crypto.randomUUID(),
      rowNumber,
      studentName,
      admissionNumber,
      currentClass,
      rollNumber: asText(row["Roll Number"]),
      attendance,
      subjects,
      interest: asText(row["Interest"]),
      attitude: asText(row["Attitude"]),
      conduct: asText(row["Conduct"]),
      headTeacherRemark: asText(row["Head Teacher Remark"]),
      classTeacherRemark: asText(row["Class Teacher Remark"]),
      errors,
    }
  })

  // Duplicate-admission checks are set-dependent (rows can be deleted in the
  // preview), so they are computed live on the client and re-enforced in the
  // save action — not baked into these intrinsic per-row errors.
  return { ok: true, students }
}
