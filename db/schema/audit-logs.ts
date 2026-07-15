import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

/** Recognized audit actions. Kept as a const union for type-safety. */
export const AUDIT_ACTIONS = [
  "login",
  "report.created",
  "report.updated",
  "report.deleted",
  "report.duplicated",
  "bulk.imported",
  "settings.updated",
] as const

export type AuditAction = (typeof AUDIT_ACTIONS)[number]

/** Append-only activity log of important administrator actions. */
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userEmail: text("user_email").notNull(),
  action: text("action").$type<AuditAction>().notNull(),
  detail: text("detail").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export type AuditLog = typeof auditLogs.$inferSelect
export type NewAuditLog = typeof auditLogs.$inferInsert
