/** A single subject's scores after enrichment with total and grade. */
export type SubjectScore = {
  subject: string
  classScore: number
  examScore: number
  total: number
  grade: number
  /** Subject position within the class. Not computed in this phase. */
  position: number | null
}

/** Raw subject input, before totals and grades are derived. */
export type SubjectInput = {
  subject: string
  classScore: number
  examScore: number
  position?: number | null
}

/** Aggregate figures for a whole report. */
export type ReportSummary = {
  totalObtainable: number
  grandTotal: number
  percentage: number
  average: number
  overallGrade: number
}

/** A grade band on the school grading scale. */
export type GradeBand = {
  min: number
  max: number
  grade: number
}
