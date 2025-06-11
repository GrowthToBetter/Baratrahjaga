"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-2/4 backdrop-blur-md bg-gradient-to-b from-blue-950/90 via-black to-maroon-900 border-b border-white/10 text-white rounded-b-xl shadow-lg">
      <div className="px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">
              Baratrahjaga{" "}
              <span className="text-sm font-light">
                • Ruang Karya & Kolaborasi
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#portfolio"
              className="text-sm font-medium transition-colors hover:text-blue-400">
              Jelajahi
            </Link>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        <div
          className={cn(
            "md:hidden fixed inset-x-0 top-16 bg-background border-b shadow-lg transition-all duration-300 ease-in-out",
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          )}>
          <div className="px-4 md:px-6 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-blue-400"
                onClick={() => setIsMenuOpen(false)}>
                Jelajahi
              </Link>
              <Link
                href="/Pengembang"
                className="text-sm font-medium transition-colors hover:text-blue-400"
                onClick={() => setIsMenuOpen(false)}>
                Kenali Kami
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
