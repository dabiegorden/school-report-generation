import type { AuditAction } from "@/db"

/** Human-readable label for each audit action. */
export const ACTION_LABELS: Record<AuditAction, string> = {
  login: "Signed in",
  "report.created": "Created a report",
  "report.updated": "Updated a report",
  "report.deleted": "Deleted a report",
  "report.duplicated": "Duplicated a report",
  "bulk.imported": "Imported reports",
  "settings.updated": "Updated school settings",
}
