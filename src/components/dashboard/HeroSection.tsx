// dashboard/components/HeroSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";
import { ANIMATION_VARIANTS } from "../constants/data";
import { lazy, Suspense } from "react";
import { SectionLoader } from "@/components/dashboard/LoadingSpinner";

const SocialMediaSection = lazy(
  () => import("@/components/dashboard/SocialMediaSection")
);

const HeroSection = memo(() => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full min-h-screen flex items-center py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
          {/* TEXT CONTENT */}
          <motion.div
            initial={
              shouldReduceMotion ? false : ANIMATION_VARIANTS.slideLeft.hidden
            }
            animate={
              shouldReduceMotion ? false : ANIMATION_VARIANTS.slideLeft.visible
            }
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 leading-tight">
              Jean Richnerd Rantabaratrahjaga
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-xl">
              Seorang{" "}
              <strong className="text-blue-300">Fullstack Developer</strong>{" "}
              dari <strong className="text-cyan-300">SMK Telkom Malang</strong>.
              Memulai perjalanan sebagai developer di{" "}
              <strong className="text-blue-300">MokletDev</strong>, aktif
              membangun aplikasi dengan fokus pada performa dan skalabilitas.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 text-sm sm:text-base"
                asChild>
                <Link href="#portfolio" prefetch={true}>
                  Lihat Portofolio
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 text-slate-900 bg-white/95 backdrop-blur hover:bg-white hover:text-slate-900 transition-all duration-200 text-sm sm:text-base"
                asChild>
                <Link href="mailto:baratrahjaga@email.com">Hubungi Saya</Link>
              </Button>
            </div>

            <div className="pt-2 sm:pt-4 flex items-start sm:items-center text-xs sm:text-sm text-slate-400">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-green-400 flex-shrink-0 mt-0.5 sm:mt-0" />
              <span>Terbuka untuk kolaborasi dan proyek freelance</span>
            </div>
          </motion.div>

          {/* HERO IMAGE */}
          <HeroImage shouldReduceMotion={shouldReduceMotion} />
        </div>
        <Suspense fallback={<SectionLoader />}>
          <SocialMediaSection />
        </Suspense>
      </div>
    </section>
  );
});

const HeroImage = memo(
  ({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) => (
    <motion.div
      initial={shouldReduceMotion ? false : ANIMATION_VARIANTS.fadeInUp.hidden}
      animate={shouldReduceMotion ? false : ANIMATION_VARIANTS.fadeInUp.visible}
      transition={{ duration: 1 }}
      className="relative order-1 lg:order-2">
      {/* Decorative Blurs - Memoized */}
      <DecorativeBlurs />

      <div className="relative w-full aspect-[4/3] max-w-md mx-auto lg:max-w-none shadow-xl sm:shadow-2xl rounded-lg overflow-hidden">
        <Image
          src="/img/baratrahjaga.jpg"
          alt="Jean Richnerd Rantabaratrahjaga - Fullstack Developer"
          fill
          className="object-cover object-[center_70%] w-full h-full"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>
    </motion.div>
  )
);

const DecorativeBlurs = memo(() => (
  <>
    <div className="absolute -top-8 -right-8 sm:-top-12 sm:-right-12 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-blue-600 rounded-full blur-2xl sm:blur-3xl opacity-30 sm:opacity-50 hidden sm:block" />
    <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-cyan-400 rounded-full blur-xl sm:blur-2xl opacity-20 sm:opacity-30 hidden sm:block" />
  </>
));

HeroSection.displayName = "HeroSection";
HeroImage.displayName = "HeroImage";
DecorativeBlurs.displayName = "DecorativeBlurs";

export default HeroSection;
