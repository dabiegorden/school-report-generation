"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"

import { saveReport, updateReport } from "@/actions/reports/reports"
import { buildSubjectScores, getSummary } from "@/lib/calculations"
import { reportFormSchema, type ReportFormValues } from "@/lib/validations/report"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { StudentInfoForm } from "./StudentInfoForm"
import { SubjectsTable } from "./SubjectsTable"
import { SummaryCard } from "./SummaryCard"
import { RemarksForm } from "./RemarksForm"

type ReportFormProps = {
  defaults: ReportFormValues
  mode: "create" | "edit"
  reportId?: string
}

export function ReportForm({ defaults, mode, reportId }: ReportFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: defaults,
    mode: "onChange",
  })

  // Live derivation: recompute totals, grades and the summary on every change.
  const watchedSubjects = form.watch("subjects")
  const { rows, summary } = React.useMemo(() => {
    const scores = buildSubjectScores(
      watchedSubjects.map((s) => ({
        subject: s.subject,
        classScore: s.classScore,
        examScore: s.examScore,
        position: s.position ?? null,
      }))
    )
    return { rows: scores, summary: getSummary(scores) }
  }, [watchedSubjects])

  function onSubmit(values: ReportFormValues) {
    startTransition(async () => {
      const result =
        mode === "edit" && reportId
          ? await updateReport(reportId, values)
          : await saveReport(values)

      if (result.success) {
        toast.success(
          mode === "edit" ? "Report updated." : "Report saved."
        )
        router.push("/dashboard/reports")
      } else {
        toast.error(result.error ?? "Could not save the report.")
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <StudentInfoForm />
        <SubjectsTable rows={rows} />
        <SummaryCard summary={summary} />
        <RemarksForm />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => router.push("/dashboard/reports")}
          >
            Cancel
          </Button>
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
                {mode === "edit" ? "Update report" : "Save report"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
