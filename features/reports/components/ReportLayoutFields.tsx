"use client"

import { RotateCcw } from "lucide-react"

import type { ReportLayout } from "@/lib/pdf/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ReportLayoutFieldsProps = {
  layout: ReportLayout
  onChange: (layout: ReportLayout) => void
  onReset: () => void
  isCustomized: boolean
}

type Field = {
  key: keyof ReportLayout
  label: string
  placeholder?: string
  type?: "text" | "color"
}

type FieldGroup = {
  title: string
  fields: Field[]
}

/** Grouped header/footer inputs, in the order they appear on the page. */
const GROUPS: FieldGroup[] = [
  {
    title: "School",
    fields: [
      { key: "schoolName", label: "School name", placeholder: "Drobo Senior High" },
      { key: "address", label: "Address", placeholder: "P.O. Box 449 Drobo" },
      { key: "phone", label: "Phone", placeholder: "0592903160" },
    ],
  },
  {
    title: "Report details",
    fields: [
      { key: "headerTitle", label: "Header title", placeholder: "TERMINAL REPORT" },
      { key: "classTeacher", label: "Class teacher", placeholder: "Oppong Emmanuel" },
      { key: "academicYear", label: "Academic year", placeholder: "2025/2026" },
      { key: "term", label: "Term", placeholder: "2ND TERM" },
      { key: "nextTermBegins", label: "Next term begins", placeholder: "2026-04-21" },
      { key: "footerNote", label: "Footer note", placeholder: "Defaults to school name" },
    ],
  },
  {
    title: "Colours",
    fields: [
      { key: "accentColor", label: "Accent colour", type: "color" },
      { key: "sectionColor", label: "Section background", type: "color" },
    ],
  },
]

/**
 * Edit the school identity, report details and colours applied to the
 * generated PDF. Shared by the reports toolbar and the PDF preview modal.
 */
export function ReportLayoutFields({
  layout,
  onChange,
  onReset,
  isCustomized,
}: ReportLayoutFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium">Customize report</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Applies to the PDF you preview, print or download. Report details fill
          in only where a report has no value of its own.
        </p>
      </div>

      <div className="max-h-80 space-y-5 overflow-y-auto pr-1">
        {GROUPS.map((group) => (
          <div key={group.title} className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {group.title}
            </p>
            {group.fields.map((field) => (
              <div key={field.key} className="space-y-1.5">
                <Label htmlFor={`pdf-${field.key}`}>{field.label}</Label>
                {field.type === "color" ? (
                  <div className="flex items-center gap-2">
                    <Input
                      id={`pdf-${field.key}`}
                      type="color"
                      value={layout[field.key]}
                      className="h-9 w-14 p-1"
                      onChange={(event) =>
                        onChange({ ...layout, [field.key]: event.target.value })
                      }
                    />
                    <Input
                      aria-label={`${field.label} hex value`}
                      value={layout[field.key]}
                      className="flex-1 font-mono text-xs"
                      onChange={(event) =>
                        onChange({ ...layout, [field.key]: event.target.value })
                      }
                    />
                  </div>
                ) : (
                  <Input
                    id={`pdf-${field.key}`}
                    value={layout[field.key]}
                    placeholder={field.placeholder}
                    onChange={(event) =>
                      onChange({ ...layout, [field.key]: event.target.value })
                    }
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="w-full"
        onClick={onReset}
        disabled={!isCustomized}
      >
        <RotateCcw className="size-4" />
        Reset to school defaults
      </Button>
    </div>
  )
}
