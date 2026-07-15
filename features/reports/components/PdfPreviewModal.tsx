"use client"

import * as React from "react"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Printer,
  SlidersHorizontal,
  ZoomIn,
  ZoomOut,
} from "lucide-react"

import type { ReportLayout } from "@/lib/pdf/layout"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { usePdfPrint } from "../hooks/use-pdf-print"
import { useReportLayout } from "../hooks/use-report-layout"
import { ReportLayoutFields } from "./ReportLayoutFields"

export type PreviewReport = {
  id: string
  studentName: string
  admissionNumber: string
}

type PdfPreviewModalProps = {
  reports: PreviewReport[]
  index: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onIndexChange: (index: number) => void
  defaultLayout: ReportLayout
}

const ZOOM_LEVELS = [75, 100, 125, 150, 200] as const

export function PdfPreviewModal({
  reports,
  index,
  open,
  onOpenChange,
  onIndexChange,
  defaultLayout,
}: PdfPreviewModalProps) {
  const [zoomStep, setZoomStep] = React.useState(1) // index into ZOOM_LEVELS
  const { printPdf, isPrinting } = usePdfPrint()
  const { layout, setLayout, reset, isCustomized, withLayout } =
    useReportLayout(defaultLayout)

  const current = reports[index]
  const zoom = ZOOM_LEVELS[zoomStep]
  const baseUrl = current ? `/dashboard/reports/${current.id}/pdf` : ""
  // The preview re-renders whenever the header/footer text changes, so what
  // you see is exactly what prints.
  const printUrl = current ? `${baseUrl}?${withLayout()}` : ""
  const viewerUrl = current
    ? `${printUrl}#zoom=${zoom}&toolbar=1`
    : "about:blank"

  if (!current) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[92vh] max-w-5xl flex-col gap-3 p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-base">
            {current.studentName}{" "}
            <span className="font-normal text-muted-foreground">
              · {current.admissionNumber}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onIndexChange(index - 1)}
              disabled={index <= 0}
              aria-label="Previous student"
            >
              <ChevronLeft className="size-4" />
              Prev
            </Button>
            <span className="px-1 text-sm text-muted-foreground tabular-nums">
              {index + 1} / {reports.length}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onIndexChange(index + 1)}
              disabled={index >= reports.length - 1}
              aria-label="Next student"
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              size="icon"
              variant="outline"
              className="size-8"
              onClick={() => setZoomStep((s) => Math.max(0, s - 1))}
              disabled={zoomStep <= 0}
              aria-label="Zoom out"
            >
              <ZoomOut className="size-4" />
            </Button>
            <span className="w-12 text-center text-sm text-muted-foreground tabular-nums">
              {zoom}%
            </span>
            <Button
              size="icon"
              variant="outline"
              className="size-8"
              onClick={() => setZoomStep((s) => Math.min(ZOOM_LEVELS.length - 1, s + 1))}
              disabled={zoomStep >= ZOOM_LEVELS.length - 1}
              aria-label="Zoom in"
            >
              <ZoomIn className="size-4" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="outline">
                  <SlidersHorizontal className="size-4" />
                  Customize
                  {isCustomized ? (
                    <span className="ml-1 size-1.5 rounded-full bg-blue-600" />
                  ) : null}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-96">
                <ReportLayoutFields
                  layout={layout}
                  onChange={setLayout}
                  onReset={reset}
                  isCustomized={isCustomized}
                />
              </PopoverContent>
            </Popover>

            <Button
              size="sm"
              variant="outline"
              onClick={() => printPdf(printUrl)}
              disabled={isPrinting}
            >
              <Printer className="size-4" />
              Print
            </Button>
            <Button asChild size="sm" className="bg-blue-600 text-white hover:bg-blue-500">
              <a href={`${printUrl}&download=1`} download>
                <Download className="size-4" />
                Download
              </a>
            </Button>
          </div>
        </div>

        <iframe
          key={current.id}
          title={`Report card for ${current.studentName}`}
          src={viewerUrl}
          className="min-h-0 flex-1 rounded-lg border border-border bg-muted"
        />
      </DialogContent>
    </Dialog>
  )
}
