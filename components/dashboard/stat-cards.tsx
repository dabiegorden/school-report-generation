import {
  Award,
  FileText,
  GraduationCap,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

import type { DashboardStats } from "@/features/dashboard/queries"

type StatCard = {
  label: string
  value: string
  hint: string
  icon: LucideIcon
  gradient: string
}

/** Build the card configs from the raw stats. */
function toCards(stats: DashboardStats): StatCard[] {
  return [
    {
      label: "Total reports",
      value: String(stats.totalReports),
      hint: "Saved report cards",
      icon: FileText,
      gradient: "from-indigo-500 to-indigo-700",
    },
    {
      label: "Classes",
      value: String(stats.classes),
      hint: "Distinct classes",
      icon: GraduationCap,
      gradient: "from-sky-500 to-blue-700",
    },
    {
      label: "Average score",
      value: stats.averageScore ? `${stats.averageScore}` : "—",
      hint: "Across all reports",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-teal-700",
    },
    {
      label: "Top grand total",
      value: stats.topScore ? String(stats.topScore) : "—",
      hint: "Highest overall",
      icon: Award,
      gradient: "from-amber-500 to-orange-600",
    },
  ]
}

/** Colorful, high-contrast stat cards for the dashboard home. */
export function StatCards({ stats }: { stats: DashboardStats }) {
  const cards = toCards(stats)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-2xl bg-gradient-to-br ${card.gradient} p-5 text-white shadow-sm`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white/85">
              {card.label}
            </span>
            <span className="flex size-9 items-center justify-center rounded-lg bg-white/15">
              <card.icon className="size-4.5" />
            </span>
          </div>
          <p className="mt-4 text-3xl font-semibold tracking-tight tabular-nums">
            {card.value}
          </p>
          <p className="mt-1 text-xs text-white/75">{card.hint}</p>
        </div>
      ))}
    </div>
  )
}
