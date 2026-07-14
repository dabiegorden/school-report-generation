"use client"

import type { ReportSummary } from "@/lib/calculations"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type SummaryStat = {
  label: string
  value: string
  placeholder?: boolean
}

/** Format the live summary into labelled display stats. */
function toStats(summary: ReportSummary): SummaryStat[] {
  return [
    { label: "Total marks obtainable", value: String(summary.totalObtainable) },
    { label: "Grand total", value: String(summary.grandTotal) },
    { label: "Percentage", value: `${summary.percentage}%` },
    { label: "Average", value: String(summary.average) },
    { label: "Overall grade", value: String(summary.overallGrade) },
    { label: "Overall position", value: "—", placeholder: true },
    { label: "Average position", value: "—", placeholder: true },
  ]
}

export function SummaryCard({ summary }: { summary: ReportSummary }) {
  const stats = toStats(summary)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grand summary</CardTitle>
        <CardDescription>
          Calculated automatically from the scores above.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-muted/20 p-4"
          >
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p
              className={
                stat.placeholder
                  ? "mt-1 text-2xl font-semibold text-muted-foreground/50"
                  : "mt-1 text-2xl font-semibold tabular-nums"
              }
            >
              {stat.value}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
