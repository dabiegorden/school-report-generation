"use client"

import { Download, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { usePdfPrint } from "../hooks/use-pdf-print"

/** Download / print actions for a single report's generated PDF. */
export function ReportPdfActions({ reportId }: { reportId: string }) {
  const { printPdf, isPrinting } = usePdfPrint()
  const pdfUrl = `/dashboard/reports/${reportId}/pdf`

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={() => printPdf(pdfUrl)}
        disabled={isPrinting}
      >
        <Printer className="size-4" />
        Print
      </Button>
      <Button asChild className="bg-blue-600 text-white hover:bg-blue-500">
        <a href={`${pdfUrl}?download=1`} download>
          <Download className="size-4" />
          Download PDF
        </a>
      </Button>
    </div>
  )
}
