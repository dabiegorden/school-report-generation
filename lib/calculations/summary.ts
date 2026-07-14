import { MAX_SUBJECT_TOTAL } from "./constants"
import { getAverage } from "./average"
import { getGrade } from "./grades"
import { getGrandTotal, getSubjectTotal } from "./totals"
import type { ReportSummary, SubjectInput, SubjectScore } from "./types"
import { round2 } from "./utils"

/**
 * Enrich raw subject inputs with their derived total and grade. This is the
 * canonical shape stored on a report and rendered live in the form.
 */
export function buildSubjectScores(inputs: SubjectInput[]): SubjectScore[] {
  return inputs.map((input) => {
    const total = getSubjectTotal(input.classScore, input.examScore)
    return {
      subject: input.subject,
      classScore: input.classScore,
      examScore: input.examScore,
      total,
      grade: getGrade(total),
      position: input.position ?? null,
    }
  })
}

/**
 * Compute the aggregate summary for a set of enriched subjects: total
 * obtainable, grand total, percentage, average and overall grade.
 */
export function getSummary(subjects: SubjectScore[]): ReportSummary {
  const totalObtainable = subjects.length * MAX_SUBJECT_TOTAL
  const grandTotal = getGrandTotal(subjects)
  const average = getAverage(subjects)
  const percentage =
    totalObtainable === 0 ? 0 : round2((grandTotal / totalObtainable) * 100)

  return {
    totalObtainable,
    grandTotal,
    percentage,
    average,
    overallGrade: getGrade(average),
  }
}
