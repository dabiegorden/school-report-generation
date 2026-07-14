"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type NavigationControlsProps = {
  options: Array<{ id: string; label: string }>
  currentId: string
  position: number
  total: number
  onSelect: (id: string) => void
  onPrev: () => void
  onNext: () => void
}

export function NavigationControls({
  options,
  currentId,
  position,
  total,
  onSelect,
  onPrev,
  onNext,
}: NavigationControlsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={position <= 1}
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <span className="text-sm text-muted-foreground tabular-nums">
          {position} / {total}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={position >= total}
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <Select value={currentId} onValueChange={onSelect}>
        <SelectTrigger className="w-full sm:w-72">
          <SelectValue placeholder="Search student…" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
