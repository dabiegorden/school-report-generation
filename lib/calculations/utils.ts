/** Constrain a value to the inclusive [min, max] range. */
export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min
  return Math.min(Math.max(value, min), max)
}

/** Round to at most two decimal places, avoiding float noise. */
export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}
