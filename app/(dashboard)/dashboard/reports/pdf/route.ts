import type { NextRequest } from "next/server"

import { getCurrentUser } from "@/lib/auth/auth"
import { getReports } from "@/features/reports/queries"
import { getSchoolSettings } from "@/features/settings/queries"
import { renderReportsPdf } from "@/lib/pdf/generate"
import { resolveReportLayout } from "@/lib/pdf/layout"
import { parseReportFilters } from "@/lib/reports-filters"

/**
 * Generate a merged class PDF (one student per page) for the reports matching
 * the current filters. `?download=1` forces a download.
 */
export async function GET(request: NextRequest) {
  if (!(await getCurrentUser())) {
    return new Response("Unauthorized", { status: 401 })
  }

  const filters = parseReportFilters(request.nextUrl.searchParams)
  const reports = await getReports(filters)

  if (reports.length === 0) {
    return new Response("No reports match the current filters.", {
      status: 404,
    })
  }

  const settings = await getSchoolSettings()

  try {
    const layout = resolveReportLayout(settings, request.nextUrl.searchParams)
    const pdf = await renderReportsPdf(
      reports,
      settings,
      request.nextUrl.origin,
      layout
    )
    const download = request.nextUrl.searchParams.get("download") === "1"
    const disposition = download ? "attachment" : "inline"

    return new Response(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${disposition}; filename="class-reports.pdf"`,
        "Cache-Control": "no-store",
      },
    })
  } catch {
    return new Response("Could not generate the merged PDF.", { status: 500 })
  }
}
