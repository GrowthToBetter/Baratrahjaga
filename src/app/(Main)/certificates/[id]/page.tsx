import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Building2, ArrowLeft, ExternalLink, Download } from "lucide-react"
import Link from "next/link"
import Layout from "@/components/dashboard/Layout"
import { CertificateViewer } from "@/components/dashboard/certificate-viewer"

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

function formatCloudinaryPdfUrl(url: string): string {
  // Return URL as-is since we set fl_attachment:inline during upload
  return url
}

export default async function CertificateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const certificate = await getCertificate(id)

  if (!certificate) {
    notFound()
  }

  const isPdf = certificate.file_type === "pdf"
  const viewUrl = certificate.path
  const downloadUrl = certificate.download_url || certificate.path

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-5xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10" asChild>
              <Link href="/certificates">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{certificate.name}</h1>
              {certificate.issuer && (
                <div className="flex items-center gap-2 mt-2 text-white/60">
                  <Building2 className="h-4 w-4" />
                  <span>{certificate.issuer}</span>
                </div>
              )}
            </div>
            {certificate.category && (
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                {certificate.category.name}
              </Badge>
            )}
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-white/60">
            {certificate.issued_date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Issued on {new Date(certificate.issued_date).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {certificate.desc && (
            <div className="bg-white/[0.02] border border-white/10 rounded-lg p-4">
              <p className="text-white/80">{certificate.desc}</p>
            </div>
          )}

          {/* Certificate Viewer */}
          <div className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02]">
            <CertificateViewer
              isPdf={isPdf}
              viewUrl={viewUrl}
              downloadUrl={downloadUrl}
              certificateName={certificate.name}
              certificatePath={certificate.path || "/placeholder.svg"}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="bg-white text-black hover:bg-white/90" asChild>
              <a href={viewUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in New Tab
              </a>
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent" asChild>
              <a href={downloadUrl} download>
                <Download className="h-4 w-4 mr-2" />
                Download
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
