import type { Metadata } from "next"

import { getSchoolSettings } from "@/features/settings/queries"
import { buildReportDefaults } from "@/features/manual-entry/defaults"
import { ReportForm } from "@/features/manual-entry/components/ReportForm"
import { PageHeader } from "@/components/dashboard/page-header"

export const metadata: Metadata = {
  title: "Manual entry · Reportly",
}

export default async function ManualEntryPage() {
  const settings = await getSchoolSettings()
  const defaults = buildReportDefaults({ settings })

  return (
    <div className="mx-auto w-full max-w-5xl">
      <PageHeader
        title="Manual entry"
        description="Enter a student's results. Totals and grades calculate as you type."
      />
      <ReportForm defaults={defaults} mode="create" />
    </div>
  )
}
