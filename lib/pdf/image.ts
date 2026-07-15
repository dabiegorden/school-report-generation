/**
 * Return a src string only if it is a safely renderable image reference
 * (absolute http(s) URL or data URI); otherwise null so callers can show a
 * fallback. Guards @react-pdf's <Image> against bad/empty values.
 */
export function renderableImage(src: string | null | undefined): string | null {
  if (!src) return null
  const value = src.trim()
  if (/^https?:\/\//i.test(value)) return value
  if (/^data:image\//i.test(value)) return value
  return null
}

/** Uppercase initials (max 2) from a name, for a logo fallback tile. */
export function initials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "S"
  )
}
