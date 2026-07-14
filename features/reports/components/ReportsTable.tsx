"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { toast } from "sonner"
import { Eye, Loader2, Pencil, Trash2 } from "lucide-react"

import { deleteReport } from "@/actions/reports/reports"
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function DeleteReportButton({ report }: { report: Report }) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteReport(report.id)
      if (result.success) {
        toast.success("Report deleted.")
        router.refresh()
      } else {
        toast.error(result.error ?? "Could not delete the report.")
      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="size-8 text-muted-foreground hover:text-destructive"
          aria-label={`Delete report for ${report.studentName}`}
        >
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this report?</AlertDialogTitle>
          <AlertDialogDescription>
            The report for {report.studentName} ({report.admissionNumber}) will
            be permanently removed. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault()
              handleDelete()
            }}
            disabled={isPending}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {isPending ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function ReportsTable({ reports }: { reports: Report[] }) {
  if (reports.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-12 text-center">
        <p className="text-sm text-muted-foreground">
          No reports yet. Create one from the Manual Entry page.
        </p>
        <Button
          asChild
          className="mt-4 bg-blue-600 text-white hover:bg-blue-500"
        >
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
          {reports.map((report) => (
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
              <TableCell>
                <div className="flex items-center justify-end gap-1">
                  <Button asChild size="icon" variant="ghost" className="size-8">
                    <Link
                      href={`/dashboard/reports/${report.id}`}
                      aria-label={`View report for ${report.studentName}`}
                    >
                      <Eye className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild size="icon" variant="ghost" className="size-8">
                    <Link
                      href={`/dashboard/reports/${report.id}/edit`}
                      aria-label={`Edit report for ${report.studentName}`}
                    >
                      <Pencil className="size-4" />
                    </Link>
                  </Button>
                  <DeleteReportButton report={report} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
