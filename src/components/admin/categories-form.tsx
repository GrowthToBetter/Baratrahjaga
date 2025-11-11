"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createCategory, updateCategory } from "@/utils/categories"

interface Category {
  id: string
  name: string
  cover: string
}

interface CategoryFormProps {
  category?: Category
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(category?.cover || null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      // Handle file upload
      const fileInput = e.currentTarget.querySelector('input[name="cover"]') as HTMLInputElement
      const file = fileInput?.files?.[0]

      if (file) {
        const reader = new FileReader()
        reader.onloadend = async () => {
          formData.set("cover", reader.result as string)

          const result = category ? await updateCategory(category.id, formData) : await createCategory(formData)

          if (result.success) {
            router.push("/admin/categories")
            router.refresh()
          } else {
            alert("Error: " + result.error)
          }
          setLoading(false)
        }
        reader.readAsDataURL(file)
      } else if (category) {
        // Update without file
        const result = await updateCategory(category.id, formData)
        if (result.success) {
          router.push("/admin/categories")
          router.refresh()
        } else {
          alert("Error: " + result.error)
        }
        setLoading(false)
      } else {
        alert("Please select a cover image")
        setLoading(false)
      }
    } catch (error) {
      alert("Error submitting form")
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Category Name *</Label>
          <Input
            id="name"
            name="name"
            defaultValue={category?.name}
            required
            placeholder="e.g., Web Development, Cloud Computing"
          />
        </div>

        {/* Cover Image Upload */}
        <div className="space-y-2">
          <Label htmlFor="cover">Cover Image {!category && "*"}</Label>
          <Input
            id="cover"
            name="cover"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required={!category}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
          <p className="text-xs text-muted-foreground">Recommended size: 800x600px or similar ratio</p>
        </div>

        {/* Preview */}
        {preview && (
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="w-full max-w-md aspect-[4/3] rounded-lg overflow-hidden bg-muted border">
              <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? "Saving..." : category ? "Update Category" : "Create Category"}
          </Button>
        </div>
      </form>
    </Card>
  )
}
