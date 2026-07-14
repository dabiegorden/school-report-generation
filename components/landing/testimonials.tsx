import { Quote } from "lucide-react"

import { testimonials } from "./data"
import { Reveal } from "./reveal"
import { Section, SectionHeading } from "./section"

export function Testimonials() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Testimonials"
        title="Built around the people who manage reports every term."
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal delay={index * 0.08} key={testimonial.name} scale>
            <figure className="h-full rounded-2xl border border-border bg-background p-6 shadow-sm shadow-black/5">
              <Quote className="mb-5 size-5 text-blue-600" />
              <blockquote className="text-base leading-7 text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{testimonial.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
