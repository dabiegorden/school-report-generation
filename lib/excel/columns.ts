import { DEFAULT_SUBJECTS } from "@/lib/calculations"

/** Leading identity columns, in template order. */
export const LEADING_COLUMNS = [
  "Student Name",
  "Admission Number",
  "Current Class",
  "Roll Number",
  "Attendance",
] as const

/** Trailing qualitative columns, in template order. */
export const TRAILING_COLUMNS = [
  "Interest",
  "Attitude",
  "Conduct",
  "Head Teacher Remark",
  "Class Teacher Remark",
] as const

export type SubjectColumn = {
  subject: string
  ca: string
  exam: string
}

/** The `<Subject> CA` / `<Subject> Exam` column pair for each subject. */
export function subjectColumns(): SubjectColumn[] {
  return DEFAULT_SUBJECTS.map((subject) => ({
    subject,
    ca: `${subject} CA`,
    exam: `${subject} Exam`,
  }))
}

/** The full ordered list of required column headers. */
export function templateHeaders(): string[] {
  const subjectHeaders = subjectColumns().flatMap((c) => [c.ca, c.exam])
  return [...LEADING_COLUMNS, ...subjectHeaders, ...TRAILING_COLUMNS]
}
