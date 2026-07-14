"use client"

import { ArrowLeft, Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"

type ImportToolbarProps = {
  total: number
  validCount: number
  invalidCount: number
  isSaving: boolean
  onBack: () => void
  onSave: () => void
}

export function ImportToolbar({
  total,
  validCount,
  invalidCount,
  isSaving,
  onBack,
  onSave,
}: ImportToolbarProps) {
  const canSave = total > 0 && invalidCount === 0 && !isSaving

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="text-muted-foreground">
          <span className="font-semibold text-foreground">{total}</span> students
        </span>
        <span className="text-emerald-600 dark:text-emerald-400">
          {validCount} ready
        </span>
        {invalidCount > 0 ? (
          <span className="text-destructive">{invalidCount} with errors</span>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={onBack} disabled={isSaving}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button
          onClick={onSave}
          disabled={!canSave}
          className="bg-blue-600 text-white hover:bg-blue-500"
        >
          {isSaving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Save className="size-4" />
              Save {total} report{total === 1 ? "" : "s"}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
