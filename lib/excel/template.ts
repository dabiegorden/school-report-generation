import "server-only"
import * as XLSX from "xlsx"

import { subjectColumns, templateHeaders } from "./columns"

/**
 * Build a correctly-formatted template workbook containing the header row and
 * a single example student, returned as a Node Buffer for download.
 */
export function buildTemplateWorkbook(): Buffer {
  const headers = templateHeaders()

  const example: Record<string, string | number> = {
    "Student Name": "Ama Mensah",
    "Admission Number": "ADM-0421",
    "Current Class": "Basic 6",
    "Roll Number": "12",
    Attendance: "58/60",
    Interest: "Reading",
    Attitude: "Cooperative",
    Conduct: "Excellent",
    "Head Teacher Remark": "A promising student.",
    "Class Teacher Remark": "Keep up the good work.",
  }
  for (const { ca, exam } of subjectColumns()) {
    example[ca] = 40
    example[exam] = 45
  }

  const worksheet = XLSX.utils.json_to_sheet([example], { header: headers })
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Template")

  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }) as Buffer
}

/** Suggested download filename for the template. */
export const TEMPLATE_FILENAME = "reportly-bulk-upload-template.xlsx"
