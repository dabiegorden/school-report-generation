import "server-only"
import { cache } from "react"
import { eq } from "drizzle-orm"

import { db, users, type User } from "@/db"
import { verifyJWT, type SessionPayload } from "./jwt"
import { getSessionToken } from "./session"

/** A user without sensitive fields, safe to pass to the client. */
export type SafeUser = Omit<User, "passwordHash">

/** Return the verified session payload for the current request, or null. */
export async function getSession(): Promise<SessionPayload | null> {
  const token = await getSessionToken()
  return verifyJWT(token)
}

/**
 * Resolve the currently authenticated user.
 *
 * The token is verified server-side and the user is re-read from the
 * database so that a deleted or stale account cannot keep a valid cookie.
 * Cached per request to avoid duplicate queries across a render tree.
 * Returns `null` when unauthenticated. The password hash is never exposed.
 */
export const getCurrentUser = cache(async (): Promise<SafeUser | null> => {
  const session = await getSession()
  if (!session) return null

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1)

  if (!user) return null

  const { passwordHash: _passwordHash, ...safeUser } = user
  return safeUser
})

/** Look up a user by email (includes the password hash for verification). */
export async function findUserByEmail(
  email: string
): Promise<User | undefined> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1)

  return user
}
