"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { deleteCertificate } from "@/utils/certificates"

interface Certificate {
  id: string
  name: string
  issuer: string | null
  path: string
  desc: string | null
  issued_date: string | null
  category_id: string | null
  category?: {
    id: string
    name: string
    cover: string
  } | null
  created_at: Date
  updated_at: Date
}

interface CertificatesTableProps {
  certificates: Certificate[]
}

export function CertificatesTable({ certificates }: CertificatesTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return

    setDeletingId(id)
    try {
      const result = await deleteCertificate(id)
      if (!result.success) {
        alert("Failed to delete certificate: " + result.error)
      }
    } catch (error) {
      alert("Error deleting certificate")
    } finally {
      setDeletingId(null)
    }
  }

  if (certificates.length === 0) {
    return (
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
          <h3 className="text-xl font-semibold text-white/80 mb-2">No certificates yet</h3>
          <p className="text-white/50 text-sm mb-6">Get started by creating your first certificate.</p>
          <Button asChild className="bg-white text-black hover:bg-white/90">
            <Link href="/admin/certificates/new">Add Certificate</Link>
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <Card className="bg-white/[0.02] border-white/10 overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-white/80">Preview</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-white/80">Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-white/80">Issuer</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-white/80">Category</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-white/80">Date</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-white/80">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {certificates.map((cert) => (
                <tr key={cert.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <div className="w-16 h-12 rounded overflow-hidden bg-white/5">
                      <img
                        src={cert.path || "/placeholder.svg"}
                        alt={cert.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="max-w-xs">
                      <p className="font-medium text-white truncate">{cert.name}</p>
                      {cert.desc && <p className="text-sm text-white/50 truncate mt-1">{cert.desc}</p>}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-white/70">{cert.issuer || "-"}</p>
                  </td>
                  <td className="py-4 px-6">
                    {cert.category ? (
                      <Badge variant="outline" className="border-white/20 text-white/80 bg-white/5">
                        {cert.category.name}
                      </Badge>
                    ) : (
                      <span className="text-white/50">-</span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-white/70 text-sm">{cert.issued_date || "-"}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="border-white/20 text-white hover:bg-white/5 bg-transparent"
                      >
                        <Link href={`/admin/certificates/${cert.id}/edit`}>Edit</Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(cert.id)}
                        disabled={deletingId === cert.id}
                        className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                      >
                        {deletingId === cert.id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {certificates.map((cert) => (
          <Card key={cert.id} className="bg-white/[0.02] border-white/10 p-4">
            <div className="flex gap-4">
              <div className="w-20 h-16 rounded overflow-hidden bg-white/5 flex-shrink-0">
                <img src={cert.path || "/placeholder.svg"} alt={cert.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white truncate">{cert.name}</h3>
                {cert.issuer && <p className="text-sm text-white/60 mt-1">{cert.issuer}</p>}
                {cert.category && (
                  <Badge variant="outline" className="border-white/20 text-white/80 bg-white/5 mt-2">
                    {cert.category.name}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                asChild
                className="flex-1 border-white/20 text-white hover:bg-white/5 bg-transparent"
              >
                <Link href={`/admin/certificates/${cert.id}/edit`}>Edit</Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(cert.id)}
                disabled={deletingId === cert.id}
                className="flex-1 border-red-500/20 text-red-400 hover:bg-red-500/10"
              >
                {deletingId === cert.id ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
