import { getCurrentUser } from "@/lib/auth/auth"
import { buildTemplateWorkbook, TEMPLATE_FILENAME } from "@/lib/excel/template"

/** Download the bulk-upload Excel template. Authenticated admins only. */
export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const buffer = buildTemplateWorkbook()

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${TEMPLATE_FILENAME}"`,
      "Cache-Control": "no-store",
    },
  })
}
