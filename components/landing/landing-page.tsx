import { Benefits } from "./benefits"
import { CTA } from "./cta"
import { FAQ } from "./faq"
import { Features } from "./features"
import { Footer } from "./footer"
import { Hero } from "./hero"
import { HowItWorks } from "./how-it-works"
import { Navbar } from "./navbar"
import { Screenshots } from "./screenshots"
import { Testimonials } from "./testimonials"
import { Trust } from "./trust"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Features />
        <HowItWorks />
        <Screenshots />
        <Benefits />
        <Testimonials />
        <FAQ />
        <PricingAnchor />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

function PricingAnchor() {
  return (
    <section
      aria-label="Pricing preview"
      className="px-4 py-8 sm:px-6 lg:px-8"
      id="pricing"
    >
      <div className="mx-auto max-w-7xl rounded-2xl border border-border bg-muted/20 px-6 py-8 text-center">
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
          Pricing
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          Simple school-friendly plans are coming soon.
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Early schools can start with onboarding support while the public
          pricing packages are finalized.
        </p>
      </div>
    </section>
  )
}
