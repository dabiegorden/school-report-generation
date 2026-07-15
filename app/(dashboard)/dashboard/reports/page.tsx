import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"

import {
  getReports,
  getReportFilterOptions,
} from "@/features/reports/queries"
import { getSchoolSettings } from "@/features/settings/queries"
import { ReportsClient } from "@/features/reports/components/ReportsClient"
import { PageHeader } from "@/components/dashboard/page-header"
import { Button } from "@/components/ui/button"
import { defaultReportLayout } from "@/lib/pdf/layout"
import { parseReportFilters } from "@/lib/reports-filters"

export const metadata: Metadata = {
  title: "Reports · Reportly",
}

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const filters = parseReportFilters(params)

  const [reports, options, settings] = await Promise.all([
    getReports(filters),
    getReportFilterOptions(),
    getSchoolSettings(),
  ])

  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader
        title="Reports"
        description="Search, preview, print and export saved student reports."
        action={
          <Button asChild className="bg-blue-600 text-white hover:bg-blue-500">
            <Link href="/dashboard/manual-entry">
              <Plus className="size-4" />
              New report
            </Link>
          </Button>
        }
      />
      <Suspense fallback={null}>
        <ReportsClient
          reports={reports}
          options={options}
          defaultLayout={defaultReportLayout(settings)}
        />
      </Suspense>
    </div>
  )
}
