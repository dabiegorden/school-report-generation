"use client"

import { useFormContext } from "react-hook-form"

import type { ReportFormValues } from "@/lib/validations/report"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type RemarkField = {
  name: keyof ReportFormValues
  label: string
  multiline?: boolean
}

const REMARK_FIELDS: RemarkField[] = [
  { name: "interest", label: "Interest" },
  { name: "attitude", label: "Attitude" },
  { name: "conduct", label: "Conduct" },
  { name: "classTeacherRemark", label: "Class teacher remark", multiline: true },
  { name: "headTeacherRemark", label: "Head teacher remark", multiline: true },
]

export function RemarksForm() {
  const form = useFormContext<ReportFormValues>()

  return (
    <Card>
      <CardHeader>
        <CardTitle>General remarks</CardTitle>
        <CardDescription>Qualitative feedback for this student.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 sm:grid-cols-2">
        {REMARK_FIELDS.map((field) => (
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
                      {...rhfField}
                      value={typeof rhfField.value === "string" ? rhfField.value : ""}
                    />
                  ) : (
                    <Input
                      {...rhfField}
                      value={typeof rhfField.value === "string" ? rhfField.value : ""}
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
  )
}
