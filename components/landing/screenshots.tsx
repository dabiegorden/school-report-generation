import type { LucideIcon } from "lucide-react"
import { FileSpreadsheet, FileText, Keyboard, UploadCloud } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { screenshotTabs } from "./data"
import { DashboardMockup } from "./mockups"
import { Section, SectionHeading } from "./section"

export function Screenshots() {
  return (
    <Section id="screenshots">
      <SectionHeading
        eyebrow="Product preview"
        title="A focused workspace for every reporting task."
        description="Switch between uploads, manual entry, review tables and report previews without losing context."
      />
      <Tabs className="mt-14" defaultValue={screenshotTabs[0]}>
        <TabsList className="mx-auto grid h-auto w-full max-w-3xl grid-cols-2 rounded-2xl border border-border bg-muted/25 p-1 md:grid-cols-4">
          {screenshotTabs.map((tab) => (
            <TabsTrigger className="rounded-xl" key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent className="mt-8" value="Dashboard">
          <DashboardMockup />
        </TabsContent>
        <TabsContent className="mt-8" value="Manual Entry">
          <Panel icon={Keyboard} title="Manual Entry" badge="12 subjects">
            <div className="grid gap-3 md:grid-cols-2">
              {["Mathematics", "English Language", "Basic Science", "Civic Education"].map((subject, index) => (
                <label className="rounded-xl border border-border bg-muted/20 p-4" key={subject}>
                  <span className="text-sm font-medium">{subject}</span>
                  <span className="mt-3 block rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                    {88 - index * 4}
                  </span>
                </label>
              ))}
            </div>
          </Panel>
        </TabsContent>
        <TabsContent className="mt-8" value="Bulk Upload">
          <Panel icon={UploadCloud} title="Bulk Upload" badge="Validated">
            <div className="rounded-2xl border border-dashed border-blue-600/40 bg-blue-600/5 p-8 text-center">
              <FileSpreadsheet className="mx-auto mb-4 size-8 text-blue-600" />
              <p className="font-medium">grade-6-term-2-results.xlsx</p>
              <p className="mt-2 text-sm text-muted-foreground">128 students, 12 subjects and 1,536 scores detected.</p>
            </div>
          </Panel>
        </TabsContent>
        <TabsContent className="mt-8" value="Report Preview">
          <Panel icon={FileText} title="Report Card Preview" badge="Print ready">
            <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-xl font-semibold">Evergreen School</p>
                  <p className="text-sm text-muted-foreground">Student performance report</p>
                </div>
                <Badge className="bg-blue-600 text-white">Term 2</Badge>
              </div>
              <div className="mt-5 grid gap-3 text-sm">
                {["Academic performance: Excellent", "Conduct: Very good", "Attendance: 96%", "Teacher remark: Promoted"].map((item) => (
                  <div className="rounded-lg bg-muted/40 px-4 py-3" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </TabsContent>
      </Tabs>
    </Section>
  )
}

function Panel({
  badge,
  children,
  icon: Icon,
  title,
}: {
  badge: string
  children: React.ReactNode
  icon: LucideIcon
  title: string
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-xl shadow-black/5 dark:shadow-black/30">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
            <Icon className="size-4" />
          </span>
          <p className="font-semibold">{title}</p>
        </div>
        <Badge variant="outline">{badge}</Badge>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  )
}
