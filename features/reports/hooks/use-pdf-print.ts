"use client"

import * as React from "react"

/**
 * Print a generated PDF by fetching it, loading it into an off-screen iframe,
 * and invoking that iframe's own print dialog. This prints the real PDF — not
 * page HTML via window.print().
 *
 * The button's loading state is released as soon as the print dialog is
 * invoked (PDF viewers don't reliably fire `afterprint` on cancel, so we must
 * not wait for it). The iframe itself is cleaned up separately on `afterprint`
 * or a fallback timeout.
 */
export function usePdfPrint() {
  const [isPrinting, setIsPrinting] = React.useState(false)

  const printPdf = React.useCallback(async (url: string) => {
    setIsPrinting(true)
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error("Failed to load PDF")
      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)

      const iframe = document.createElement("iframe")
      // Off-screen but with real A4-ish dimensions so the PDF viewer
      // initializes (a 0×0 iframe won't print in most browsers).
      iframe.style.position = "fixed"
      iframe.style.left = "-10000px"
      iframe.style.top = "0"
      iframe.style.width = "794px"
      iframe.style.height = "1123px"
      iframe.style.border = "0"
      iframe.src = objectUrl

      let cleaned = false
      const cleanup = () => {
        if (cleaned) return
        cleaned = true
        URL.revokeObjectURL(objectUrl)
        iframe.remove()
      }

      iframe.onload = () => {
        const win = iframe.contentWindow
        if (!win) {
          setIsPrinting(false)
          cleanup()
          return
        }
        win.addEventListener("afterprint", cleanup)
        try {
          win.focus()
          win.print()
        } catch {
          window.open(objectUrl, "_blank", "noopener")
          cleanup()
        } finally {
          // The dialog is now the user's concern — release the button whether
          // they print or cancel.
          setIsPrinting(false)
        }
        // Remove the hidden iframe once printing settles (fallback for
        // browsers that never fire `afterprint`).
        window.setTimeout(cleanup, 60_000)
      }

      document.body.appendChild(iframe)
    } catch {
      setIsPrinting(false)
      // Last resort: open in a new tab so the user can print manually.
      window.open(url, "_blank", "noopener")
    }
  }, [])

  return { printPdf, isPrinting }
}
