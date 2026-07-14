import { features } from "./data"
import { Reveal } from "./reveal"
import { Section, SectionHeading } from "./section"

export function Features() {
  return (
    <Section id="features">
      <SectionHeading
        eyebrow="Features"
        title="Everything a school needs to produce report cards without the spreadsheet scramble."
        description="Reportly keeps the workflow fast and understandable, from first upload to final printable PDF."
      />
      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ description, icon: Icon, title }, index) => (
          <Reveal
            className="bg-background p-6 transition hover:bg-muted/25"
            delay={(index % 3) * 0.06}
            key={title}
            scale
          >
            <div className="mb-8 flex size-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
              <Icon className="size-5" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
