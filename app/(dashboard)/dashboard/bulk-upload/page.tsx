import type { Metadata } from "next"

import { getSchoolSettings } from "@/features/settings/queries"
import { BulkUploadClient } from "@/features/bulk-upload/components/BulkUploadClient"
import { PageHeader } from "@/components/dashboard/page-header"

export const metadata: Metadata = {
  title: "Bulk upload · Reportly",
}

export default async function BulkUploadPage() {
  const settings = await getSchoolSettings()

  return (
    <div className="mx-auto w-full max-w-6xl">
      <PageHeader
        title="Bulk upload"
        description="Import an entire class from one Excel workbook. Totals, grades and positions are calculated automatically."
      />
      <BulkUploadClient
        school={{
          schoolName: settings.schoolName,
          academicYear: settings.academicYear,
          currentTerm: settings.currentTerm,
        }}
      />
    </div>
  )
}
