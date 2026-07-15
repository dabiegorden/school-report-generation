"use client"

import * as React from "react"

import type { Report } from "@/db"
import type { ReportFilterOptions } from "@/features/reports/queries"
import type { ReportLayout } from "@/lib/pdf/layout"
import { ReportsToolbar } from "./ReportsToolbar"
import { ReportsTable } from "./ReportsTable"
import { PdfPreviewModal, type PreviewReport } from "./PdfPreviewModal"

type ReportsClientProps = {
  reports: Report[]
  options: ReportFilterOptions
  defaultLayout: ReportLayout
}

export function ReportsClient({
  reports,
  options,
  defaultLayout,
}: ReportsClientProps) {
  const [previewIndex, setPreviewIndex] = React.useState<number | null>(null)

  const previewReports: PreviewReport[] = React.useMemo(
    () =>
      reports.map((r) => ({
        id: r.id,
        studentName: r.studentName,
        admissionNumber: r.admissionNumber,
      })),
    [reports]
  )

  return (
    <>
      <ReportsToolbar
        options={options}
        total={reports.length}
        defaultLayout={defaultLayout}
      />
      <ReportsTable reports={reports} onPreview={setPreviewIndex} />

      {previewIndex !== null ? (
        <PdfPreviewModal
          reports={previewReports}
          index={previewIndex}
          open={previewIndex !== null}
          onOpenChange={(open) => !open && setPreviewIndex(null)}
          onIndexChange={setPreviewIndex}
          defaultLayout={defaultLayout}
        />
      ) : null}
    </>
  )
}
