import { Page } from "@react-pdf/renderer"

import type { Report, SchoolSettings } from "@/db"
import type { ReportLayout } from "./layout"
import { Footer } from "./footer"
import { GradingScale } from "./grading-scale"
import { Header } from "./header"
import { RemarksSection } from "./remarks-section"
import { ResultsTable } from "./results-table"
import { StudentInformation } from "./student-information"
import { styles } from "./styles"
import { SummarySection } from "./summary-section"

/** One student's full report on a single A4 portrait page. */
export function ReportPage({
  report,
  settings,
  qr,
  layout,
}: {
  report: Report
  settings: SchoolSettings
  qr?: string
  layout: ReportLayout
}) {
  return (
    <Page size="A4" orientation="portrait" style={styles.page} wrap>
      <Header settings={settings} qr={qr} layout={layout} />
      <StudentInformation report={report} layout={layout} />
      <ResultsTable report={report} layout={layout} />
      <SummarySection report={report} layout={layout} />
      <RemarksSection report={report} settings={settings} layout={layout} />
      <GradingScale settings={settings} layout={layout} />
      <Footer note={layout.footerNote} />
    </Page>
  )
}
