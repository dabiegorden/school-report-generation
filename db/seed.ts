import "dotenv/config"
import { eq } from "drizzle-orm"

import { db, users } from "./index"
import { hashPassword } from "../lib/auth/password"

/** Seed a single administrator account. Idempotent: never duplicates. */
async function seed() {
  const email = "admin@school.com"

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existing) {
    console.log(`✓ Administrator "${email}" already exists — skipping.`)
    return
  }

  const passwordHash = await hashPassword("admin123")

  await db.insert(users).values({
    fullName: "Administrator",
    email,
    passwordHash,
    role: "admin",
  })

  console.log(`✓ Created administrator account: ${email}`)
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error)
    process.exit(1)
  })
