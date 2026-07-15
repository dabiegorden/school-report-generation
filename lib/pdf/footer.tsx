import { Text, View } from "@react-pdf/renderer"

import { styles } from "./styles"

/** Fixed footer with a customizable note and internal page numbering. */
export function Footer({ note }: { note: string }) {
  return (
    <View style={styles.footer} fixed>
      <Text>{note}</Text>
      <Text
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
      />
    </View>
  )
}
