"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { uploadCertificateToCloudinary } from "@/utils/cloudinary.utils"
import { createCertificate, updateCertificate } from "@/utils/certificates"
import { Progress } from "@radix-ui/react-progress"

interface Category {
  id: string
  name: string
  cover: string
}

interface Certificate {
  id: string
  name: string
  issuer: string | null
  path: string
  file_type: string | null // Added file_type field
  desc: string | null
  issued_date: string | null
  category_id: string | null
  category?: Category | null
}

interface CertificateFormProps {
  categories: Category[]
  certificate?: Certificate
}

export function CertificateForm({ categories, certificate }: CertificateFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(certificate?.path || null)
  const [fileType, setFileType] = useState<string | null>(certificate?.file_type || null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const isPdf = file.type === "application/pdf"
      const isImage = file.type.startsWith("image/")

      if (!isPdf && !isImage) {
        toast.error("Invalid file type", {
          description: "Please select an image or PDF file",
        })
        return
      }

      setSelectedFile(file)
      setFileType(isPdf ? "pdf" : "image")

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Get form values
    const formElement = e.currentTarget
    const formData = new FormData(formElement)
    const name = formData.get("name") as string
    const issuer = formData.get("issuer") as string
    const desc = formData.get("desc") as string
    const issued_date = formData.get("issued_date") as string
    const category_id = formData.get("category_id") as string

    // Validate required fields
    if (!name) {
      toast.error("Validation error", {
        description: "Certificate name is required",
      })
      return
    }

    // Check if file is required
    if (!certificate && !selectedFile) {
      toast.error("Validation error", {
        description: "Please select a certificate file",
      })
      return
    }

    setLoading(true)
    setIsUploading(true)
    setUploadProgress(0)

    try {
      let cloudinaryUrl = certificate?.path || ""
      let cloudinaryDownloadUrl = certificate?.path || ""

      // Upload file if selected
      if (selectedFile) {
        // Convert file to base64
        const arrayBuffer = await selectedFile.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const base64String = buffer.toString("base64")

        // Simulate progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + 10
          })
        }, 200)

        if (selectedFile.type === "application/pdf") {
          const dataURI = `data:application/pdf;base64,${base64String}`
          const result = await uploadCertificateToCloudinary({
            base64: dataURI,
            publicId: `cert-${Date.now()}`,
            fileType: "pdf",
          })
          cloudinaryUrl = result.url
          cloudinaryDownloadUrl = result.downloadUrl
        } else if (selectedFile.type.startsWith("image/")) {
          const dataURI = `data:${selectedFile.type};base64,${base64String}`
          const result = await uploadCertificateToCloudinary({
            base64: dataURI,
            publicId: `cert-${Date.now()}`,
            fileType: "image",
          })
          cloudinaryUrl = result.url
          cloudinaryDownloadUrl = result.downloadUrl
        }

        clearInterval(progressInterval)
        setUploadProgress(100)
      }

      // Create FormData for database
      const dbFormData = new FormData()
      dbFormData.set("name", name)
      dbFormData.set("issuer", issuer)
      dbFormData.set("desc", desc)
      dbFormData.set("issued_date", issued_date)
      dbFormData.set("category_id", category_id)
      dbFormData.set("path", cloudinaryUrl)
      dbFormData.set("download_url", cloudinaryDownloadUrl)
      dbFormData.set("file_type", fileType || "image")

      // Save to database
      const result = certificate
        ? await updateCertificate(certificate.id, dbFormData)
        : await createCertificate(dbFormData)

      if (result.success) {
        toast.success("Success", {
          description: certificate ? "Certificate updated successfully" : "Certificate created successfully",
        })

        // Reset form
        setSelectedFile(null)
        setPreview(null)
        setFileType(null)
        setDownloadUrl(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }

        router.push("/admin/certificates")
        router.refresh()
      } else {
        toast.error("Error", {
          description: result.error || "Failed to save certificate",
        })
      }
    } catch (error) {
      console.error("[v0] Certificate upload error:", error)
      toast.error("Upload failed", {
        description: error instanceof Error ? error.message : "Failed to upload certificate",
      })
    } finally {
      setLoading(false)
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <Card className="bg-white/[0.02] border-white/10 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Certificate Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white/80">
            Certificate Name *
          </Label>
          <Input
            id="name"
            name="name"
            defaultValue={certificate?.name}
            required
            placeholder="e.g., AWS Certified Developer"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>

        {/* Issuer */}
        <div className="space-y-2">
          <Label htmlFor="issuer" className="text-white/80">
            Issuer
          </Label>
          <Input
            id="issuer"
            name="issuer"
            defaultValue={certificate?.issuer || ""}
            placeholder="e.g., Amazon Web Services"
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="desc" className="text-white/80">
            Description
          </Label>
          <Textarea
            id="desc"
            name="desc"
            defaultValue={certificate?.desc || ""}
            placeholder="Brief description of the certification..."
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[100px]"
          />
        </div>

        {/* Issued Date */}
        <div className="space-y-2">
          <Label htmlFor="issued_date" className="text-white/80">
            Issued Date
          </Label>
          <Input
            id="issued_date"
            name="issued_date"
            type="date"
            defaultValue={certificate?.issued_date || ""}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category_id" className="text-white/80">
            Category
          </Label>
          <select
            id="category_id"
            name="category_id"
            defaultValue={certificate?.category_id || ""}
            className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white"
          >
            <option value="">No category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <Label htmlFor="file" className="text-white/80">
            Certificate File {!certificate && "*"}
          </Label>
          <Input
            ref={fileInputRef}
            id="file"
            name="file"
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="bg-white/5 border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-white/10 file:text-white/80 hover:file:bg-white/20"
          />
          <p className="text-xs text-white/50">Accepts images (PNG, JPG) or PDF files</p>
        </div>

        {isUploading && uploadProgress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/60">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        {/* Preview */}
        {preview && (
          <div className="space-y-2">
            <Label className="text-white/80">Preview</Label>
            {fileType === "pdf" ? (
              <div className="w-full max-w-md rounded-lg overflow-hidden bg-white/5 border border-white/10 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <Badge variant="outline" className="border-red-500/30 text-red-500 bg-red-500/10 mb-2">
                      PDF Document
                    </Badge>
                    <p className="text-white/60 text-sm">{selectedFile ? selectedFile.name : "PDF file selected"}</p>
                    {certificate?.path && !selectedFile && (
                      <a
                        href={certificate.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-white/40 hover:text-white/60 underline"
                      >
                        View current PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-md aspect-[4/3] rounded-lg overflow-hidden bg-white/5 border border-white/10">
                <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={loading || isUploading}
            className="flex-1 bg-white text-black hover:bg-white/90"
          >
            {isUploading
              ? `Uploading... ${uploadProgress}%`
              : loading
                ? "Saving..."
                : certificate
                  ? "Update Certificate"
                  : "Create Certificate"}
          </Button>
        </div>
      </form>
    </Card>
  )
}
