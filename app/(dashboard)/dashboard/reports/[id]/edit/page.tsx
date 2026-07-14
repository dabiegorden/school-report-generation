import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getReportById } from "@/features/reports/queries"
import { buildReportDefaults } from "@/features/manual-entry/defaults"
import { ReportForm } from "@/features/manual-entry/components/ReportForm"
import { PageHeader } from "@/components/dashboard/page-header"

export const metadata: Metadata = {
  title: "Edit report · Reportly",
}

export default async function EditReportPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const report = await getReportById(id)

  if (!report) {
    notFound()
  }

  const defaults = buildReportDefaults({ report })

  return (
    <div className="mx-auto w-full max-w-5xl">
      <PageHeader
        title="Edit report"
        description={`Editing the report for ${report.studentName}.`}
      />
      <ReportForm defaults={defaults} mode="edit" reportId={report.id} />
    </div>
  )
}
