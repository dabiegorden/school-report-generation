import { Text, View } from "@react-pdf/renderer"

import type { Report } from "@/db"
import type { ReportLayout } from "./layout"
import { styles } from "./styles"

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoCell}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value || "—"}</Text>
    </View>
  )
}

/**
 * Student identity block, mirroring the physical card's top section.
 * Fields the report doesn't carry its own value for (class teacher, academic
 * year, term) fall back to the layout, so a school can fill them in once at
 * print time instead of leaving dashes.
 */
export function StudentInformation({
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
        Student Information
      </Text>
      <View style={styles.infoGrid}>
        <Field label="Student Name" value={report.studentName} />
        <Field label="Admission No" value={report.admissionNumber} />
        <Field label="Current Class" value={report.currentClass} />
        <Field label="Roll Number" value={report.rollNumber} />
        <Field label="Attendance" value={report.attendance} />
        <Field
          label="Class Teacher"
          value={report.classTeacher || layout.classTeacher}
        />
        <Field
          label="Academic Year"
          value={report.academicYear || layout.academicYear}
        />
        <Field label="Term" value={report.term || layout.term} />
        <Field label="Next Term Begins" value={layout.nextTermBegins} />
      </View>
    </View>
  )
}
