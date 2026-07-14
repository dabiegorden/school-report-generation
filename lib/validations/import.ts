import { z } from "zod"

import { MAX_CLASS_SCORE, MAX_EXAM_SCORE } from "@/lib/calculations"

const ATTENDANCE_PATTERN = /^\s*\d+\s*\/\s*\d+\s*$/

function score(max: number) {
  return z
    .number({ error: "must be a number" })
    .min(0, { message: `must be 0–${max}` })
    .max(max, { message: `must be 0–${max}` })
}

const importSubjectSchema = z.object({
  subject: z.string().min(1),
  classScore: score(MAX_CLASS_SCORE),
  examScore: score(MAX_EXAM_SCORE),
})

/** A single imported student, validated before persistence. */
export const importStudentSchema = z.object({
  studentName: z.string().min(1),
  admissionNumber: z.string().min(1),
  currentClass: z.string().min(1),
  rollNumber: z.string(),
  attendance: z.string().regex(ATTENDANCE_PATTERN, { message: "invalid attendance" }),
  subjects: z.array(importSubjectSchema).min(1),
  interest: z.string(),
  attitude: z.string(),
  conduct: z.string(),
  headTeacherRemark: z.string(),
  classTeacherRemark: z.string(),
})

/** The full payload sent to the save action. */
export const importPayloadSchema = z.array(importStudentSchema).min(1)

export type ImportStudentValues = z.infer<typeof importStudentSchema>
