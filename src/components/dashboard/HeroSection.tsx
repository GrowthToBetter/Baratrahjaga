"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Main Info Card - Takes up most space */}
          <Card className="md:col-span-8 bg-white/[0.02] border-white/10 backdrop-blur-sm p-8 md:p-12 space-y-6">
            <div className="space-y-3">
              <Badge variant="outline" className="border-white/20 text-white/80 bg-white/5">
                Developer
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Jean Richnerd
                <br />
                <span className="text-white/60">Rantabaratrahjaga</span>
              </h1>
            </div>

            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              Fullstack Developer dari SMK Telkom Malang. Membangun aplikasi web dengan fokus pada performa dan user
              experience yang optimal.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary" className="bg-white/10 text-white/90 border-white/20 hover:bg-white/15">
                React
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white/90 border-white/20 hover:bg-white/15">
                Next.js
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white/90 border-white/20 hover:bg-white/15">
                TypeScript
              </Badge>
              <Badge variant="secondary" className="bg-white/10 text-white/90 border-white/20 hover:bg-white/15">
                Node.js
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                className="bg-white text-black hover:bg-white/90 font-medium"
                onClick={() => scrollToSection("portfolio")}
              >
                View Projects
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 bg-transparent"
                onClick={() => scrollToSection("gallery")}
              >
                Gallery
              </Button>
            </div>
          </Card>

          {/* Status Cards */}
          <div className="md:col-span-4 space-y-4">
            <Card className="bg-white/[0.02] border-white/10 backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/60 text-sm font-medium">Status</span>
              </div>
              <p className="text-white text-sm">Available for projects</p>
            </Card>

            <Card className="bg-white/[0.02] border-white/10 backdrop-blur-sm p-6">
              <div className="text-white/60 text-sm font-medium mb-2">Location</div>
              <p className="text-white">Malang, Indonesia</p>
            </Card>

            <Card className="bg-white/[0.02] border-white/10 backdrop-blur-sm p-6">
              <div className="text-white/60 text-sm font-medium mb-2">Contact</div>
              <a
                href="mailto:baratrahjaga@email.com"
                className="text-white hover:text-white/80 text-sm underline underline-offset-4"
              >
                Get in touch
              </a>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
