import type { StudentResult } from "@/lib/calculations"
import type { ImportedStudent } from "@/lib/excel/types"

/** A preview row: the parsed student, its computed results, and merged errors. */
export type PreviewRow = {
  student: ImportedStudent
  result: StudentResult
  /** Intrinsic parse errors plus set-dependent duplicate errors. */
  errors: string[]
  valid: boolean
}
