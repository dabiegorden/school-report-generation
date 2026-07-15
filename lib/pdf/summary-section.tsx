import { Text, View } from "@react-pdf/renderer"

import type { Report } from "@/db"
import { MAX_SUBJECT_TOTAL } from "@/lib/calculations"
import { ordinalOrDash } from "@/lib/format"
import type { ReportLayout } from "./layout"
import { styles } from "./styles"

/** Grand totals and overall standing. */
export function SummarySection({
  report,
  layout,
}: {
  report: Report
  layout: ReportLayout
}) {
  const totalObtainable = report.subjects.length * MAX_SUBJECT_TOTAL

  const cells: Array<[string, string]> = [
    ["Total Marks Obtainable", String(totalObtainable)],
    ["Grand Total", String(report.grandTotal)],
    ["Overall Percentage", `${report.percentage}%`],
    ["Overall Grade", String(report.overallGrade)],
    ["Overall Position", ordinalOrDash(report.overallPosition)],
    ["Average", String(report.average)],
  ]

  return (
    <View>
      <Text
        style={[styles.sectionTitle, { backgroundColor: layout.sectionColor }]}
      >
        Results Grand Section
      </Text>
      <View style={styles.summaryRow}>
        {cells.map(([label, value]) => (
          <View key={label} style={styles.summaryCell}>
            <Text style={styles.summaryLabel}>{label}</Text>
            <Text style={styles.summaryValue}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
