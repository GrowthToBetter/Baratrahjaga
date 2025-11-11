"use server"

import cloudinary from "@/lib/cloudinary"

const CLOUDINARY_FOLDER = "supfruit"

export const uploadImageToCloudinary = async (input: {
  base64: string
  publicId: string
}) => {
  try {
    const result = await cloudinary.uploader.upload(input.base64, {
      folder: CLOUDINARY_FOLDER,
      public_id: input.publicId,
      resource_type: "image",
    })

    return {
      url: result.secure_url,
      publicId: result.public_id,
    }
  } catch (error: any) {
    console.error("Cloudinary upload error:", error)
    console.error("Cloudinary upload error:", {
      message: error?.message,
      name: error?.name,
      http_code: error?.http_code,
      details: error,
    })
    throw new Error(error?.message ?? "Failed to upload image to Cloudinary")
  }
}

export const uploadCertificateToCloudinary = async (input: {
  base64: string
  publicId: string
  fileType: "pdf" | "image"
}) => {
  try {
    const publicIdWithExtension = input.fileType === "pdf" ? `${input.publicId}.pdf` : input.publicId

    const uploadOptions: any = {
      folder: `${CLOUDINARY_FOLDER}/certificates`,
      public_id: publicIdWithExtension,
      overwrite: true,
    }

    if (input.fileType === "pdf") {
      uploadOptions.resource_type = "raw"
      uploadOptions.format = "pdf"
      uploadOptions.upload_preset = "ml_default"
      uploadOptions.access_mode = "public"
    } else {
      uploadOptions.resource_type = "image"
    }

    const result = await cloudinary.uploader.upload(input.base64, uploadOptions)

    return {
      url: result.secure_url,
      downloadUrl: result.secure_url,
      publicId: result.public_id,
    }
  } catch (error: any) {
    console.error("Cloudinary certificate upload error:", error)
    console.error("Cloudinary certificate upload error:", {
      message: error?.message,
      name: error?.name,
      http_code: error?.http_code,
      details: error,
    })
    throw new Error(error?.message ?? "Failed to upload certificate to Cloudinary")
  }
}
