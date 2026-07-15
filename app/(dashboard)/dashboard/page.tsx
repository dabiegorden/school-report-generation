import type { Metadata } from "next"
import Link from "next/link"
import { FileSpreadsheet, Keyboard, Settings } from "lucide-react"

import { getCurrentUser } from "@/lib/auth/auth"
import { getDashboardStats } from "@/features/dashboard/queries"
import { StatCards } from "@/components/dashboard/stat-cards"

export const metadata: Metadata = {
  title: "Dashboard · Reportly",
}

const QUICK_LINKS = [
  {
    title: "Manual entry",
    description: "Enter a single student's report by hand.",
    href: "/dashboard/manual-entry",
    icon: Keyboard,
  },
  {
    title: "Bulk upload",
    description: "Import an entire class from one Excel file.",
    href: "/dashboard/bulk-upload",
    icon: FileSpreadsheet,
  },
  {
    title: "School settings",
    description: "Configure your school details and grading scale.",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export default async function DashboardPage() {
  const [user, stats] = await Promise.all([
    getCurrentUser(),
    getDashboardStats(),
  ])

  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Welcome back, {user?.fullName ?? "Administrator"}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Here&apos;s an overview of your school&apos;s reports.
      </p>

      <div className="mt-8">
        <StatCards stats={stats} />
      </div>

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Quick actions
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-2xl border border-border bg-background p-5 transition hover:border-blue-600/40 hover:bg-muted/30"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
              <link.icon className="size-5" />
            </span>
            <p className="mt-4 font-medium">{link.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
