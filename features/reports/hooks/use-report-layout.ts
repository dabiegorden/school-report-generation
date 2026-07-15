"use client"

import * as React from "react"

import { LAYOUT_PARAMS, type ReportLayout } from "@/lib/pdf/layout"

const LAYOUT_KEYS = Object.keys(LAYOUT_PARAMS) as Array<keyof ReportLayout>

/**
 * Hold the header/footer customization for PDF rendering and merge it into
 * PDF URLs. Starts from the school's saved values and can be reset back.
 */
export function useReportLayout(defaults: ReportLayout) {
  const [layout, setLayout] = React.useState<ReportLayout>(defaults)

  const isCustomized = LAYOUT_KEYS.some(
    (key) => layout[key] !== defaults[key]
  )

  const reset = React.useCallback(() => setLayout(defaults), [defaults])

  /** Append the current layout to a base query string (filters, etc.). */
  const withLayout = React.useCallback(
    (baseQuery = "") => {
      const params = new URLSearchParams(baseQuery)
      for (const key of LAYOUT_KEYS) {
        params.set(LAYOUT_PARAMS[key], layout[key])
      }
      return params.toString()
    },
    [layout]
  )

  return { layout, setLayout, reset, isCustomized, withLayout }
}
