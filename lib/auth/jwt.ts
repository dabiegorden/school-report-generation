import { SignJWT, jwtVerify } from "jose"

/**
 * Session cookie name. Lives in this edge-safe module (no `next/headers`)
 * so it can be shared by `session.ts` and `proxy.ts` alike.
 */
export const SESSION_COOKIE = "session"

/** Data encoded into the session token. Kept intentionally small. */
export type SessionPayload = {
  userId: string
  email: string
  role: string
}

/** Token lifetime in seconds (7 days). Shared by the JWT and the cookie. */
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7

const JWT_ALG = "HS256"

/** Resolve and encode the signing secret, failing fast if it is missing. */
function getSecretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error("AUTH_SECRET is not set in the environment")
  }
  return new TextEncoder().encode(secret)
}

/** Create a signed JWT for the given session payload. */
export async function createJWT(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecretKey())
}

/**
 * Verify a JWT and return its payload, or `null` if the token is missing,
 * malformed, expired, or fails signature verification.
 */
export async function verifyJWT(
  token: string | undefined
): Promise<SessionPayload | null> {
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: [JWT_ALG],
    })

    if (
      typeof payload.userId === "string" &&
      typeof payload.email === "string" &&
      typeof payload.role === "string"
    ) {
      return {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      }
    }

    return null
  } catch {
    return null
  }
}
