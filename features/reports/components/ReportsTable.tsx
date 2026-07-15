"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { toast } from "sonner"
import {
  Copy,
  Download,
  Eye,
  Loader2,
  MoreHorizontal,
  Pencil,
  Printer,
  Trash2,
} from "lucide-react"

import { deleteReport, duplicateReport } from "@/actions/reports/reports"
import type { Report } from "@/db"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { usePdfPrint } from "../hooks/use-pdf-print"

type ReportsTableProps = {
  reports: Report[]
  onPreview: (index: number) => void
}

function RowActions({
  report,
  onPreview,
}: {
  report: Report
  onPreview: () => void
}) {
  const router = useRouter()
  const { printPdf } = usePdfPrint()
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [isDeleting, startDelete] = React.useTransition()
  const [isDuplicating, startDuplicate] = React.useTransition()

  const pdfUrl = `/dashboard/reports/${report.id}/pdf`

  function handleDuplicate() {
    startDuplicate(async () => {
      const result = await duplicateReport(report.id)
      if (result.success && result.id) {
        toast.success("Report duplicated. Opening the copy…")
        router.push(`/dashboard/reports/${result.id}/edit`)
      } else {
        toast.error(result.error ?? "Could not duplicate the report.")
      }
    })
  }

  function handleDelete() {
    startDelete(async () => {
      const result = await deleteReport(report.id)
      if (result.success) {
        toast.success("Report deleted.")
        setConfirmOpen(false)
        router.refresh()
      } else {
        toast.error(result.error ?? "Could not delete the report.")
      }
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="size-8"
            aria-label={`Actions for ${report.studentName}`}
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/reports/${report.id}`}>
              <Eye className="size-4" />
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/reports/${report.id}/edit`}>
              <Pencil className="size-4" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault()
              handleDuplicate()
            }}
            disabled={isDuplicating}
          >
            <Copy className="size-4" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={onPreview}>
            <Eye className="size-4" />
            Preview PDF
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href={`${pdfUrl}?download=1`} download>
              <Download className="size-4" />
              Download
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => printPdf(pdfUrl)}>
            <Printer className="size-4" />
            Print
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={(event) => {
              event.preventDefault()
              setConfirmOpen(true)
            }}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this report?</AlertDialogTitle>
            <AlertDialogDescription>
              The report for {report.studentName} ({report.admissionNumber}) will
              be permanently removed. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault()
                handleDelete()
              }}
              disabled={isDeleting}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {isDeleting ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export function ReportsTable({ reports, onPreview }: ReportsTableProps) {
  if (reports.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-12 text-center">
        <p className="text-sm text-muted-foreground">
          No reports match your search. Try clearing filters or create one from
          the Manual Entry page.
        </p>
        <Button asChild className="mt-4 bg-blue-600 text-white hover:bg-blue-500">
          <Link href="/dashboard/manual-entry">New report</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student name</TableHead>
            <TableHead>Admission no.</TableHead>
            <TableHead>Class</TableHead>
            <TableHead className="text-right">Grand total</TableHead>
            <TableHead className="text-right">Average</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report, index) => (
            <TableRow key={report.id}>
              <TableCell className="font-medium">{report.studentName}</TableCell>
              <TableCell>{report.admissionNumber}</TableCell>
              <TableCell>{report.currentClass}</TableCell>
              <TableCell className="text-right tabular-nums">
                {report.grandTotal}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {report.average}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {format(new Date(report.createdAt), "d MMM yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <RowActions report={report} onPreview={() => onPreview(index)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
