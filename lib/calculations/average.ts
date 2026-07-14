import type { SubjectScore } from "./types"
import { round2 } from "./utils"

/** Average of the given subject totals (0 when there are no subjects). */
export function getAverage(subjects: SubjectScore[]): number {
  if (subjects.length === 0) return 0
  const total = subjects.reduce((sum, subject) => sum + subject.total, 0)
  return round2(total / subjects.length)
}
