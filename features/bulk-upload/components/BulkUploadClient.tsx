"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { saveImport } from "@/actions/reports/import"
import { computeClassResults } from "@/lib/calculations"
import type { ImportedStudent } from "@/lib/excel/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { PreviewRow } from "../types"
import { ExcelParser } from "./ExcelParser"
import { ImportToolbar } from "./ImportToolbar"
import { NavigationControls } from "./NavigationControls"
import { PreviewTable } from "./PreviewTable"
import { ReportPreview, type PreviewSchool } from "./ReportPreview"
import { ValidationSummary } from "./ValidationSummary"

/** Count admission numbers (case-insensitive) to detect duplicates live. */
function duplicateKeys(students: ImportedStudent[]): Set<string> {
  const counts = new Map<string, number>()
  for (const s of students) {
    const key = s.admissionNumber.toLowerCase()
    if (key) counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return new Set(
    [...counts.entries()].filter(([, n]) => n > 1).map(([key]) => key)
  )
}

export function BulkUploadClient({ school }: { school: PreviewSchool }) {
  const router = useRouter()
  const [students, setStudents] = React.useState<ImportedStudent[] | null>(null)
  const [previewId, setPreviewId] = React.useState<string | null>(null)
  const [isSaving, startSaving] = React.useTransition()

  // Recompute results, positions and merged errors whenever the set changes.
  const rows = React.useMemo<PreviewRow[]>(() => {
    if (!students) return []
    const results = computeClassResults(
      students.map((s) => ({ subjects: s.subjects }))
    )
    const dupes = duplicateKeys(students)
    return students.map((student, index) => {
      const errors = [...student.errors]
      if (dupes.has(student.admissionNumber.toLowerCase())) {
        errors.push(`Duplicate Admission Number "${student.admissionNumber}"`)
      }
      return { student, result: results[index], errors, valid: errors.length === 0 }
    })
  }, [students])

  const validRows = React.useMemo(() => rows.filter((r) => r.valid), [rows])
  const invalidCount = rows.length - validRows.length

  // Keep the report-preview selection valid as rows are deleted.
  const currentIndex = Math.max(
    0,
    validRows.findIndex((r) => r.student.id === previewId)
  )
  const currentRow = validRows[currentIndex]

  function handleDelete(id: string) {
    setStudents((prev) => prev?.filter((s) => s.id !== id) ?? null)
  }

  function handleSave() {
    startSaving(async () => {
      const payload = rows.map(({ student }) => ({
        studentName: student.studentName,
        admissionNumber: student.admissionNumber,
        currentClass: student.currentClass,
        rollNumber: student.rollNumber,
        attendance: student.attendance,
        subjects: student.subjects,
        interest: student.interest,
        attitude: student.attitude,
        conduct: student.conduct,
        headTeacherRemark: student.headTeacherRemark,
        classTeacherRemark: student.classTeacherRemark,
      }))

      const result = await saveImport(payload)
      if (result.success) {
        toast.success(`Imported ${result.count} report${result.count === 1 ? "" : "s"}.`)
        router.push("/dashboard/reports")
      } else {
        toast.error(result.error ?? "Could not import the reports.")
      }
    })
  }

  if (!students) {
    return <ExcelParser onParsed={(parsed) => setStudents(parsed)} />
  }

  return (
    <div className="space-y-6">
      <ImportToolbar
        total={rows.length}
        validCount={validRows.length}
        invalidCount={invalidCount}
        isSaving={isSaving}
        onBack={() => setStudents(null)}
        onSave={handleSave}
      />

      <ValidationSummary rows={rows} />

      <Tabs defaultValue="table">
        <TabsList>
          <TabsTrigger value="table">Preview table</TabsTrigger>
          <TabsTrigger value="reports" disabled={validRows.length === 0}>
            Report cards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="mt-4">
          <PreviewTable rows={rows} onDelete={handleDelete} />
        </TabsContent>

        <TabsContent value="reports" className="mt-4 space-y-4">
          {currentRow ? (
            <>
              <NavigationControls
                options={validRows.map((r) => ({
                  id: r.student.id,
                  label: `${r.student.studentName} · ${r.student.admissionNumber}`,
                }))}
                currentId={currentRow.student.id}
                position={currentIndex + 1}
                total={validRows.length}
                onSelect={setPreviewId}
                onPrev={() =>
                  setPreviewId(validRows[Math.max(0, currentIndex - 1)].student.id)
                }
                onNext={() =>
                  setPreviewId(
                    validRows[Math.min(validRows.length - 1, currentIndex + 1)]
                      .student.id
                  )
                }
              />
              <ReportPreview row={currentRow} school={school} />
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              No valid students to preview.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
