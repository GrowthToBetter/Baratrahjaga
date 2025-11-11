import { CertificateForm } from "@/components/admin/certificate-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export const metadata = {
  title: "New Certificate - Admin",
  description: "Add new certificate",
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

export default async function NewCertificatePage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Add Certificate</h1>
            <p className="text-white/60 mt-1">Create a new certificate entry</p>
          </div>
          <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/5 bg-transparent">
            <Link href="/admin/certificates">Cancel</Link>
          </Button>
        </div>

        {/* Form */}
        <CertificateForm categories={categories} />
      </div>
    </div>
  )
}
