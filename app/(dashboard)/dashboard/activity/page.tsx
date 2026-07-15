import type { Metadata } from "next"
import { format } from "date-fns"
import { Activity as ActivityIcon } from "lucide-react"

import { getRecentActivity } from "@/lib/audit"
import { ACTION_LABELS } from "@/features/activity/labels"
import { PageHeader } from "@/components/dashboard/page-header"

export const metadata: Metadata = {
  title: "Activity · Reportly",
}

export default async function ActivityPage() {
  const entries = await getRecentActivity()

  return (
    <div className="mx-auto w-full max-w-3xl">
      <PageHeader
        title="Activity"
        description="A log of important actions across the account."
      />

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-12 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <ActivityIcon className="size-5" />
          </span>
          <p className="mt-4 text-sm text-muted-foreground">
            No activity yet. Actions like creating reports and updating settings
            will appear here.
          </p>
        </div>
      ) : (
        <ol className="rounded-2xl border border-border">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 last:border-0"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {ACTION_LABELS[entry.action] ?? entry.action}
                  {entry.detail ? (
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      — {entry.detail}
                    </span>
                  ) : null}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {entry.userEmail}
                </p>
              </div>
              <time className="shrink-0 text-xs text-muted-foreground">
                {format(new Date(entry.createdAt), "d MMM yyyy, HH:mm")}
              </time>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
