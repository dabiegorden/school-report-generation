import "server-only"
import { cookies } from "next/headers"

import {
  createJWT,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  type SessionPayload,
} from "./jwt"

export { SESSION_COOKIE }

/**
 * Create a session: sign a JWT for the payload and store it in a hardened
 * HttpOnly cookie. Secure is enabled outside development.
 */
export async function createSession(payload: SessionPayload): Promise<void> {
  const token = await createJWT(payload)
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  })
}

/** Read the raw session token from the request cookies. */
export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value
}

/** Remove the session cookie, ending the session. */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}
