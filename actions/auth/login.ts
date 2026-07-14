"use server"

import { redirect } from "next/navigation"

import { findUserByEmail } from "@/lib/auth/auth"
import { verifyPassword } from "@/lib/auth/password"
import { createSession } from "@/lib/auth/session"
import { loginSchema } from "@/lib/validations/auth"

export type LoginState = {
  error?: string
}

/**
 * Authenticate a user from the login form.
 *
 * Runs entirely on the server: validates input, verifies credentials with a
 * constant-time bcrypt compare, and on success issues an HttpOnly session
 * cookie before redirecting to the dashboard. A single generic error message
 * is returned for any credential failure to avoid leaking which field was
 * wrong (user enumeration).
 */
export async function login(values: unknown): Promise<LoginState> {
  const parsed = loginSchema.safeParse(values)
  if (!parsed.success) {
    return { error: "Please check the details you entered." }
  }

  const { email, password } = parsed.data
  const user = await findUserByEmail(email)

  // Verify even when the user is missing to keep timing consistent.
  const passwordValid = user
    ? await verifyPassword(password, user.passwordHash)
    : await verifyPassword(password, "$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinva")

  if (!user || !passwordValid) {
    return { error: "Invalid email or password." }
  }

  await createSession({
    userId: user.id,
    email: user.email,
    role: user.role,
  })

  redirect("/dashboard")
}
