/** Default subjects shown on a new report, in report-card order. */
export const DEFAULT_SUBJECTS = [
  "Career Technology",
  "Ghanaian Language",
  "Computing",
  "Religious & Moral Education",
  "Social Studies",
  "French Language",
  "English Language",
  "Creative Art",
  "Mathematics",
  "Integrated Science",
] as const

/** Maximum continuous-assessment (class) score for a subject. */
export const MAX_CLASS_SCORE = 50
/** Maximum examination score for a subject. */
export const MAX_EXAM_SCORE = 50
/** Maximum obtainable total per subject (class + exam). */
export const MAX_SUBJECT_TOTAL = MAX_CLASS_SCORE + MAX_EXAM_SCORE
