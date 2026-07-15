import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Pencil } from "lucide-react"

import { getReportById } from "@/features/reports/queries"
import { ReportView } from "@/features/reports/components/ReportView"
import { ReportPdfActions } from "@/features/reports/components/ReportPdfActions"
import { PageHeader } from "@/components/dashboard/page-header"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "View report · Reportly",
}

export default async function ViewReportPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const report = await getReportById(id)

  if (!report) {
    notFound()
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <PageHeader
        title={report.studentName}
        description={`${report.currentClass} · ${report.admissionNumber}`}
        action={
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link href={`/dashboard/reports/${report.id}/edit`}>
                <Pencil className="size-4" />
                Edit
              </Link>
            </Button>
            <ReportPdfActions reportId={report.id} />
          </div>
        }
      />
      <ReportView report={report} />
    </div>
  )
}
