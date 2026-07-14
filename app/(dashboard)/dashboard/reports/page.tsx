import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"

import { getReports } from "@/features/reports/queries"
import { ReportsTable } from "@/features/reports/components/ReportsTable"
import { PageHeader } from "@/components/dashboard/page-header"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Reports · Reportly",
}

export default async function ReportsPage() {
  const reports = await getReports()

  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader
        title="Reports"
        description="All saved student reports."
        action={
          <Button asChild className="bg-blue-600 text-white hover:bg-blue-500">
            <Link href="/dashboard/manual-entry">
              <Plus className="size-4" />
              New report
            </Link>
          </Button>
        }
      />
      <ReportsTable reports={reports} />
    </div>
  )
}
