import type { Report } from "@/db"

/** Slug a value into filename-safe characters. */
function slug(value: string): string {
  return value
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "_")
}

/**
 * Download filename for a report, e.g. "312_Dartey_Okofo_Martina.pdf".
 */
export function reportFileName(report: Report): string {
  const admission = slug(report.admissionNumber) || "report"
  const name = slug(report.studentName) || "student"
  return `${admission}_${name}.pdf`
}
