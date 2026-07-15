/** Ordinal suffix: 1 → "1st", 2 → "2nd", 3 → "3rd", 11 → "11th". */
export function ordinal(n: number): string {
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`
  switch (n % 10) {
    case 1:
      return `${n}st`
    case 2:
      return `${n}nd`
    case 3:
      return `${n}rd`
    default:
      return `${n}th`
  }
}

/** Ordinal for a possibly-missing position, falling back to a dash. */
export function ordinalOrDash(n: number | null | undefined): string {
  return typeof n === "number" ? ordinal(n) : "—"
}
