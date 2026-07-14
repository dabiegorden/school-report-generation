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

type StudentField = {
  name: keyof ReportFormValues
  label: string
  placeholder?: string
}

const STUDENT_FIELDS: StudentField[] = [
  { name: "studentName", label: "Student name", placeholder: "Ama Mensah" },
  { name: "admissionNumber", label: "Admission number", placeholder: "ADM-0421" },
  { name: "currentClass", label: "Current class", placeholder: "Basic 6" },
  { name: "rollNumber", label: "Roll number", placeholder: "12" },
  { name: "attendance", label: "Attendance", placeholder: "58 / 60" },
  { name: "classTeacher", label: "Class teacher", placeholder: "Mr. Owusu" },
]

export function StudentInfoForm() {
  const form = useFormContext<ReportFormValues>()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student information</CardTitle>
        <CardDescription>Details that identify this report card.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STUDENT_FIELDS.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: rhfField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={field.placeholder}
                    {...rhfField}
                    value={typeof rhfField.value === "string" ? rhfField.value : ""}
                  />
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
