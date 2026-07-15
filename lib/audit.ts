import "server-only"
import { desc } from "drizzle-orm"

import { db, auditLogs, type AuditAction, type AuditLog } from "@/db"

/**
 * Record an audit-log entry. Best-effort: any failure is swallowed so logging
 * can never break the action it is observing.
 */
export async function logActivity(
  userEmail: string,
  action: AuditAction,
  detail = ""
): Promise<void> {
  try {
    await db.insert(auditLogs).values({ userEmail, action, detail })
  } catch {
    // Intentionally ignored — the audit log is non-critical.
  }
}

/** Most recent activity entries, newest first. */
export async function getRecentActivity(limit = 100): Promise<AuditLog[]> {
  return db
    .select()
    .from(auditLogs)
    .orderBy(desc(auditLogs.createdAt))
    .limit(limit)
}
