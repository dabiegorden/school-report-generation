import {
  Activity,
  FileSpreadsheet,
  FileText,
  Keyboard,
  LayoutDashboard,
  Settings,
  type LucideIcon,
} from "lucide-react"

export type DashboardNavItem = {
  title: string
  href: string
  icon: LucideIcon
}

/** Primary dashboard navigation. Feature routes land here in later phases. */
export const dashboardNavItems: DashboardNavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Manual Entry", href: "/dashboard/manual-entry", icon: Keyboard },
  { title: "Bulk Upload", href: "/dashboard/bulk-upload", icon: FileSpreadsheet },
  { title: "Reports", href: "/dashboard/reports", icon: FileText },
  { title: "Activity", href: "/dashboard/activity", icon: Activity },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
]
