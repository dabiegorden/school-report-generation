import bcrypt from "bcryptjs"

/**
 * Cost factor for bcrypt. 12 rounds is a sensible balance between
 * security and latency for interactive logins.
 */
const SALT_ROUNDS = 12

/** Hash a plain-text password. Never store the plain value. */
export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

/** Compare a plain-text password against a stored bcrypt hash. */
export function verifyPassword(
  password: string,
  passwordHash: string
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash)
}
