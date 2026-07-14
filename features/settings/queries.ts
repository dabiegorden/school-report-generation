import "server-only"

import { db, schoolSettings, type SchoolSettings } from "@/db"

/**
 * Return the single school-settings row, creating an empty one on first
 * access. This app serves exactly one school, so there is only ever one row.
 */
export async function getSchoolSettings(): Promise<SchoolSettings> {
  const [existing] = await db.select().from(schoolSettings).limit(1)
  if (existing) return existing

  const [created] = await db.insert(schoolSettings).values({}).returning()
  return created
}
