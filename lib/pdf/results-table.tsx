import { Text, View } from "@react-pdf/renderer"

import type { Report } from "@/db"
import { ordinalOrDash } from "@/lib/format"
import type { ReportLayout } from "./layout"
import { styles } from "./styles"

/** Column widths (percent), summing to 100. */
const COLS = {
  subject: 22,
  class: 10,
  exam: 10,
  total: 8,
  position: 11,
  grade: 7,
  average: 10,
  avgPosition: 11,
  avgGrade: 11,
} as const

const HEADERS: Array<[keyof typeof COLS, string]> = [
  ["subject", "Subject"],
  ["class", "Class (50)"],
  ["exam", "Exam (50)"],
  ["total", "Total"],
  ["position", "Position"],
  ["grade", "Grade"],
  ["average", "Average"],
  ["avgPosition", "Avg. Pos"],
  ["avgGrade", "Avg. Grade"],
]

function w(key: keyof typeof COLS) {
  return { width: `${COLS[key]}%` as const }
}

/**
 * Per-subject results. Class/Exam/Total/Position/Grade come straight from the
 * stored report. The "Average" group reflects the cumulative running average;
 * with a single stored term it equals the current term, so it mirrors those
 * values until multi-term history is tracked.
 */
export function ResultsTable({
  report,
  layout,
}: {
  report: Report
  layout: ReportLayout
}) {
  return (
    <View>
      <Text
        style={[styles.sectionTitle, { backgroundColor: layout.sectionColor }]}
      >
        Results Details
      </Text>
      <View style={styles.table}>
        <View style={styles.tr} fixed>
          {HEADERS.map(([key, label]) => (
            <Text
              key={key}
              style={[styles.th, w(key), { backgroundColor: layout.accentColor }]}
            >
              {label}
            </Text>
          ))}
        </View>

        {report.subjects.map((subject, index) => {
          const rowStyle = index % 2 === 1 ? [styles.rowAlt] : []
          return (
            <View key={subject.subject} style={[styles.tr, ...rowStyle]} wrap={false}>
              <Text style={[styles.td, styles.tdSubject, w("subject")]}>
                {subject.subject}
              </Text>
              <Text style={[styles.td, w("class")]}>{subject.classScore}</Text>
              <Text style={[styles.td, w("exam")]}>{subject.examScore}</Text>
              <Text style={[styles.td, w("total")]}>{subject.total}</Text>
              <Text style={[styles.td, w("position")]}>
                {ordinalOrDash(subject.position)}
              </Text>
              <Text style={[styles.td, w("grade")]}>{subject.grade}</Text>
              <Text style={[styles.td, w("average")]}>{subject.total}</Text>
              <Text style={[styles.td, w("avgPosition")]}>
                {ordinalOrDash(subject.position)}
              </Text>
              <Text style={[styles.td, w("avgGrade")]}>{subject.grade}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}
