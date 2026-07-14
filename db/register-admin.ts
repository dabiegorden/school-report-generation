import "dotenv/config"
import { eq } from "drizzle-orm"

import { db, users } from "./index"
import { hashPassword } from "../lib/auth/password"

/**
 * Internal CLI to register an administrator. Not exposed on the frontend.
 *
 * Usage:
 *   npm run db:register -- --name "Jane Doe" --email jane@school.com --password secret123
 *
 * Re-running with an existing email updates that user's name and password
 * instead of creating a duplicate (email is unique).
 */
function parseArgs(argv: string[]): Record<string, string> {
  const args: Record<string, string> = {}
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (token.startsWith("--")) {
      const key = token.slice(2)
      const value = argv[i + 1]
      if (!value || value.startsWith("--")) {
        throw new Error(`Missing value for --${key}`)
      }
      args[key] = value
      i += 1
    }
  }
  return args
}

async function registerAdmin() {
  const { name, email, password } = parseArgs(process.argv.slice(2))

  if (!name || !email || !password) {
    throw new Error(
      'Required: --name "Full Name" --email user@example.com --password yourPassword'
    )
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters.")
  }

  const normalizedEmail = email.toLowerCase()
  const passwordHash = await hashPassword(password)

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, normalizedEmail))
    .limit(1)

  if (existing) {
    await db
      .update(users)
      .set({ fullName: name, passwordHash })
      .where(eq(users.id, existing.id))
    console.log(`✓ Updated existing administrator: ${normalizedEmail}`)
    return
  }

  await db.insert(users).values({
    fullName: name,
    email: normalizedEmail,
    passwordHash,
    role: "admin",
  })
  console.log(`✓ Registered administrator: ${normalizedEmail}`)
}

registerAdmin()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(
      "Registration failed:",
      error instanceof Error ? error.message : error
    )
    process.exit(1)
  })
