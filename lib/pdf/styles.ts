import { StyleSheet } from "@react-pdf/renderer"

/** Shared palette and metrics for the report PDF. */
export const PDF = {
  text: "#111827",
  muted: "#6b7280",
  border: "#9ca3af",
  borderLight: "#d1d5db",
  headerBg: "#1e3a8a",
  headerText: "#ffffff",
  rowAlt: "#f3f4f6",
  sectionBg: "#eef2ff",
} as const

/** Global stylesheet. Font sizes follow the required hierarchy. */
export const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: PDF.text,
    paddingVertical: 28,
    paddingHorizontal: 32,
    lineHeight: 1.3,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderBottomColor: PDF.headerBg,
    paddingBottom: 8,
    marginBottom: 10,
  },
  logo: { width: 46, height: 46, objectFit: "contain" },
  logoFallback: {
    width: 46,
    height: 46,
    borderRadius: 6,
    backgroundColor: PDF.headerBg,
    alignItems: "center",
    justifyContent: "center",
  },
  logoFallbackText: { color: PDF.headerText, fontSize: 14, fontFamily: "Helvetica-Bold" },
  qrBlock: { width: 46, alignItems: "center" },
  qr: { width: 40, height: 40 },
  qrCaption: { fontSize: 5.5, color: PDF.muted, marginTop: 1 },
  headerCenter: { flex: 1, alignItems: "center", paddingHorizontal: 8 },
  schoolName: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: PDF.headerBg,
    // Separate the name from the address/phone lines below it.
    marginBottom: 5,
  },
  schoolMeta: { fontSize: 8, color: PDF.muted, marginTop: 2 },
  reportTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    marginTop: 4,
    letterSpacing: 1,
  },

  // Generic section
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    backgroundColor: PDF.sectionBg,
    color: PDF.text,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginTop: 10,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Info grid
  infoGrid: { flexDirection: "row", flexWrap: "wrap" },
  infoCell: {
    width: "33.33%",
    flexDirection: "row",
    paddingVertical: 2,
    paddingRight: 6,
  },
  infoLabel: { fontFamily: "Helvetica-Bold", marginRight: 4 },
  infoValue: { flex: 1 },

  // Table
  table: { borderWidth: 1, borderColor: PDF.border },
  tr: { flexDirection: "row" },
  th: {
    backgroundColor: PDF.headerBg,
    color: PDF.headerText,
    fontFamily: "Helvetica-Bold",
    fontSize: 7,
    paddingVertical: 4,
    paddingHorizontal: 3,
    borderRightWidth: 0.5,
    borderRightColor: "#ffffff",
    textAlign: "center",
  },
  td: {
    paddingVertical: 3,
    paddingHorizontal: 3,
    borderRightWidth: 0.5,
    borderRightColor: PDF.borderLight,
    borderTopWidth: 0.5,
    borderTopColor: PDF.borderLight,
    textAlign: "center",
    fontSize: 7.5,
  },
  tdSubject: { textAlign: "left", fontFamily: "Helvetica-Bold" },
  rowAlt: { backgroundColor: PDF.rowAlt },

  // Summary
  summaryRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  summaryCell: {
    flexGrow: 1,
    minWidth: 90,
    borderWidth: 1,
    borderColor: PDF.borderLight,
    borderRadius: 4,
    padding: 6,
  },
  summaryLabel: { fontSize: 7, color: PDF.muted },
  summaryValue: { fontSize: 12, fontFamily: "Helvetica-Bold", marginTop: 2 },

  // Remarks
  remarkRow: { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: PDF.borderLight, paddingVertical: 3 },
  remarkLabel: { width: 110, fontFamily: "Helvetica-Bold" },
  remarkValue: { flex: 1 },

  // Signatures
  signatureRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  signatureBlock: { width: "48%" },
  signatureImage: { height: 32, objectFit: "contain", marginVertical: 2 },
  signatureLine: { borderBottomWidth: 0.5, borderBottomColor: PDF.border, marginTop: 14 },
  signatureCaption: { fontSize: 7, color: PDF.muted, marginTop: 2 },

  // Grading scale
  gradingScale: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: PDF.borderLight,
    borderRadius: 4,
    padding: 6,
    fontSize: 7.5,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 16,
    left: 32,
    right: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    color: PDF.muted,
    borderTopWidth: 0.5,
    borderTopColor: PDF.borderLight,
    paddingTop: 4,
  },
})
