"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent",
      )}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-white/10 border border-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-sm">JR</span>
          </div>
          <span className="text-white font-medium text-sm tracking-tight hidden sm:block">Baratrahjaga</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/") ? "text-white bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5",
              )}
            >
              Home
            </Button>
          </Link>
          <Link href="/certificates">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-sm font-medium transition-colors",
                isActive("/certificates")
                  ? "text-white bg-white/10"
                  : "text-white/60 hover:text-white hover:bg-white/5",
              )}
            >
              Certificates
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
