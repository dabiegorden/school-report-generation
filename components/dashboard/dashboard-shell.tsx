import * as React from "react"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./sidebar"
import { TopNavbar } from "./top-navbar"

type DashboardShellProps = {
  fullName: string
  email: string
  children: React.ReactNode
}

/** App frame for authenticated routes: sidebar + top navbar + content area. */
export function DashboardShell({
  fullName,
  email,
  children,
}: DashboardShellProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <TopNavbar fullName={fullName} email={email} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
