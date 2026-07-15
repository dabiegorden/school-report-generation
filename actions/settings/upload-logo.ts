"use server"

import { v2 as cloudinary, type UploadApiResponse } from "cloudinary"

import { getCurrentUser } from "@/lib/auth/auth"

// Configured at module scope (idempotent). The API secret never leaves the
// server — the browser only ever receives the resulting secure_url.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const MAX_LOGO_BYTES = 5 * 1024 * 1024 // 5 MB

export type UploadLogoResult = {
  success: boolean
  url?: string
  error?: string
}

/**
 * Upload a school logo (or signature) image to Cloudinary and return its
 * secure URL. Optional feature — the caller stores the URL in school settings.
 */
export async function uploadSchoolImage(
  formData: FormData
): Promise<UploadLogoResult> {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: "Not authenticated." }

  const file = formData.get("file")
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, error: "Please choose an image to upload." }
  }
  if (!file.type.startsWith("image/")) {
    return { success: false, error: "Only image files are supported." }
  }
  if (file.size > MAX_LOGO_BYTES) {
    return { success: false, error: "The image must be smaller than 5 MB." }
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "reportly/school", resource_type: "image" },
          (error, response) => {
            if (error || !response) return reject(error)
            resolve(response)
          }
        )
        .end(buffer)
    })

    return { success: true, url: result.secure_url }
  } catch {
    return { success: false, error: "Upload failed. Please try again." }
  }
}
