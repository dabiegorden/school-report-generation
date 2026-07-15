"use client"

import * as React from "react"
import { AlertCircle } from "lucide-react"

import { parseImport } from "@/actions/reports/import"
import type { ImportedStudent } from "@/lib/excel/types"
import { Progress } from "@/components/ui/progress"
import { UploadZone } from "./UploadZone"

type ExcelParserProps = {
  onParsed: (students: ImportedStudent[]) => void
}

/**
 * Owns the upload → parse handshake: sends the file to the server action,
 * shows progress, surfaces file/format errors, and hands parsed rows upward.
 */
export function ExcelParser({ onParsed }: ExcelParserProps) {
  const [isPending, startTransition] = React.useTransition()
  const [progress, setProgress] = React.useState(0)
  const [error, setError] = React.useState<string | null>(null)

  // Advance a faux progress bar while the server parses (no native upload
  // progress for server actions); it completes when the result returns.
  React.useEffect(() => {
    if (!isPending) return
    const timer = setInterval(() => {
      setProgress((current) => (current < 90 ? current + 6 : current))
    }, 120)
    return () => clearInterval(timer)
  }, [isPending])

  function handleFile(file: File) {
    setError(null)
    setProgress(8)
    const formData = new FormData()
    formData.append("file", file)

    startTransition(async () => {
      const result = await parseImport(formData)
      setProgress(100)
      if (result.ok) {
        onParsed(result.students)
      } else {
        setError(result.error)
      }
    })
  }

  return (
    <div className="space-y-4">
      <UploadZone onFile={handleFile} disabled={isPending} />

      {isPending ? (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground">Parsing workbook…</p>
        </div>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
        >
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  )
}
