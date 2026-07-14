import { z } from "zod"

import { MAX_CLASS_SCORE, MAX_EXAM_SCORE } from "@/lib/calculations"

/** A score field: numeric and within [0, max]. Empty inputs (NaN) are rejected. */
function scoreSchema(max: number) {
  return z
    .number({ error: "Enter a score" })
    .min(0, { message: `Enter 0–${max}` })
    .max(max, { message: `Enter 0–${max}` })
}

export const subjectInputSchema = z.object({
  subject: z.string().min(1),
  classScore: scoreSchema(MAX_CLASS_SCORE),
  examScore: scoreSchema(MAX_EXAM_SCORE),
  position: z.number().nullable(),
})

export const reportFormSchema = z.object({
  studentName: z.string().min(1, { message: "Student name is required" }),
  admissionNumber: z
    .string()
    .min(1, { message: "Admission number is required" }),
  currentClass: z.string().min(1, { message: "Class is required" }),
  rollNumber: z.string(),
  attendance: z.string(),
  classTeacher: z.string(),
  academicYear: z.string(),
  term: z.string(),
  subjects: z.array(subjectInputSchema).min(1, {
    message: "At least one subject is required",
  }),
  interest: z.string(),
  attitude: z.string(),
  conduct: z.string(),
  headTeacherRemark: z.string(),
  classTeacherRemark: z.string(),
})

export type ReportFormValues = z.infer<typeof reportFormSchema>
export type SubjectInputValues = z.infer<typeof subjectInputSchema>
