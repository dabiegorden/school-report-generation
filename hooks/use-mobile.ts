import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Track whether the viewport is below the mobile breakpoint. Uses
 * `useSyncExternalStore` so the value stays consistent across SSR/hydration
 * without a setState-in-effect.
 */
export function useIsMobile() {
  return React.useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    },
    () => window.innerWidth < MOBILE_BREAKPOINT,
    () => false
  )
}
