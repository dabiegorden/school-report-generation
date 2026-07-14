import { DEFAULT_SUBJECTS } from "@/lib/calculations"
import type { Report, SchoolSettings } from "@/db"
import type { ReportFormValues } from "@/lib/validations/report"

type BuildDefaultsParams = {
  settings?: Pick<
    SchoolSettings,
    "defaultClassTeacher" | "academicYear" | "currentTerm"
  >
  report?: Report
}

/** Blank subject rows in report-card order (scores default to 0). */
function defaultSubjects(): ReportFormValues["subjects"] {
  return DEFAULT_SUBJECTS.map((subject) => ({
    subject,
    classScore: 0,
    examScore: 0,
    position: null,
  }))
}

/**
 * Build initial form values. When editing, an existing report takes
 * precedence; otherwise student-independent fields fall back to the school's
 * configured defaults.
 */
export function buildReportDefaults({
  settings,
  report,
}: BuildDefaultsParams): ReportFormValues {
  if (report) {
    return {
      studentName: report.studentName,
      admissionNumber: report.admissionNumber,
      currentClass: report.currentClass,
      rollNumber: report.rollNumber,
      attendance: report.attendance,
      classTeacher: report.classTeacher,
      academicYear: report.academicYear,
      term: report.term,
      subjects: report.subjects.map((s) => ({
        subject: s.subject,
        classScore: s.classScore,
        examScore: s.examScore,
        position: s.position,
      })),
      interest: report.interest,
      attitude: report.attitude,
      conduct: report.conduct,
      headTeacherRemark: report.headTeacherRemark,
      classTeacherRemark: report.classTeacherRemark,
    }
  }

  return {
    studentName: "",
    admissionNumber: "",
    currentClass: "",
    rollNumber: "",
    attendance: "",
    classTeacher: settings?.defaultClassTeacher ?? "",
    academicYear: settings?.academicYear ?? "",
    term: settings?.currentTerm ?? "",
    subjects: defaultSubjects(),
    interest: "",
    attitude: "",
    conduct: "",
    headTeacherRemark: "",
    classTeacherRemark: "",
  }
}
