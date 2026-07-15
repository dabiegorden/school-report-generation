import type { NextRequest } from "next/server"

import { getCurrentUser } from "@/lib/auth/auth"
import { getReportById } from "@/features/reports/queries"
import { getSchoolSettings } from "@/features/settings/queries"
import { renderReportsPdf } from "@/lib/pdf/generate"
import { reportFileName } from "@/lib/pdf/filename"
import { resolveReportLayout } from "@/lib/pdf/layout"

/** Generate a single report card PDF. `?download=1` forces a download. */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await getCurrentUser())) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { id } = await params
  const report = await getReportById(id)
  if (!report) {
    return new Response("Report not found", { status: 404 })
  }

  const settings = await getSchoolSettings()

  try {
    const layout = resolveReportLayout(settings, request.nextUrl.searchParams)
    const pdf = await renderReportsPdf(
      [report],
      settings,
      request.nextUrl.origin,
      layout
    )
    const download = request.nextUrl.searchParams.get("download") === "1"
    const disposition = download ? "attachment" : "inline"

    return new Response(new Uint8Array(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${disposition}; filename="${reportFileName(report)}"`,
        "Cache-Control": "no-store",
      },
    })
  } catch {
    return new Response("Could not generate the PDF for this report.", {
      status: 500,
    })
  }
}
