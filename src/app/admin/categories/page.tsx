
import { CategoriesTable } from "@/components/admin/categories-table"
import { Button } from "@/components/ui/button"
import { getCategories } from "@/utils/categories"
import Link from "next/link"

export const metadata = {
  title: "Categories Admin - Dashboard",
  description: "Manage categories",
}

export default async function CategoriesAdminPage() {
  const categories = await getCategories()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground mt-1">Manage categories for products and certificates</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/admin">Back to Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/categories/new">Add Category</Link>
          </Button>
        </div>
      </div>

      {/* Table */}
      <CategoriesTable categories={categories} />
    </div>
  )
}
