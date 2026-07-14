import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft, ShieldCheck, Sparkles, Zap } from "lucide-react"

import { getSession } from "@/lib/auth/auth"
import { Logo } from "@/components/landing/logo"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Sign in · Reportly",
  description: "Sign in to the Reportly school reporting dashboard.",
}

const highlights = [
  { icon: Zap, text: "Generate a full class of reports in minutes" },
  { icon: ShieldCheck, text: "School records protected behind secure sessions" },
  { icon: Sparkles, text: "Clean, consistent, print-ready report cards" },
]

export default async function LoginPage() {
  // Authenticated users should never see the login page.
  if (await getSession()) {
    redirect("/dashboard")
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Branding panel */}
      <section className="relative hidden flex-col justify-between overflow-hidden bg-zinc-950 p-10 text-white lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,black,transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl"
        />
        <div className="relative">
          <Link href="/" className="inline-flex">
            <span className="[&_span:last-child]:text-white">
              <Logo />
            </span>
          </Link>
        </div>
        <div className="relative max-w-md">
          <h1 className="text-balance text-4xl font-semibold tracking-tight">
            Welcome back to Reportly.
          </h1>
          <p className="mt-4 text-pretty text-lg leading-8 text-white/70">
            Sign in to manage student results and generate beautiful, printable
            report cards for your school.
          </p>
          <ul className="mt-10 space-y-4">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-white/80">
                <span className="flex size-8 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="size-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-white/40">
          © {new Date().getFullYear()} Reportly. All rights reserved.
        </p>
      </section>

      {/* Form panel */}
      <section className="flex flex-col justify-center px-6 py-12 sm:px-10">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Logo />
          </div>

          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">Sign in</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your administrator credentials to access the dashboard.
            </p>
          </div>

          <LoginForm />
        </div>
      </section>
    </main>
  )
}
