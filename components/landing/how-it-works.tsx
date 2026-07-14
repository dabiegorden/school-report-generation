import { steps } from "./data"
import { Reveal } from "./reveal"
import { Section, SectionHeading } from "./section"

export function HowItWorks() {
  return (
    <Section className="bg-muted/20" id="how-it-works">
      <SectionHeading
        eyebrow="How it works"
        title="From class sheet to printable reports in three calm steps."
      />
      <div className="relative mt-14 grid gap-5 lg:grid-cols-3">
        <div className="absolute left-[16.66%] right-[16.66%] top-10 hidden h-px bg-border lg:block" />
        {steps.map(({ description, icon: Icon, title }, index) => (
          <Reveal
            className="relative rounded-2xl border border-border bg-background p-6"
            delay={index * 0.1}
            key={title}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Icon className="size-5" />
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                Step {index + 1}
              </span>
            </div>
            <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
