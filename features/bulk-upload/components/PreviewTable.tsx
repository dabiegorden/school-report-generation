"use client"

import { Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { PreviewRow } from "../types"

type PreviewTableProps = {
  rows: PreviewRow[]
  onDelete: (id: string) => void
}

export function PreviewTable({ rows, onDelete }: PreviewTableProps) {
  return (
    <div className="max-h-[28rem] overflow-auto rounded-2xl border border-border">
      <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
        <thead className="sticky top-0 z-10 bg-muted/95 backdrop-blur">
          <tr className="text-left text-muted-foreground">
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Student name</th>
            <th className="px-4 py-3 font-medium">Admission no.</th>
            <th className="px-4 py-3 text-right font-medium">Grand total</th>
            <th className="px-4 py-3 text-right font-medium">Average</th>
            <th className="px-4 py-3 text-center font-medium">Overall grade</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.student.id} className="border-t border-border">
              <td className="px-4 py-3 text-muted-foreground tabular-nums">
                {row.student.rowNumber}
              </td>
              <td className="px-4 py-3 font-medium">
                {row.student.studentName || "—"}
              </td>
              <td className="px-4 py-3">{row.student.admissionNumber || "—"}</td>
              <td className="px-4 py-3 text-right tabular-nums">
                {row.valid ? row.result.summary.grandTotal : "—"}
              </td>
              <td className="px-4 py-3 text-right tabular-nums">
                {row.valid ? row.result.summary.average : "—"}
              </td>
              <td className="px-4 py-3 text-center tabular-nums">
                {row.valid ? row.result.summary.overallGrade : "—"}
              </td>
              <td className="px-4 py-3">
                {row.valid ? (
                  <Badge className="bg-emerald-600/15 text-emerald-700 dark:text-emerald-400">
                    Ready
                  </Badge>
                ) : (
                  <Badge variant="destructive">Has errors</Badge>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-8 text-muted-foreground hover:text-destructive"
                  aria-label={`Remove ${row.student.studentName || "row"}`}
                  onClick={() => onDelete(row.student.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
