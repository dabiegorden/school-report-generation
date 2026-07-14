import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as schema from "./schema"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in the environment")
}

const sql = neon(process.env.DATABASE_URL)

/** Shared Drizzle client, typed with the full application schema. */
export const db = drizzle(sql, { schema })

export * from "./schema"
