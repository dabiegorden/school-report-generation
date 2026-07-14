"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"

import { updateSchoolSettings } from "@/actions/settings/settings"
import type { SchoolSettings } from "@/db"
import { settingsFormSchema, type SettingsFormValues } from "@/lib/validations/settings"
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

type FieldName = keyof SettingsFormValues

type FieldConfig = {
  name: FieldName
  label: string
  placeholder?: string
  multiline?: boolean
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
      { name: "schoolName", label: "School name", placeholder: "Reportly Academy" },
      { name: "address", label: "Address", placeholder: "123 School Road", multiline: true },
      { name: "phone", label: "Phone", placeholder: "+233 000 000 000" },
      { name: "logo", label: "Logo URL", placeholder: "https://…" },
    ],
  },
  {
    title: "Signatories",
    description: "Names and signature references used on printed reports.",
    fields: [
      { name: "headTeacherName", label: "Head teacher name" },
      { name: "headTeacherSignature", label: "Head teacher signature URL" },
      { name: "defaultClassTeacher", label: "Default class teacher" },
      { name: "classTeacherSignature", label: "Class teacher signature URL" },
    ],
  },
  {
    title: "Academic period",
    description: "Defaults used when creating a new report.",
    fields: [
      { name: "academicYear", label: "Academic year", placeholder: "2025/2026" },
      { name: "currentTerm", label: "Current term", placeholder: "Term 2" },
      { name: "nextTermBegins", label: "Next term begins", placeholder: "8 January 2026" },
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
                    <FormItem className={field.multiline ? "sm:col-span-2" : undefined}>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        {field.multiline ? (
                          <Textarea
                            placeholder={field.placeholder}
                            disabled={isPending}
                            {...rhfField}
                          />
                        ) : (
                          <Input
                            placeholder={field.placeholder}
                            disabled={isPending}
                            {...rhfField}
                          />
                        )}
                      </FormControl>
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
