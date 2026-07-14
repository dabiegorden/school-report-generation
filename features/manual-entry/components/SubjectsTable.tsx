"use client"

import { useFieldArray, useFormContext } from "react-hook-form"

import { MAX_CLASS_SCORE, MAX_EXAM_SCORE, type SubjectScore } from "@/lib/calculations"
import type { ReportFormValues } from "@/lib/validations/report"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FormField, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

/** Score input bound to a numeric field; empties are surfaced as NaN. */
function ScoreInput({
  name,
  max,
}: {
  name: `subjects.${number}.classScore` | `subjects.${number}.examScore`
  max: number
}) {
  const form = useFormContext<ReportFormValues>()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="space-y-1">
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            max={max}
            className="h-9 w-20"
            value={
              typeof field.value === "number" && !Number.isNaN(field.value)
                ? field.value
                : ""
            }
            onChange={(event) => field.onChange(event.target.valueAsNumber)}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
          />
          <FormMessage className="text-xs" />
        </div>
      )}
    />
  )
}

export function SubjectsTable({ rows }: { rows: SubjectScore[] }) {
  const form = useFormContext<ReportFormValues>()
  const { fields } = useFieldArray({ control: form.control, name: "subjects" })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subjects</CardTitle>
        <CardDescription>
          Class and exam scores are each out of {MAX_CLASS_SCORE}. Totals and
          grades update as you type.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">Subject</th>
                <th className="pb-3 px-2 font-medium">Class ({MAX_CLASS_SCORE})</th>
                <th className="pb-3 px-2 font-medium">Exam ({MAX_EXAM_SCORE})</th>
                <th className="pb-3 px-2 font-medium">Total</th>
                <th className="pb-3 px-2 font-medium">Grade</th>
                <th className="pb-3 pl-2 font-medium">Position</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => {
                const row = rows[index]
                return (
                  <tr key={field.id} className="border-t border-border">
                    <td className="py-2 pr-4 font-medium text-foreground">
                      {field.subject}
                    </td>
                    <td className="py-2 px-2">
                      <ScoreInput
                        name={`subjects.${index}.classScore`}
                        max={MAX_CLASS_SCORE}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <ScoreInput
                        name={`subjects.${index}.examScore`}
                        max={MAX_EXAM_SCORE}
                      />
                    </td>
                    <td className="py-2 px-2 tabular-nums">{row?.total ?? 0}</td>
                    <td className="py-2 px-2 tabular-nums font-medium">
                      {row?.grade ?? 0}
                    </td>
                    <td className="py-2 pl-2 text-muted-foreground">—</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
