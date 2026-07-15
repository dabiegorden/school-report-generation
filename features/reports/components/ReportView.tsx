import { format } from "date-fns"

import type { Report } from "@/db"
import { ordinalOrDash } from "@/lib/format"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/** A labelled read-only value. */
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-medium">{value || "—"}</p>
    </div>
  )
}

export function ReportView({ report }: { report: Report }) {
  const studentDetails: Array<[string, string]> = [
    ["Student name", report.studentName],
    ["Admission number", report.admissionNumber],
    ["Current class", report.currentClass],
    ["Roll number", report.rollNumber],
    ["Attendance", report.attendance],
    ["Class teacher", report.classTeacher],
    ["Academic year", report.academicYear],
    ["Term", report.term],
    ["Created by", report.createdBy],
    ["Last updated", format(new Date(report.updatedAt), "d MMM yyyy, HH:mm")],
  ]

  const summary: Array<[string, string]> = [
    ["Grand total", String(report.grandTotal)],
    ["Percentage", `${report.percentage}%`],
    ["Average", String(report.average)],
    ["Overall grade", String(report.overallGrade)],
    ["Overall position", ordinalOrDash(report.overallPosition)],
  ]

  const remarks: Array<[string, string]> = [
    ["Interest", report.interest],
    ["Attitude", report.attitude],
    ["Conduct", report.conduct],
    ["Class teacher remark", report.classTeacherRemark],
    ["Head teacher remark", report.headTeacherRemark],
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Student information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {studentDetails.map(([label, value]) => (
            <Detail key={label} label={label} value={value} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Subject</th>
                  <th className="pb-3 px-2 font-medium">Class</th>
                  <th className="pb-3 px-2 font-medium">Exam</th>
                  <th className="pb-3 px-2 font-medium">Total</th>
                  <th className="pb-3 px-2 font-medium">Grade</th>
                </tr>
              </thead>
              <tbody>
                {report.subjects.map((subject) => (
                  <tr key={subject.subject} className="border-t border-border">
                    <td className="py-2 pr-4 font-medium">{subject.subject}</td>
                    <td className="py-2 px-2 tabular-nums">{subject.classScore}</td>
                    <td className="py-2 px-2 tabular-nums">{subject.examScore}</td>
                    <td className="py-2 px-2 tabular-nums">{subject.total}</td>
                    <td className="py-2 px-2 tabular-nums font-medium">
                      {subject.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {summary.map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-muted/20 p-4"
            >
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>General remarks</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          {remarks.map(([label, value]) => (
            <Detail key={label} label={label} value={value} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
