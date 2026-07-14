"use client"

import { AlertTriangle, CheckCircle2 } from "lucide-react"

import type { PreviewRow } from "../types"

export function ValidationSummary({ rows }: { rows: PreviewRow[] }) {
  const invalid = rows.filter((row) => !row.valid)

  if (rows.length === 0) {
    return null
  }

  if (invalid.length === 0) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-emerald-600/30 bg-emerald-600/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
        <CheckCircle2 className="size-4 shrink-0" />
        <span>
          All {rows.length} student{rows.length === 1 ? "" : "s"} passed
          validation and are ready to import.
        </span>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4">
      <div className="flex items-center gap-2 text-sm font-medium text-destructive">
        <AlertTriangle className="size-4 shrink-0" />
        {invalid.length} row{invalid.length === 1 ? "" : "s"} need attention.
        Fix them in the source file or delete them before importing.
      </div>
      <ul className="mt-3 max-h-56 space-y-2 overflow-y-auto text-sm">
        {invalid.map((row) => (
          <li key={row.student.id} className="text-muted-foreground">
            <span className="font-medium text-foreground">
              Row {row.student.rowNumber}
              {row.student.studentName ? ` · ${row.student.studentName}` : ""}
            </span>
            : {row.errors.join("; ")}
          </li>
        ))}
      </ul>
    </div>
  )
}
