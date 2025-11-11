import { CertificateForm } from "@/components/admin/certificate-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Edit Certificate - Admin",
  description: "Edit certificate",
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    })
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

async function getCertificate(id: string) {
  try {
    const certificate = await prisma.certificate.findUnique({
      where: { id },
      include: { category: true },
    })
    return certificate
  } catch (error) {
    console.error("Error fetching certificate:", error)
    return null
  }
}

export default async function EditCertificatePage({
  params,
}: {
  params: Promise<{ id: string }> // params is now a Promise in Next.js 16
}) {
  const { id } = await params // await params before destructuring
  const [categories, certificate] = await Promise.all([getCategories(), getCertificate(id)])

  if (!certificate) {
    notFound()
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Certificate</h1>
          <p className="text-muted-foreground mt-1">Update certificate information</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/certificates">Cancel</Link>
        </Button>
      </div>

      {/* Form */}
      <CertificateForm categories={categories} certificate={certificate} />
    </div>
  )
}
