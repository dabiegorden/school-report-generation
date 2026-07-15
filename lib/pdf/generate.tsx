import "server-only"
import { renderToBuffer } from "@react-pdf/renderer"
import QRCode from "qrcode"

import type { Report, SchoolSettings } from "@/db"
import { ReportDocument } from "./report-document"
import type { ReportLayout } from "./layout"

/** Map each report id to a QR-code data URI pointing at its verify page. */
async function buildQrCodes(
  reports: Report[],
  baseUrl: string
): Promise<Record<string, string>> {
  const entries = await Promise.all(
    reports.map(async (report) => {
      const url = `${baseUrl}/verify/${report.id}`
      const dataUri = await QRCode.toDataURL(url, { margin: 0, width: 120 })
      return [report.id, dataUri] as const
    })
  )
  return Object.fromEntries(entries)
}

/**
 * Render one PDF containing a page per report. A single report yields an
 * individual card; many yield a merged class booklet. `baseUrl` is the app
 * origin, used to build the QR verification links, and `layout` carries the
 * header/footer customization for this render.
 */
export async function renderReportsPdf(
  reports: Report[],
  settings: SchoolSettings,
  baseUrl: string,
  layout: ReportLayout
): Promise<Buffer> {
  const qrByReport = await buildQrCodes(reports, baseUrl)
  return renderToBuffer(
    <ReportDocument
      reports={reports}
      settings={settings}
      qrByReport={qrByReport}
      layout={layout}
    />
  )
}
