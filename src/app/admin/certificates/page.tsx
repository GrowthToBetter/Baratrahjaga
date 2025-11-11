
import { CertificatesTable } from "@/components/admin/certificate-table"
import { Button } from "@/components/ui/button"
import { getCertificates } from "@/utils/certificates"
import Link from "next/link"

export const metadata = {
  title: "Certificates Admin - Dashboard",
  description: "Manage certificates",
}

export default async function CertificatesAdminPage() {
  const certificates = await getCertificates()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Certificates</h1>
            <p className="text-white/60 mt-1">Manage your certificates and achievements</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/5 bg-transparent">
              <Link href="/">Back to Home</Link>
            </Button>
            <Button asChild className="bg-white text-black hover:bg-white/90">
              <Link href="/admin/certificates/new">Add Certificate</Link>
            </Button>
          </div>
        </div>

        {/* Table */}
        <CertificatesTable certificates={certificates} />
      </div>
    </div>
  )
}
