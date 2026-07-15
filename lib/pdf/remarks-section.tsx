import { Image, Text, View } from "@react-pdf/renderer"

import type { Report, SchoolSettings } from "@/db"
import { renderableImage } from "./image"
import type { ReportLayout } from "./layout"
import { styles } from "./styles"

function Remark({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.remarkRow}>
      <Text style={styles.remarkLabel}>{label}:</Text>
      <Text style={styles.remarkValue}>{value || "—"}</Text>
    </View>
  )
}

function Signature({
  role,
  name,
  remark,
  signature,
}: {
  role: string
  name: string
  remark: string
  signature: string | null
}) {
  return (
    <View style={styles.signatureBlock}>
      <Remark label={`${role} Remark`} value={remark} />
      {signature ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf Image is not a DOM <img>
        <Image src={signature} style={styles.signatureImage} />
      ) : (
        <View style={styles.signatureLine} />
      )}
      <Text style={styles.signatureCaption}>
        {name ? `${name} — ${role}` : `${role} Signature`}
      </Text>
    </View>
  )
}

/** General remarks plus head/class teacher remarks and signatures. */
export function RemarksSection({
  report,
  settings,
  layout,
}: {
  report: Report
  settings: SchoolSettings
  layout: ReportLayout
}) {
  const classTeacherName = report.classTeacher || layout.classTeacher
  const sectionStyle = [
    styles.sectionTitle,
    { backgroundColor: layout.sectionColor },
  ]

  return (
    <View wrap={false}>
      <Text style={sectionStyle}>General Remarks</Text>
      <Remark label="Interest" value={report.interest} />
      <Remark label="Attitude" value={report.attitude} />
      <Remark label="Conduct" value={report.conduct} />

      <Text style={sectionStyle}>Head &amp; Class Teacher Remarks</Text>
      <View style={styles.signatureRow}>
        <Signature
          role="Head Teacher"
          name={settings.headTeacherName}
          remark={report.headTeacherRemark}
          signature={renderableImage(settings.headTeacherSignature)}
        />
        <Signature
          role="Class Teacher"
          name={classTeacherName}
          remark={report.classTeacherRemark}
          signature={renderableImage(settings.classTeacherSignature)}
        />
      </View>
    </View>
  )
}
