
import { CategoryForm } from "@/components/admin/categories-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "New Category - Admin",
  description: "Create a new category",
}

export default function NewCategoryPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">New Category</h1>
          <p className="text-muted-foreground mt-1">Create a new category for organizing content</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/categories">Back to Categories</Link>
        </Button>
      </div>

      {/* Form */}
      <CategoryForm />
    </div>
  )
}
