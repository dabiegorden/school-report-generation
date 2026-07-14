import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/auth/auth"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

/**
 * Server-side authorization gate for every dashboard route. Even though
 * `proxy.ts` redirects unauthenticated visitors, we re-verify here so the
 * dashboard never renders without a valid, existing user.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardShell fullName={user.fullName} email={user.email}>
      {children}
    </DashboardShell>
  )
}
