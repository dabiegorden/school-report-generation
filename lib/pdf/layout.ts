import type { SchoolSettings } from "@/db"

/**
 * Everything about a report PDF that can be customized at render time: the
 * school identity, the shared report details, and the colour scheme. One
 * install can therefore produce cards for different schools and terms.
 */
export type ReportLayout = {
  /** School name printed large in the header. */
  schoolName: string
  /** Address line under the school name (blank hides it). */
  address: string
  /** Phone line under the address (blank hides it). */
  phone: string
  /** Title printed under the school details (blank hides it). */
  headerTitle: string
  /** Note printed at the footer's left (blank hides it). */
  footerNote: string
  /** Fallbacks for report details when a report has no value of its own. */
  classTeacher: string
  academicYear: string
  term: string
  nextTermBegins: string
  /** Primary colour: school name, header rule, table headings, logo tile. */
  accentColor: string
  /** Background colour for section heading bars. */
  sectionColor: string
}

/**
 * Query-param keys used to override the layout for a single render. Prefixed
 * with `l` so they can never collide with the report filter params (`q`,
 * `class`, `term`, `year`, `sort`), which share the same URL.
 */
export const LAYOUT_PARAMS = {
  schoolName: "lSchool",
  address: "lAddress",
  phone: "lPhone",
  headerTitle: "lHeader",
  footerNote: "lFooter",
  classTeacher: "lTeacher",
  academicYear: "lYear",
  term: "lTerm",
  nextTermBegins: "lNextTerm",
  accentColor: "lAccent",
  sectionColor: "lSection",
} as const

export const DEFAULT_HEADER_TITLE = "TERMINAL REPORT"
export const DEFAULT_ACCENT_COLOR = "#1E3A8A"
export const DEFAULT_SECTION_COLOR = "#EEF2FF"

/** The school's saved values, used to prefill the customize fields. */
export function defaultReportLayout(settings: SchoolSettings): ReportLayout {
  return {
    schoolName: settings.schoolName,
    address: settings.address,
    phone: settings.phone,
    headerTitle: settings.reportHeaderTitle || DEFAULT_HEADER_TITLE,
    footerNote: settings.reportFooterNote || settings.schoolName,
    classTeacher: settings.defaultClassTeacher,
    academicYear: settings.academicYear,
    term: settings.currentTerm,
    nextTermBegins: settings.nextTermBegins,
    accentColor: settings.reportAccentColor || DEFAULT_ACCENT_COLOR,
    sectionColor: settings.reportSectionColor || DEFAULT_SECTION_COLOR,
  }
}

/**
 * Resolve the layout for a render: an explicit query-param override wins
 * (including a deliberate blank), otherwise fall back to the school's saved
 * settings.
 */
export function resolveReportLayout(
  settings: SchoolSettings,
  params: URLSearchParams
): ReportLayout {
  const defaults = defaultReportLayout(settings)

  const resolved = { ...defaults }
  for (const key of Object.keys(LAYOUT_PARAMS) as Array<keyof ReportLayout>) {
    const param = LAYOUT_PARAMS[key]
    if (params.has(param)) {
      resolved[key] = (params.get(param) ?? "").trim()
    }
  }

  // Colours must never end up blank or the PDF would render invalid styles.
  resolved.accentColor = resolved.accentColor || DEFAULT_ACCENT_COLOR
  resolved.sectionColor = resolved.sectionColor || DEFAULT_SECTION_COLOR

  return resolved
}
