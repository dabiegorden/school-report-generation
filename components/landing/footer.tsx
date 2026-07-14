import { BriefcaseBusiness, Code2, MessageCircle } from "lucide-react"

import { footerGroups } from "./data"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Reportly helps schools generate professional report cards from Excel uploads or manual entry.
          </p>
          <div className="mt-6 flex gap-2">
            {[MessageCircle, BriefcaseBusiness, Code2].map((Icon, index) => (
              <a
                aria-label={`Social link ${index + 1}`}
                className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:text-foreground"
                href="#top"
                key={index}
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <a className="text-sm text-muted-foreground transition hover:text-foreground" href="#top">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-border pt-6 text-sm text-muted-foreground">
        Copyright 2026 Reportly. All rights reserved.
      </div>
    </footer>
  )
}
