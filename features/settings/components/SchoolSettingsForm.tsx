"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"

import { updateSchoolSettings } from "@/actions/settings/settings"
import type { SchoolSettings } from "@/db"
import {
  settingsFormSchema,
  type SettingsFormValues,
} from "@/lib/validations/settings"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageUploadField } from "./ImageUploadField"

type FieldName = keyof SettingsFormValues

type FieldConfig = {
  name: FieldName
  label: string
  placeholder?: string
  hint?: string
  type?: "text" | "textarea" | "color" | "image"
  /** Render across the full width of the two-column grid. */
  wide?: boolean
}

type FieldGroup = {
  title: string
  description: string
  fields: FieldConfig[]
}

/** Field groups rendered as cards. Data-driven to avoid repeated JSX. */
const FIELD_GROUPS: FieldGroup[] = [
  {
    title: "School information",
    description: "Shown at the top of every report card.",
    fields: [
      { name: "schoolName", label: "School name", placeholder: "Drobo Senior High" },
      {
        name: "address",
        label: "Address",
        placeholder: "P.O. Box 449 Drobo",
        type: "textarea",
        wide: true,
      },
      { name: "phone", label: "Phone", placeholder: "0592903160" },
      {
        name: "logo",
        label: "School logo",
        type: "image",
        hint: "Optional. Shown top-left of the report; initials are used if empty.",
        wide: true,
      },
    ],
  },
  {
    title: "Signatories",
    description: "Names and signatures printed on report cards.",
    fields: [
      { name: "headTeacherName", label: "Head teacher name" },
      { name: "defaultClassTeacher", label: "Default class teacher" },
      {
        name: "headTeacherSignature",
        label: "Head teacher signature",
        type: "image",
        hint: "Optional. A signature line is printed when empty.",
      },
      {
        name: "classTeacherSignature",
        label: "Class teacher signature",
        type: "image",
        hint: "Optional. A signature line is printed when empty.",
      },
    ],
  },
  {
    title: "Academic period",
    description: "Defaults used when creating a new report.",
    fields: [
      { name: "academicYear", label: "Academic year", placeholder: "2025/2026" },
      { name: "currentTerm", label: "Current term", placeholder: "2ND TERM" },
      {
        name: "nextTermBegins",
        label: "Next term begins",
        placeholder: "2026-04-21",
      },
    ],
  },
  {
    title: "Report layout",
    description:
      "Default header, footer and colours on generated PDFs. You can also tweak these per print from the Reports page.",
    fields: [
      {
        name: "reportHeaderTitle",
        label: "Header title",
        placeholder: "TERMINAL REPORT",
      },
      {
        name: "reportFooterNote",
        label: "Footer note",
        placeholder: "Defaults to the school name",
      },
      { name: "reportAccentColor", label: "Accent colour", type: "color" },
      { name: "reportSectionColor", label: "Section background", type: "color" },
    ],
  },
]

/** Build defaults from the persisted settings row. */
function toDefaults(settings: SchoolSettings): SettingsFormValues {
  return {
    schoolName: settings.schoolName,
    address: settings.address,
    phone: settings.phone,
    logo: settings.logo,
    headTeacherName: settings.headTeacherName,
    headTeacherSignature: settings.headTeacherSignature,
    defaultClassTeacher: settings.defaultClassTeacher,
    classTeacherSignature: settings.classTeacherSignature,
    academicYear: settings.academicYear,
    currentTerm: settings.currentTerm,
    nextTermBegins: settings.nextTermBegins,
    reportHeaderTitle: settings.reportHeaderTitle,
    reportFooterNote: settings.reportFooterNote,
    reportAccentColor: settings.reportAccentColor,
    reportSectionColor: settings.reportSectionColor,
  }
}

export function SchoolSettingsForm({ settings }: { settings: SchoolSettings }) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: toDefaults(settings),
  })

  function onSubmit(values: SettingsFormValues) {
    startTransition(async () => {
      const result = await updateSchoolSettings(values)
      if (result.success) {
        toast.success("School settings saved.")
      } else {
        toast.error(result.error ?? "Could not save settings.")
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {FIELD_GROUPS.map((group) => (
          <Card key={group.title}>
            <CardHeader>
              <CardTitle>{group.title}</CardTitle>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              {group.fields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: rhfField }) => (
                    <FormItem className={field.wide ? "sm:col-span-2" : undefined}>
                      {field.type === "image" ? (
                        <FormControl>
                          <ImageUploadField
                            label={field.label}
                            hint={field.hint}
                            value={rhfField.value}
                            onChange={rhfField.onChange}
                          />
                        </FormControl>
                      ) : (
                        <>
                          <FormLabel>{field.label}</FormLabel>
                          <FormControl>
                            {field.type === "textarea" ? (
                              <Textarea
                                placeholder={field.placeholder}
                                disabled={isPending}
                                {...rhfField}
                              />
                            ) : field.type === "color" ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  type="color"
                                  className="h-9 w-14 p-1"
                                  disabled={isPending}
                                  {...rhfField}
                                />
                                <Input
                                  aria-label={`${field.label} hex value`}
                                  className="flex-1 font-mono text-xs"
                                  disabled={isPending}
                                  {...rhfField}
                                />
                              </div>
                            ) : (
                              <Input
                                placeholder={field.placeholder}
                                disabled={isPending}
                                {...rhfField}
                              />
                            )}
                          </FormControl>
                        </>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 text-white hover:bg-blue-500"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save settings
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
