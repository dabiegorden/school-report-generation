"use client"

import * as React from "react"
import { toast } from "sonner"
import { ImageIcon, Loader2, Trash2, Upload } from "lucide-react"

import { uploadSchoolImage } from "@/actions/settings/upload-logo"
import { Button } from "@/components/ui/button"

type ImageUploadFieldProps = {
  label: string
  hint?: string
  value: string
  onChange: (url: string) => void
}

/**
 * Optional image field backed by Cloudinary. The file is sent to a Server
 * Action (the API secret never reaches the browser); the returned secure URL
 * is stored on the form and previewed immediately, then persisted on save.
 */
export function ImageUploadField({
  label,
  hint,
  value,
  onChange,
}: ImageUploadFieldProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = React.useState(false)

  async function handleFile(file: File | undefined) {
    if (!file) return
    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    try {
      const result = await uploadSchoolImage(formData)
      if (result.success && result.url) {
        onChange(result.url)
        toast.success(`${label} uploaded.`)
      } else {
        toast.error(result.error ?? "Upload failed.")
      }
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>

      <div className="flex items-center gap-4">
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/30">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote Cloudinary preview; no optimization needed
            <img
              src={value}
              alt={`${label} preview`}
              className="size-full object-contain"
            />
          ) : (
            <ImageIcon className="size-6 text-muted-foreground" />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isUploading}
            onClick={() => inputRef.current?.click()}
          >
            {isUploading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Upload className="size-4" />
            )}
            {value ? "Replace" : "Upload"}
          </Button>

          {value ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive"
              disabled={isUploading}
              onClick={() => onChange("")}
            >
              <Trash2 className="size-4" />
              Remove
            </Button>
          ) : null}

          {hint ? (
            <p className="w-full text-xs text-muted-foreground">{hint}</p>
          ) : null}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          void handleFile(event.target.files?.[0])
          event.target.value = ""
        }}
      />
    </div>
  )
}
