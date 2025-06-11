"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const closeMenus = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleLinkClick = useCallback(
    (href: string) => {
      closeMenus();

      // Smooth scroll for anchor links
      if (href.startsWith("#")) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [closeMenus]
  );

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out",
        "backdrop-blur-md border-b border-white/10 text-white rounded-b-xl shadow-lg",
        scrolled
          ? "w-full max-w-6xl bg-gradient-to-b from-blue-950/95 via-black/95 to-blue-500/95 shadow-2xl"
          : "w-11/12 max-w-4xl bg-gradient-to-b from-blue-950/90 via-black/90 to-blue-500/90",
        "sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3"
      )}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-10 sm:h-14 lg:h-16 items-center justify-center relative">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group transition-transform duration-200 hover:scale-105"
            onClick={() => handleLinkClick("/")}>
            <div className="relative">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Baratrahjaga
              </span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
            </div>
            <span className="hidden sm:block text-xs lg:text-sm font-light text-gray-300">
              • Ruang Karya & Kolaborasi
            </span>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen
              ? "max-h-96 opacity-100 pb-4"
              : "max-h-0 opacity-0 pointer-events-none"
          )}></div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={closeMenus}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
