import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Layout from "@/components/dashboard/Layout"

import Link from "next/link"
import { getCategories } from "@/utils/categories"
import { getCertificates } from "@/utils/certificates"
import { CertificatesFilter } from "@/components/dashboard/certificate-filter"

export const metadata = {
  title: "Certificates - Jean Richnerd Rantabaratrahjaga",
  description: "Professional certificates and achievements",
}

export default async function CertificatesPage() {
  const [certificates, categories] = await Promise.all([getCertificates(), getCategories()])

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <Badge variant="outline" className="border-white/20 text-white/80 bg-white/5 mb-4">
              Achievements
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Certificates</h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Professional certifications and achievements that showcase continuous learning and skill development.
            </p>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <CertificatesFilter certificates={certificates} categories={categories} />
          </div>
        </section>

      </div>
    </Layout>
  )
}
