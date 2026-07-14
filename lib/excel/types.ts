/** One subject's raw scores as read from a spreadsheet cell pair. */
export type ImportedSubject = {
  subject: string
  classScore: number
  examScore: number
}

/**
 * A single parsed student row. Fully serializable so it can cross the
 * server/client boundary. `errors` is empty when the row is valid.
 */
export type ImportedStudent = {
  /** Stable client id for list keys and row deletion. */
  id: string
  /** 1-based spreadsheet row number (row 1 is the header). */
  rowNumber: number
  studentName: string
  admissionNumber: string
  currentClass: string
  rollNumber: string
  attendance: string
  subjects: ImportedSubject[]
  interest: string
  attitude: string
  conduct: string
  headTeacherRemark: string
  classTeacherRemark: string
  errors: string[]
}

/** Result of parsing an uploaded workbook. */
export type ParseResult =
  | { ok: true; students: ImportedStudent[] }
  | { ok: false; error: string }
