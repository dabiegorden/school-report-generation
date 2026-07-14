"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { navItems } from "./data"
import { Logo } from "./logo"

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Main navigation"
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-border/70 bg-background/85 px-3 backdrop-blur-xl transition-all duration-300 dark:bg-background/80",
          scrolled ? "h-14 shadow-sm shadow-black/5" : "h-16"
        )}
      >
        <Link aria-label="Reportly home" href="#top">
          <Logo />
        </Link>

        <div className="hidden items-center rounded-full border border-border/70 bg-muted/35 p-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-background hover:text-foreground"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button asChild className="rounded-full" variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="rounded-full bg-blue-600 text-white hover:bg-blue-500">
            <Link href="/login">Get Started</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button aria-label="Open menu" className="rounded-full" size="icon" variant="ghost">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[min(88vw,22rem)]">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      className="rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button asChild variant="outline">
                    <Link href="/login">Login</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild className="bg-blue-600 text-white hover:bg-blue-500">
                    <Link href="/login">Get Started</Link>
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
