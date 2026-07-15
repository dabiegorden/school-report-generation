import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

import { GRADE_SCALE } from "../../lib/calculations"
import type { GradeBand } from "../../lib/calculations"

/**
 * Single-row table holding the one school's configuration. A row is created
 * automatically on first access (see `getSchoolSettings`).
 */
export const schoolSettings = pgTable("school_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  schoolName: text("school_name").notNull().default(""),
  address: text("address").notNull().default(""),
  phone: text("phone").notNull().default(""),
  logo: text("logo").notNull().default(""),
  headTeacherName: text("head_teacher_name").notNull().default(""),
  headTeacherSignature: text("head_teacher_signature").notNull().default(""),
  defaultClassTeacher: text("default_class_teacher").notNull().default(""),
  classTeacherSignature: text("class_teacher_signature").notNull().default(""),
  academicYear: text("academic_year").notNull().default(""),
  currentTerm: text("current_term").notNull().default(""),
  nextTermBegins: text("next_term_begins").notNull().default(""),
  /** Default title printed under the school name on report PDFs. */
  reportHeaderTitle: text("report_header_title")
    .notNull()
    .default("TERMINAL REPORT"),
  /** Default note printed in the report PDF footer (blank = school name). */
  reportFooterNote: text("report_footer_note").notNull().default(""),
  /** Primary colour: school name, header rule, table headings, logo tile. */
  reportAccentColor: text("report_accent_color").notNull().default("#1E3A8A"),
  /** Background colour for section heading bars. */
  reportSectionColor: text("report_section_color").notNull().default("#EEF2FF"),
  gradingScale: jsonb("grading_scale")
    .$type<GradeBand[]>()
    .notNull()
    .default(GRADE_SCALE),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type SchoolSettings = typeof schoolSettings.$inferSelect
export type NewSchoolSettings = typeof schoolSettings.$inferInsert
