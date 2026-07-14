import {
  BarChart3,
  CheckCircle2,
  FileText,
  MoreHorizontal,
  UploadCloud,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { classProgress, proofStats } from "./data"

export function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-4 rounded-[2rem] bg-blue-600/10 blur-3xl dark:bg-blue-500/10" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-blue-950/10 dark:shadow-black/30">
        <div className="flex h-10 items-center gap-2 border-b border-border bg-muted/40 px-4">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
          <div className="ml-3 h-5 flex-1 rounded-full bg-background" />
        </div>
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="hidden border-r border-border bg-muted/25 p-4 lg:block">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Term Reports
            </p>
            {classProgress.map((item) => (
              <div
                className="mt-3 rounded-lg border border-border bg-background p-3"
                key={item.name}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.name}</span>
                  <Badge variant={item.status === "Ready" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-muted">
                  <div className={`h-full rounded-full bg-blue-600 ${item.widthClass}`} />
                </div>
              </div>
            ))}
          </aside>
          <div className="p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Report Preview</p>
                <p className="text-xs text-muted-foreground">Evergreen School - Term 2</p>
              </div>
              <Badge variant="outline">PDF ready</Badge>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between border-b border-border pb-4">
                <div>
                  <p className="text-lg font-semibold">Amelia Johnson</p>
                  <p className="text-sm text-muted-foreground">Grade 6A - 2026 Session</p>
                </div>
                <div className="rounded-lg bg-blue-600 px-3 py-2 text-center text-white">
                  <p className="text-[10px] uppercase">Average</p>
                  <p className="text-xl font-semibold">86%</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ["Mathematics", "92", "A"],
                  ["English", "88", "A"],
                  ["Science", "84", "B+"],
                  ["History", "79", "B"],
                ].map(([subject, score, grade]) => (
                  <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 text-sm" key={subject}>
                    <span>{subject}</span>
                    <span className="font-medium">{score}</span>
                    <Badge variant="secondary">{grade}</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                Excellent progress. Amelia shows strong analytical thinking and consistent class participation.
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {proofStats.map((stat) => (
                <div className="rounded-lg border border-border bg-muted/25 p-3" key={stat.label}>
                  <p className="text-base font-semibold">{stat.value}</p>
                  <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DashboardMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-xl shadow-black/5 dark:shadow-black/30">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="text-sm font-semibold">Academic Dashboard</p>
          <p className="text-xs text-muted-foreground">Grade 6A, Term 2 reports</p>
        </div>
        <MoreHorizontal className="size-4 text-muted-foreground" />
      </div>
      <div className="grid gap-4 p-4 md:grid-cols-4">
        {[
          ["Students", "128", BarChart3],
          ["Validated", "121", CheckCircle2],
          ["Uploads", "6", UploadCloud],
          ["PDFs", "98", FileText],
        ].map(([label, value, Icon]) => (
          <div className="rounded-xl border border-border bg-muted/25 p-4" key={label as string}>
            <Icon className="mb-3 size-4 text-blue-600" />
            <p className="text-2xl font-semibold">{value as string}</p>
            <p className="text-xs text-muted-foreground">{label as string}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-border p-4">
        <div className="grid grid-cols-[1.2fr_0.6fr_0.6fr_0.6fr] rounded-lg bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground">
          <span>Student</span>
          <span>Total</span>
          <span>Grade</span>
          <span>Status</span>
        </div>
        {[
          ["Amelia Johnson", "516", "A", "Ready"],
          ["Noah Smith", "489", "B+", "Ready"],
          ["Lina Chen", "472", "B", "Review"],
        ].map(([student, total, grade, status]) => (
          <div className="grid grid-cols-[1.2fr_0.6fr_0.6fr_0.6fr] items-center px-3 py-3 text-sm" key={student}>
            <span className="font-medium">{student}</span>
            <span>{total}</span>
            <span>{grade}</span>
            <Badge variant={status === "Ready" ? "secondary" : "outline"}>{status}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

export function WorkflowIllustration() {
  return (
    <div className="relative min-h-[24rem] overflow-hidden rounded-2xl border border-border bg-muted/25 p-5">
      <div className="absolute left-8 top-8 w-56 rounded-xl border border-border bg-background p-4 shadow-lg shadow-black/5">
        <p className="mb-4 text-sm font-semibold">Upload Summary</p>
        {["Student names", "Subject scores", "Attendance"].map((item) => (
          <div className="mb-3 flex items-center gap-2 text-sm" key={item}>
            <CheckCircle2 className="size-4 text-blue-600" />
            {item}
          </div>
        ))}
      </div>
      <div className="absolute right-5 top-20 w-60 rounded-xl border border-border bg-background p-4 shadow-lg shadow-black/5">
        <p className="text-sm font-semibold">Grade Rules</p>
        <div className="mt-4 space-y-2">
          {["A: 80-100", "B: 65-79", "C: 50-64"].map((item) => (
            <div className="rounded-lg bg-muted/60 px-3 py-2 text-sm" key={item}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-14 right-8 rounded-xl border border-blue-600/20 bg-blue-600 p-4 text-white shadow-xl shadow-blue-600/20">
        <p className="text-sm font-medium">Generated report batch</p>
        <p className="mt-1 text-2xl font-semibold">128 polished PDFs</p>
      </div>
    </div>
  )
}
