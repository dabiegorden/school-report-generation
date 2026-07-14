import { schools } from "./data"
import { Section } from "./section"

export function Trust() {
  return (
    <Section className="py-10">
      <p className="text-center text-sm font-medium text-muted-foreground">
        Trusted by schools preparing faster, cleaner term reports
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {schools.map((school) => (
          <div
            className="flex h-16 items-center justify-center rounded-xl border border-border bg-muted/20 px-4 text-sm font-semibold text-muted-foreground grayscale"
            key={school}
          >
            {school}
          </div>
        ))}
      </div>
    </Section>
  )
}
