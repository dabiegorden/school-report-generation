import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Section } from "./section"

export function CTA() {
  return (
    <Section id="cta">
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-foreground px-6 py-14 text-center text-background shadow-2xl shadow-black/10 dark:bg-white dark:text-zinc-950">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
          Ready to simplify report card generation?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-7 opacity-75">
          Bring uploads, calculations and beautiful printable reports into one focused workspace.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="h-11 rounded-full bg-blue-600 px-5 text-white hover:bg-blue-500">
            <Link href="/login">
              Get Started
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild className="h-11 rounded-full border-white/20 bg-white/10 px-5 text-white hover:bg-white/20 dark:text-zinc-950" variant="outline">
            <Link href="mailto:hello@reportly.school">
              <Mail className="size-4" />
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
