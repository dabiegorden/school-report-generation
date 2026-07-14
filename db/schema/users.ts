import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

/**
 * Application users. For the MVP only the `admin` role exists, but the
 * `role` column is stored so role-based access can be layered on later
 * without a schema migration.
 */
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

/** Row as selected from the database (includes the password hash). */
export type User = typeof users.$inferSelect
/** Shape required to insert a new user. */
export type NewUser = typeof users.$inferInsert
