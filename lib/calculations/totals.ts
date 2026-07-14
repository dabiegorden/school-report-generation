import { MAX_CLASS_SCORE, MAX_EXAM_SCORE } from "./constants"
import type { SubjectScore } from "./types"
import { clamp } from "./utils"

/** Total for a single subject: class score + exam score, each clamped. */
export function getSubjectTotal(classScore: number, examScore: number): number {
  return (
    clamp(classScore, 0, MAX_CLASS_SCORE) + clamp(examScore, 0, MAX_EXAM_SCORE)
  )
}

/** Sum of every subject total (the grand total). */
export function getGrandTotal(subjects: SubjectScore[]): number {
  return subjects.reduce((sum, subject) => sum + subject.total, 0)
}
