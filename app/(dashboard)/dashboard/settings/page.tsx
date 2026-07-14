import type { Metadata } from "next"

import { getSchoolSettings } from "@/features/settings/queries"
import { SchoolSettingsForm } from "@/features/settings/components/SchoolSettingsForm"
import { PageHeader } from "@/components/dashboard/page-header"

export const metadata: Metadata = {
  title: "School settings · Reportly",
}

export default async function SettingsPage() {
  const settings = await getSchoolSettings()

  return (
    <div className="mx-auto w-full max-w-4xl">
      <PageHeader
        title="School settings"
        description="Configure your school's details once. These appear on every report."
      />
      <SchoolSettingsForm settings={settings} />
    </div>
  )
}
