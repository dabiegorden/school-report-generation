import { buildSubjectScores, getSummary } from "./summary"
import type { ReportSummary, SubjectInput, SubjectScore } from "./types"

/**
 * Standard competition ranking ("1224"): equal values share the higher rank
 * and the next distinct value skips accordingly. Ranks by value descending, so
 * the highest score is position 1.
 *
 * Example: [80, 80, 75] → [1, 1, 3].
 */
export function computeRanks(values: number[]): number[] {
  const ordered = values
    .map((value, index) => ({ value, index }))
    .sort((a, b) => b.value - a.value)

  const ranks = new Array<number>(values.length)
  let previous: number | null = null
  let rank = 0

  ordered.forEach((entry, position) => {
    if (previous === null || entry.value < previous) {
      rank = position + 1
    }
    ranks[entry.index] = rank
    previous = entry.value
  })

  return ranks
}

/**
 * Assign a position to every subject across a whole class. Input is a matrix
 * where each inner array is one student's subjects (same order for all
 * students). Returns a new matrix with `position` filled per subject.
 */
export function calculateSubjectPositions(
  classSubjects: SubjectScore[][]
): SubjectScore[][] {
  const studentCount = classSubjects.length
  if (studentCount === 0) return []

  const subjectCount = classSubjects[0].length

  // Clone so the input is never mutated.
  const result = classSubjects.map((subjects) =>
    subjects.map((subject) => ({ ...subject }))
  )

  for (let s = 0; s < subjectCount; s += 1) {
    const totals = result.map((subjects) => subjects[s]?.total ?? 0)
    const ranks = computeRanks(totals)
    ranks.forEach((rank, student) => {
      if (result[student][s]) {
        result[student][s].position = rank
      }
    })
  }

  return result
}

/** Rank students by grand total (highest = position 1), handling ties. */
export function calculateOverallPositions(grandTotals: number[]): number[] {
  return computeRanks(grandTotals)
}

/** A student's raw scores, before class-wide enrichment. */
export type ClassMember = {
  subjects: SubjectInput[]
}

/** Fully computed result for one student within a class. */
export type StudentResult = {
  subjects: SubjectScore[]
  summary: ReportSummary
  overallPosition: number
}

/**
 * Compute every student's totals, grades, summary, subject positions and
 * overall position in one pass. Reuses the existing calculation engine — the
 * single source of truth for totals and grading.
 */
export function computeClassResults(members: ClassMember[]): StudentResult[] {
  const scored = members.map((member) => buildSubjectScores(member.subjects))
  const positioned = calculateSubjectPositions(scored)
  const summaries = positioned.map(getSummary)
  const overall = calculateOverallPositions(summaries.map((s) => s.grandTotal))

  return positioned.map((subjects, index) => ({
    subjects,
    summary: summaries[index],
    overallPosition: overall[index],
  }))
}
