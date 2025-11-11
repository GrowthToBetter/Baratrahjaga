"use client"

import { useState } from "react"
import Image from "next/image"

interface CertificateViewerProps {
  isPdf: boolean
  viewUrl: string
  downloadUrl: string
  certificateName: string
  certificatePath: string
}

export function CertificateViewer({
  isPdf,
  viewUrl,
  downloadUrl,
  certificateName,
  certificatePath,
}: CertificateViewerProps) {
  const [pdfError, setPdfError] = useState(false)

  if (pdfError) {
    return (
      <div className="p-6 text-center text-gray-400">
        PDF preview not available.{" "}
        <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
          Click here to download
        </a>
      </div>
    )
  }

  return (
    <>
      {isPdf ? (
        <div className="relative w-full" style={{ height: "calc(100vh - 300px)", minHeight: "600px" }}>
          <iframe
            src={`${viewUrl}#toolbar=0&navpanes=0`}
            className="w-full h-full rounded-lg border border-white/10"
            title={certificateName}
            allow="fullscreen"
            onError={() => setPdfError(true)}
          />
        </div>
      ) : (
        <div className="relative w-full aspect-[4/3]">
          <Image src={certificatePath || "/placeholder.svg"} alt={certificateName} fill className="object-contain" />
        </div>
      )}
    </>
  )
}
