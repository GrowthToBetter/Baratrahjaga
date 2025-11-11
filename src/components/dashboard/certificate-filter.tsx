"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

type Certificate = {
  id: string
  name: string
  issuer: string | null
  path: string
  download_url: string | null
  file_type: string | null
  desc: string | null
  issued_date: string | null
  category: {
    id: string
    name: string
  } | null
}

type Category = {
  id: string
  name: string
}

export function CertificatesFilter({
  certificates,
  categories,
}: {
  certificates: Certificate[]
  categories: Category[]
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredCertificates =
    selectedCategory === "all" ? certificates : certificates.filter((cert) => cert.category?.id === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("all")}
          className={
            selectedCategory === "all"
              ? "bg-white text-black hover:bg-white/90"
              : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
          }
        >
          All ({certificates.length})
        </Button>
        {categories.map((category) => {
          const count = certificates.filter((cert) => cert.category?.id === category.id).length
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={
                selectedCategory === category.id
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
              }
            >
              {category.name} ({count})
            </Button>
          )
        })}
      </div>

      {/* Certificates Grid */}
      {filteredCertificates.length === 0 ? (
        <Card className="bg-white/[0.02] border-white/10 p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white/80 mb-2">No certificates in this category</h3>
            <p className="text-white/50 text-sm">Try selecting a different category.</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <Card
              key={cert.id}
              className="group bg-white/[0.02] border-white/10 backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                {cert.file_type === "pdf" ? (
                  <div className="relative w-full h-full">
                    <iframe
                      src={`${cert.path}#toolbar=0&navpanes=0&scrollbar=0`}
                      className="w-full h-full pointer-events-none"
                      title={cert.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <Badge className="absolute top-3 right-3 bg-red-500/90 text-white border-none z-10">PDF</Badge>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={cert.path || "/placeholder.svg"}
                      alt={cert.name || "Certificate"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                )}

                {cert.category && (
                  <Badge className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white border-white/20 z-10">
                    {cert.category.name}
                  </Badge>
                )}
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">{cert.name}</h3>
                  {cert.issuer && <p className="text-white/60 text-sm font-medium">{cert.issuer}</p>}
                  {cert.desc && <p className="text-white/50 text-sm line-clamp-2 mt-2">{cert.desc}</p>}
                </div>

                {cert.issued_date && (
                  <div className="flex items-center gap-2 text-xs text-white/40 pt-2 border-t border-white/10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{new Date(cert.issued_date).toLocaleDateString()}</span>
                  </div>
                )}

                <Link href={`/certificates/${cert.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View Certificate
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
