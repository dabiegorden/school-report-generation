import { Image, Text, View } from "@react-pdf/renderer"

import { initials, renderableImage } from "./image"
import type { ReportLayout } from "./layout"
import { styles } from "./styles"

/**
 * School header: logo (or initials fallback), name, address, phone, QR.
 * The whole school identity — logo included — comes from `layout`, so a single
 * print run can be branded for a different school.
 */
export function Header({ qr, layout }: { qr?: string; layout: ReportLayout }) {
  const logo = renderableImage(layout.logo)
  const name = layout.schoolName || "School Name"

  return (
    <View style={[styles.header, { borderBottomColor: layout.accentColor }]}>
      {logo ? (
        // eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf Image is not a DOM <img>
        <Image src={logo} style={styles.logo} />
      ) : (
        <View
          style={[styles.logoFallback, { backgroundColor: layout.accentColor }]}
        >
          <Text style={styles.logoFallbackText}>{initials(name)}</Text>
        </View>
      )}

      <View style={styles.headerCenter}>
        <Text style={[styles.schoolName, { color: layout.accentColor }]}>
          {name}
        </Text>
        {layout.address ? (
          <Text style={styles.schoolMeta}>{layout.address}</Text>
        ) : null}
        {layout.phone ? (
          <Text style={styles.schoolMeta}>{layout.phone}</Text>
        ) : null}
        {layout.headerTitle ? (
          <Text style={styles.reportTitle}>{layout.headerTitle}</Text>
        ) : null}
      </View>

      {/* QR verification code (top-right), or a spacer to keep text centred. */}
      {qr ? (
        <View style={styles.qrBlock}>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf Image is not a DOM <img> */}
          <Image src={qr} style={styles.qr} />
          <Text style={styles.qrCaption}>Scan to verify</Text>
        </View>
      ) : (
        <View style={styles.logo} />
      )}
    </View>
  )
}
