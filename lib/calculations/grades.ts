import { MAX_SUBJECT_TOTAL } from "./constants"
import type { GradeBand } from "./types"
import { clamp } from "./utils"

/**
 * The school grading scale, applied to a 0–100 total. This is the single
 * source of truth for grading — never duplicate these bands elsewhere.
 */
export const GRADE_SCALE: GradeBand[] = [
  { min: 90, max: 100, grade: 1 },
  { min: 80, max: 89, grade: 2 },
  { min: 70, max: 79, grade: 3 },
  { min: 60, max: 69, grade: 4 },
  { min: 50, max: 59, grade: 5 },
  { min: 40, max: 49, grade: 6 },
  { min: 30, max: 39, grade: 7 },
  { min: 20, max: 29, grade: 8 },
  { min: 0, max: 19, grade: 9 },
]

/** Lowest (worst) grade, used as a safe fallback. */
const LOWEST_GRADE = 9

/** Map a 0–100 score to its grade (1 = best, 9 = worst). */
export function getGrade(score: number): number {
  const value = clamp(score, 0, MAX_SUBJECT_TOTAL)
  const band = GRADE_SCALE.find((b) => value >= b.min && value <= b.max)
  return band ? band.grade : LOWEST_GRADE
}
