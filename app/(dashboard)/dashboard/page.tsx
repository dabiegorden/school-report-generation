import type { Metadata } from "next"

import { getCurrentUser } from "@/lib/auth/auth"

export const metadata: Metadata = {
  title: "Dashboard · Reportly",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Welcome back, {user?.fullName ?? "Administrator"}
      </h1>
      <p className="mt-2 text-muted-foreground">
        This is the dashboard homepage.
      </p>

      <div className="mt-8 rounded-2xl border border-dashed border-border bg-muted/20 p-10 text-center">
        <p className="text-sm text-muted-foreground">
          Report generation, manual entry and bulk upload tools will appear here
          in the next phase.
        </p>
      </div>
    </div>
  )
}
