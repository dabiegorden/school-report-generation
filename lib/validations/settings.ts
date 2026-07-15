import { z } from "zod"

/** School settings form: every field is optional text (may be left blank). */
export const settingsFormSchema = z.object({
  schoolName: z.string(),
  address: z.string(),
  phone: z.string(),
  logo: z.string(),
  headTeacherName: z.string(),
  headTeacherSignature: z.string(),
  defaultClassTeacher: z.string(),
  classTeacherSignature: z.string(),
  academicYear: z.string(),
  currentTerm: z.string(),
  nextTermBegins: z.string(),
  reportHeaderTitle: z.string(),
  reportFooterNote: z.string(),
  reportAccentColor: z.string(),
  reportSectionColor: z.string(),
})

export type SettingsFormValues = z.infer<typeof settingsFormSchema>
