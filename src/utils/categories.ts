"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { uploadImageToCloudinary } from "./cloudinary.utils"

export async function createCategory(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const cover = formData.get("cover") as string // base64

    // Upload cover image to Cloudinary
    const publicId = `category-${Date.now()}`
    const { url } = await uploadImageToCloudinary({
      base64: cover,
      publicId,
    })

    // Save to database
    const category = await prisma.category.create({
      data: {
        name,
        cover: url,
      },
    })

    revalidatePath("/admin/categories")

    return { success: true, data: category }
  } catch (error: any) {
    console.error("Error creating category:", error)
    return { success: false, error: error.message }
  }
}

export async function updateCategory(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const cover = formData.get("cover") as string | null

    const updateData: any = {
      name,
    }

    // Only upload new cover if provided
    if (cover) {
      const publicId = `category-${Date.now()}`
      const { url } = await uploadImageToCloudinary({
        base64: cover,
        publicId,
      })
      updateData.cover = url
    }

    const category = await prisma.category.update({
      where: { id },
      data: updateData,
    })

    revalidatePath("/admin/categories")

    return { success: true, data: category }
  } catch (error: any) {
    console.error("Error updating category:", error)
    return { success: false, error: error.message }
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    })

    revalidatePath("/admin/categories")

    return { success: true }
  } catch (error: any) {
    console.error("Error deleting category:", error)
    return { success: false, error: error.message }
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            product: true,
            certificate: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getCategory(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            product: true,
            certificate: true,
          },
        },
      },
    })

    return category
  } catch (error) {
    console.error("Error fetching category:", error)
    return null
  }
}
