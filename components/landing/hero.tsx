import Link from "next/link"
import { ArrowRight, PlayCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HeroMockup } from "./mockups"
import { trustBadges } from "./data"
import { Reveal } from "./reveal"

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24"
    >
      {/* Subtle premium backdrop: fine grid + soft radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[32rem] w-[64rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl dark:bg-blue-500/10"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Reveal>
            <Badge
              className="mb-6 rounded-full border-blue-600/20 bg-blue-600/10 text-blue-700 dark:text-blue-300"
              variant="outline"
            >
              Built for modern school reporting
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Generate beautiful school report cards in minutes.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
              Upload Excel files or manually enter student results and instantly
              generate professional printable report cards.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-11 rounded-full bg-blue-600 px-5 text-white hover:bg-blue-500"
              >
                <Link href="/login">
                  Start Free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                className="h-11 rounded-full px-5"
                variant="outline"
              >
                <Link href="#screenshots">
                  <PlayCircle className="size-4" />
                  View Demo
                </Link>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-3">
              {trustBadges.map(({ icon: Icon, label }) => (
                <span
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                  key={label}
                >
                  <Icon className="size-4 text-blue-600" />
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15} direction="left" scale>
          <HeroMockup />
        </Reveal>
      </div>
    </section>
  )
}
