import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "./data"
import { Section, SectionHeading } from "./section"

export function FAQ() {
  return (
    <Section className="bg-muted/20" id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions schools ask before getting started."
      />
      <Accordion className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-background p-2" collapsible type="single">
        {faqs.map((faq) => (
          <AccordionItem className="px-4" key={faq.question} value={faq.question}>
            <AccordionTrigger className="py-4 text-base hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="leading-6 text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}
