"use client"

import * as React from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

const themeCycle = ["light", "dark", "system"] as const

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // The resolved theme is only known on the client. Wait until after mount to
  // render the icon so the server and client markup match (no hydration error).
  React.useEffect(() => setMounted(true), [])

  const currentTheme = theme ?? "system"
  const Icon =
    currentTheme === "light" ? Sun : currentTheme === "dark" ? Moon : Monitor

  return (
    <Button
      aria-label="Toggle color theme"
      className="size-8 rounded-full"
      size="icon"
      variant="ghost"
      onClick={() => {
        const index = themeCycle.indexOf(
          currentTheme as (typeof themeCycle)[number]
        )
        setTheme(themeCycle[(index + 1) % themeCycle.length])
      }}
    >
      {mounted ? <Icon className="size-4" /> : <Sun className="size-4" />}
      <span className="sr-only">Toggle color theme</span>
    </Button>
  )
}
