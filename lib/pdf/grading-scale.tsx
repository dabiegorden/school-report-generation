import { Text, View } from "@react-pdf/renderer"

import type { SchoolSettings } from "@/db"
import type { ReportLayout } from "./layout"
import { styles } from "./styles"

/** Grading scale exactly as configured in School Settings. */
export function GradingScale({
  settings,
  layout,
}: {
  settings: SchoolSettings
  layout: ReportLayout
}) {
  const bands = [...settings.gradingScale].sort((a, b) => a.min - b.min)
  const line = bands
    .map((b) => `${b.min}-${b.max} => ${b.grade}`)
    .join("   |   ")

  return (
    <View>
      <Text
        style={[styles.sectionTitle, { backgroundColor: layout.sectionColor }]}
      >
        Grading Scale
      </Text>
      <View style={styles.gradingScale}>
        <Text>{line}</Text>
      </View>
    </View>
  )
}
