"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function createCertificate(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const issuer = formData.get("issuer") as string
    const desc = formData.get("desc") as string
    const issued_date = formData.get("issued_date") as string
    const category_id = formData.get("category_id") as string
    const path = formData.get("path") as string
    const download_url = formData.get("download_url") as string
    const file_type = formData.get("file_type") as string

    if (!path) {
      throw new Error("File path is required")
    }

    // Save to database
    const certificate = await prisma.certificate.create({
      data: {
        name,
        issuer: issuer || null,
        path,
        download_url: download_url || path,
        file_type,
        desc: desc || null,
        issued_date: issued_date || null,
        category_id: category_id || null,
      },
    })

    revalidatePath("/admin/certificates")
    revalidatePath("/certificates")

    return { success: true, data: certificate }
  } catch (error: any) {
    console.error("Error creating certificate:", error)
    return { success: false, error: error.message }
  }
}

export async function updateCertificate(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const issuer = formData.get("issuer") as string
    const desc = formData.get("desc") as string
    const issued_date = formData.get("issued_date") as string
    const category_id = formData.get("category_id") as string
    const path = formData.get("path") as string | null
    const download_url = formData.get("download_url") as string | null
    const file_type = formData.get("file_type") as string | null

    const updateData: any = {
      name,
      issuer: issuer || null,
      desc: desc || null,
      issued_date: issued_date || null,
      category_id: category_id || null,
    }

    if (path) {
      updateData.path = path
      updateData.download_url = download_url || path
      updateData.file_type = file_type
    }

    const certificate = await prisma.certificate.update({
      where: { id },
      data: updateData,
    })

    revalidatePath("/admin/certificates")
    revalidatePath("/certificates")

    return { success: true, data: certificate }
  } catch (error: any) {
    console.error("Error updating certificate:", error)
    return { success: false, error: error.message }
  }
}

export async function deleteCertificate(id: string) {
  try {
    await prisma.certificate.delete({
      where: { id },
    })

    revalidatePath("/admin/certificates")
    revalidatePath("/certificates")

    return { success: true }
  } catch (error: any) {
    console.error("Error deleting certificate:", error)
    return { success: false, error: error.message }
  }
}

export async function getCertificates() {
  try {
    const certificates = await prisma.certificate.findMany({
      include: {
        category: true,
      },
      orderBy: {
        created_at: "desc",
      },
    })

    return certificates
  } catch (error) {
    console.error("Error fetching certificates:", error)
    return []
  }
}
