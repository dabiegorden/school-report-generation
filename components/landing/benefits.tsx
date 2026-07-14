import { CheckCircle2 } from "lucide-react"

import { benefits } from "./data"
import { WorkflowIllustration } from "./mockups"
import { Section, SectionHeading } from "./section"

export function Benefits() {
  return (
    <Section className="bg-muted/20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <WorkflowIllustration />
        <div>
          <SectionHeading
            align="left"
            eyebrow="Why choose Reportly"
            title="Designed for the real pace of school administration."
            description="Reportly removes the repetitive calculations and formatting work that slows teams down at the end of every term."
          />
          <div className="mt-8 grid gap-3">
            {benefits.map((benefit) => (
              <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3" key={benefit}>
                <CheckCircle2 className="size-5 text-blue-600" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
