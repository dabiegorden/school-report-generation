"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FileText, Loader2, Printer, Search, SlidersHorizontal } from "lucide-react"

import type { ReportFilterOptions } from "@/features/reports/queries"
import type { ReportLayout } from "@/lib/pdf/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { usePdfPrint } from "../hooks/use-pdf-print"
import { ReportLayoutFields } from "./ReportLayoutFields"
import { useReportLayout } from "../hooks/use-report-layout"

const ALL = "all"

type ReportsToolbarProps = {
  options: ReportFilterOptions
  total: number
  defaultLayout: ReportLayout
}

export function ReportsToolbar({
  options,
  total,
  defaultLayout,
}: ReportsToolbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { printPdf, isPrinting } = usePdfPrint()
  const { layout, setLayout, reset, isCustomized, withLayout } =
    useReportLayout(defaultLayout)

  const [search, setSearch] = React.useState(searchParams.get("q") ?? "")

  const setParam = React.useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) params.set(key, value)
      else params.delete(key)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  // Debounce the free-text search into the URL.
  React.useEffect(() => {
    const current = searchParams.get("q") ?? ""
    if (search === current) return
    const timer = window.setTimeout(() => setParam("q", search), 400)
    return () => window.clearTimeout(timer)
  }, [search, searchParams, setParam])

  // PDF urls carry the active filters plus the header/footer customization.
  const pdfUrl = `/dashboard/reports/pdf?${withLayout(searchParams.toString())}`
  const hasReports = total > 0

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name or admission number…"
            className="pl-9"
            aria-label="Search reports"
          />
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
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
            variant="outline"
            disabled={!hasReports}
            onClick={() => window.open(pdfUrl, "_blank", "noopener")}
          >
            <FileText className="size-4" />
            Merged PDF
          </Button>
          <Button
            variant="outline"
            disabled={!hasReports || isPrinting}
            onClick={() => printPdf(pdfUrl)}
          >
            {isPrinting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Printer className="size-4" />
            )}
            Print all
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <FilterSelect
          label="Class"
          value={searchParams.get("class") ?? ALL}
          options={options.classes}
          onChange={(value) => setParam("class", value === ALL ? "" : value)}
        />
        <FilterSelect
          label="Term"
          value={searchParams.get("term") ?? ALL}
          options={options.terms}
          onChange={(value) => setParam("term", value === ALL ? "" : value)}
        />
        <FilterSelect
          label="Year"
          value={searchParams.get("year") ?? ALL}
          options={options.academicYears}
          onChange={(value) => setParam("year", value === ALL ? "" : value)}
        />

        <Select
          value={searchParams.get("sort") ?? "newest"}
          onValueChange={(value) =>
            setParam("sort", value === "newest" ? "" : value)
          }
        >
          <SelectTrigger className="ml-auto w-44" aria-label="Sort reports">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="highest">Highest marks</SelectItem>
            <SelectItem value="lowest">Lowest marks</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-40" aria-label={`Filter by ${label}`}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>All {label.toLowerCase()}s</SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
