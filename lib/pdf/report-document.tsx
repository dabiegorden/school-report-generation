import { Document } from "@react-pdf/renderer"

import type { Report, SchoolSettings } from "@/db"
import type { ReportLayout } from "./layout"
import { ReportPage } from "./report-page"

/**
 * A PDF document containing one page per report. Pass a single report for an
 * individual card, or many for a merged class booklet (one student per page,
 * continuous internal page numbering, no duplicated headers).
 */
export function ReportDocument({
  reports,
  settings,
  qrByReport,
  layout,
}: {
  reports: Report[]
  settings: SchoolSettings
  qrByReport: Record<string, string>
  layout: ReportLayout
}) {
  return (
    <Document>
      {reports.map((report) => (
        <ReportPage
          key={report.id}
          report={report}
          settings={settings}
          qr={qrByReport[report.id]}
          layout={layout}
        />
      ))}
    </Document>
  )
}
