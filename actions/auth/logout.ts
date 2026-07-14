"use server"

import { redirect } from "next/navigation"

import { destroySession } from "@/lib/auth/session"

/** Destroy the session cookie and return the user to the landing page. */
export async function logout(): Promise<void> {
  await destroySession()
  redirect("/")
}
