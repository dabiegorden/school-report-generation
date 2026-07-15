"use server"

import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

import { db, schoolSettings } from "@/db"
import { getCurrentUser } from "@/lib/auth/auth"
import { logActivity } from "@/lib/audit"
import { settingsFormSchema } from "@/lib/validations/settings"
import { getSchoolSettings } from "@/features/settings/queries"

export type ActionResult = { success: boolean; error?: string }

/** Persist edits to the single school-settings record. Admin only. */
export async function updateSchoolSettings(
  values: unknown
): Promise<ActionResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: "Not authenticated." }

  const parsed = settingsFormSchema.safeParse(values)
  if (!parsed.success) {
    return { success: false, error: "Please check the values you entered." }
  }

  const current = await getSchoolSettings()

  await db
    .update(schoolSettings)
    .set(parsed.data)
    .where(eq(schoolSettings.id, current.id))

  await logActivity(user.email, "settings.updated")
  revalidatePath("/dashboard/settings")
  revalidatePath("/dashboard/manual-entry")
  return { success: true }
}
