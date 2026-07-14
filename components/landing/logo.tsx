import { GraduationCap } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-600/20">
        <GraduationCap className="size-4.5" />
      </span>
      <span className="text-base font-semibold tracking-tight text-foreground">
        Reportly
      </span>
    </div>
  )
}
