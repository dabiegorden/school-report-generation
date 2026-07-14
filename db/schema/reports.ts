import {
  integer,
  jsonb,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

import type { SubjectScore } from "../../lib/calculations"

/**
 * A saved student report. Subject rows are denormalized into a JSON column to
 * keep the schema simple (one row per report).
 */
export const reports = pgTable("reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentName: text("student_name").notNull(),
  admissionNumber: text("admission_number").notNull(),
  currentClass: text("current_class").notNull(),
  rollNumber: text("roll_number").notNull().default(""),
  attendance: text("attendance").notNull().default(""),
  classTeacher: text("class_teacher").notNull().default(""),
  academicYear: text("academic_year").notNull().default(""),
  term: text("term").notNull().default(""),
  subjects: jsonb("subjects").$type<SubjectScore[]>().notNull(),
  grandTotal: integer("grand_total").notNull(),
  average: real("average").notNull(),
  percentage: real("percentage").notNull(),
  overallGrade: integer("overall_grade").notNull(),
  /** Class position by grand total. Null for single manual entries. */
  overallPosition: integer("overall_position"),
  interest: text("interest").notNull().default(""),
  attitude: text("attitude").notNull().default(""),
  conduct: text("conduct").notNull().default(""),
  headTeacherRemark: text("head_teacher_remark").notNull().default(""),
  classTeacherRemark: text("class_teacher_remark").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type Report = typeof reports.$inferSelect
export type NewReport = typeof reports.$inferInsert
