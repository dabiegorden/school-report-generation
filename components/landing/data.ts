import type { LucideIcon } from "lucide-react"
import {
  Archive,
  Calculator,
  FileSpreadsheet,
  FileText,
  LockKeyhole,
  Printer,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Zap,
} from "lucide-react"

export const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

export const schools = [
  "Northfield",
  "Evergreen",
  "Crescent",
  "St. Anne",
  "Bridgeway",
]

export type Feature = {
  title: string
  description: string
  icon: LucideIcon
}

export const features: Feature[] = [
  {
    title: "Excel Upload",
    description: "Upload hundreds of student results instantly with guided mapping.",
    icon: FileSpreadsheet,
  },
  {
    title: "Beautiful PDF Reports",
    description: "Generate clean printable report cards that look ready for parents.",
    icon: FileText,
  },
  {
    title: "Automatic Calculations",
    description: "Totals, grades, averages and positions are calculated for every class.",
    icon: Calculator,
  },
  {
    title: "Secure Login",
    description: "Protect school records behind a private dashboard and secure sessions.",
    icon: LockKeyhole,
  },
  {
    title: "One Click Printing",
    description: "Print one student report or prepare a full class batch in seconds.",
    icon: Printer,
  },
  {
    title: "Report Archive",
    description: "Find, reprint and audit previously generated report cards anytime.",
    icon: Archive,
  },
]

export const steps = [
  {
    title: "Upload Excel",
    description: "Import class sheets or start from a clean manual entry screen.",
    icon: UploadCloud,
  },
  {
    title: "Automatic Processing",
    description: "Reportly validates entries and calculates grades, totals and remarks.",
    icon: Zap,
  },
  {
    title: "Generate & Print",
    description: "Export polished PDFs for a student, class or entire term.",
    icon: Printer,
  },
]

export const benefits = [
  "Fast term-end processing",
  "Simple workflows for non-technical staff",
  "Professional printable results",
  "No manual calculations",
  "Designed for school administrators",
]

export const testimonials = [
  {
    quote:
      "Reportly turned our end-of-term reporting from a three-day rush into a calm afternoon review.",
    name: "Miriam Cole",
    role: "School Administrator, Bridgeway Academy",
  },
  {
    quote:
      "The report cards look consistent, polished and easy for parents to understand.",
    name: "Daniel Okafor",
    role: "Principal, Crescent Preparatory School",
  },
  {
    quote:
      "Excel upload, automatic grades and class batches are exactly what our teachers needed.",
    name: "Aisha Raman",
    role: "Academic Coordinator, Northfield School",
  },
]

export const faqs = [
  {
    question: "Can I upload Excel files?",
    answer:
      "Yes. Reportly is designed for bulk Excel uploads and supports guided column mapping for student results.",
  },
  {
    question: "Can I enter results manually?",
    answer:
      "Yes. Staff can enter or edit student scores directly from a clean dashboard form.",
  },
  {
    question: "Can I print all report cards at once?",
    answer:
      "Yes. You can prepare report cards for a single student, a class or a full batch.",
  },
  {
    question: "Does it calculate grades automatically?",
    answer:
      "Yes. Totals, averages, grade bands and positions can be calculated automatically from your school rules.",
  },
  {
    question: "Can I reprint old reports?",
    answer:
      "Yes. Generated reports are archived so staff can find and reprint previous term records.",
  },
  {
    question: "Is my data secure?",
    answer:
      "The platform is planned around authenticated access, protected school records and secure database storage.",
  },
  {
    question: "Can the report design match my school?",
    answer:
      "Report cards can be adapted around your school identity, grading style and preferred term format.",
  },
  {
    question: "Is pricing available yet?",
    answer:
      "The first public pricing package is coming soon. Early schools can request onboarding support.",
  },
]

export const screenshotTabs = [
  "Dashboard",
  "Manual Entry",
  "Bulk Upload",
  "Report Preview",
]

export const footerGroups = [
  { title: "Quick Links", links: ["Features", "How It Works", "Pricing", "FAQ"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security"] },
  { title: "Contact", links: ["hello@reportly.school", "+1 555 0134"] },
]

export const proofStats = [
  { label: "Reports ready", value: "4,820" },
  { label: "Class average", value: "82%" },
  { label: "Time saved", value: "11h" },
]

export const classProgress = [
  { name: "Grade 6A", status: "Ready", widthClass: "w-[92%]" },
  { name: "Grade 5B", status: "Draft", widthClass: "w-[76%]" },
  { name: "Grade 4C", status: "Draft", widthClass: "w-[60%]" },
]

export const trustBadges = [
  { label: "Secure by design", icon: ShieldCheck },
  { label: "Built for speed", icon: Zap },
  { label: "Polished output", icon: Sparkles },
]
