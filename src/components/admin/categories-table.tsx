"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { deleteCategory } from "@/utils/categories"

interface Category {
  id: string
  name: string
  cover: string
  _count: {
    product: number
    certificate: number
  }
}

interface CategoriesTableProps {
  categories: Category[]
}

export function CategoriesTable({ categories }: CategoriesTableProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (
      !confirm("Are you sure you want to delete this category? This will affect related products and certificates.")
    ) {
      return
    }

    setDeletingId(id)
    const result = await deleteCategory(id)

    if (result.success) {
      router.refresh()
    } else {
      alert("Error: " + result.error)
    }
    setDeletingId(null)
  }

  if (categories.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No categories found. Create your first category to get started.</p>
      </Card>
    )
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Cover</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Products</TableHead>
            <TableHead className="text-center">Certificates</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
                  <img
                    src={category.cover || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className="text-center">{category._count.product}</TableCell>
              <TableCell className="text-center">{category._count.certificate}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/categories/${category.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(category.id)}
                    disabled={deletingId === category.id}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
