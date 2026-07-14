"use client"

import type { PreviewRow } from "../types"

export type PreviewSchool = {
  schoolName: string
  academicYear: string
  currentTerm: string
}

/** Ordinal suffix: 1 → 1st, 2 → 2nd, 3 → 3rd, etc. */
function ordinal(n: number): string {
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`
  switch (n % 10) {
    case 1:
      return `${n}st`
    case 2:
      return `${n}nd`
    case 3:
      return `${n}rd`
    default:
      return `${n}th`
  }
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="font-medium">{value || "—"}</p>
    </div>
  )
}

type ReportPreviewProps = {
  row: PreviewRow
  school: PreviewSchool
}

export function ReportPreview({ row, school }: ReportPreviewProps) {
  const { student, result } = row

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="border-b border-border pb-5 text-center">
        <h3 className="text-xl font-semibold tracking-tight">
          {school.schoolName || "School name"}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Terminal Report
          {school.currentTerm ? ` · ${school.currentTerm}` : ""}
          {school.academicYear ? ` · ${school.academicYear}` : ""}
        </p>
      </div>

      {/* Student info */}
      <div className="grid gap-4 border-b border-border py-5 sm:grid-cols-3">
        <Info label="Student" value={student.studentName} />
        <Info label="Admission no." value={student.admissionNumber} />
        <Info label="Class" value={student.currentClass} />
        <Info label="Roll number" value={student.rollNumber} />
        <Info label="Attendance" value={student.attendance} />
        <Info label="Overall position" value={ordinal(result.overallPosition)} />
      </div>

      {/* Subjects */}
      <div className="overflow-x-auto py-5">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">Subject</th>
              <th className="pb-3 px-2 text-right font-medium">Class</th>
              <th className="pb-3 px-2 text-right font-medium">Exam</th>
              <th className="pb-3 px-2 text-right font-medium">Total</th>
              <th className="pb-3 px-2 text-center font-medium">Grade</th>
              <th className="pb-3 pl-2 text-right font-medium">Position</th>
            </tr>
          </thead>
          <tbody>
            {result.subjects.map((subject) => (
              <tr key={subject.subject} className="border-t border-border">
                <td className="py-2 pr-4 font-medium">{subject.subject}</td>
                <td className="py-2 px-2 text-right tabular-nums">
                  {subject.classScore}
                </td>
                <td className="py-2 px-2 text-right tabular-nums">
                  {subject.examScore}
                </td>
                <td className="py-2 px-2 text-right tabular-nums">
                  {subject.total}
                </td>
                <td className="py-2 px-2 text-center tabular-nums">
                  {subject.grade}
                </td>
                <td className="py-2 pl-2 text-right tabular-nums">
                  {subject.position ? ordinal(subject.position) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 border-t border-border py-5 sm:grid-cols-4">
        {[
          ["Grand total", String(result.summary.grandTotal)],
          ["Percentage", `${result.summary.percentage}%`],
          ["Average", String(result.summary.average)],
          ["Overall grade", String(result.summary.overallGrade)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-border bg-muted/20 p-3">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">{value}</p>
          </div>
        ))}
      </div>

      {/* Remarks */}
      <div className="grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
        <Info label="Interest" value={student.interest} />
        <Info label="Attitude" value={student.attitude} />
        <Info label="Conduct" value={student.conduct} />
        <Info label="Class teacher remark" value={student.classTeacherRemark} />
        <Info label="Head teacher remark" value={student.headTeacherRemark} />
      </div>
    </div>
  )
}
