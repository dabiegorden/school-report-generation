"use client"

import * as React from "react"
import { Download, FileSpreadsheet, UploadCloud } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const ACCEPTED = [".xlsx", ".xls"]
const MAX_BYTES = 10 * 1024 * 1024

type UploadZoneProps = {
  onFile: (file: File) => void
  disabled?: boolean
}

/** Validate a candidate file locally before sending it to the server. */
function localError(file: File): string | null {
  const name = file.name.toLowerCase()
  if (!ACCEPTED.some((ext) => name.endsWith(ext))) {
    return "Only .xlsx and .xls files are supported."
  }
  if (file.size > MAX_BYTES) return "The file exceeds the 10 MB limit."
  if (file.size === 0) return "The file is empty."
  return null
}

export function UploadZone({ onFile, disabled }: UploadZoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  function handleFile(file: File | undefined) {
    if (!file) return
    const problem = localError(file)
    if (problem) {
      setError(problem)
      return
    }
    setError(null)
    onFile(file)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild variant="outline" size="sm">
          <a href="/dashboard/bulk-upload/template" download>
            <Download className="size-4" />
            Download Excel template
          </a>
        </Button>
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-disabled={disabled}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(event) => {
          if ((event.key === "Enter" || event.key === " ") && !disabled) {
            event.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(event) => {
          event.preventDefault()
          if (!disabled) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          if (!disabled) handleFile(event.dataTransfer.files?.[0])
        }}
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/20 px-6 py-16 text-center transition",
          dragging && "border-blue-600 bg-blue-600/5",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-muted/30"
        )}
      >
        <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600">
          <UploadCloud className="size-7" />
        </span>
        <p className="text-base font-medium">
          Drag &amp; drop your class workbook here
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          or click to browse — .xlsx or .xls, up to 10&nbsp;MB
        </p>
        <Button
          type="button"
          className="mt-5 bg-blue-600 text-white hover:bg-blue-500"
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation()
            inputRef.current?.click()
          }}
        >
          <FileSpreadsheet className="size-4" />
          Browse file
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          disabled={disabled}
          onChange={(event) => {
            handleFile(event.target.files?.[0])
            event.target.value = ""
          }}
        />
      </div>

      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
