// Optimized Home Component with Layout
"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import Layout from "@/components/dashboard/Layout";
import { SectionLoader } from "@/components/dashboard/LoadingSpinner";
import { z } from "zod";
import { getCarousel, getPortfolio } from "@/utils/Datas";
import { CarouselImage, CarouselSchema, Project, ProjectSchema } from "@/utils/util";

// Lazy load components for better performance
const HeroSection = lazy(() => import("@/components/dashboard/HeroSection"));
const CarouselSection = lazy(
  () => import("@/components/dashboard/CarouselSection")
);
const PortfolioSection = lazy(
  () => import("@/components/dashboard/PortfolioSection")
);


export default function Home() {
  const [PROJECTS_DATA, setProject] = useState<Project[]>([]);
  const [CAROUSEL_IMAGES, setCarousel] = useState<CarouselImage[]>([]);
  useEffect(() => {
    async function fetchData() {
      const pendingPortfolio = await getPortfolio();
      const parsedPortfolio = z
        .array(ProjectSchema)
        .safeParse(pendingPortfolio);
      if (parsedPortfolio.success) setProject(parsedPortfolio.data);
      const pendingCarousel = await getCarousel();
      const parsedCarousel = z.array(CarouselSchema).safeParse(pendingCarousel);
      if (parsedCarousel.success) setCarousel(parsedCarousel.data);
    }
    fetchData();
  }, []);

  const seoProps = {
    title: "Jean Richnerd Rantabaratrahjaga - Fullstack Developer Portfolio",
    description:
      "Portofolio profesional Jean Richnerd Rantabaratrahjaga, Fullstack Developer dari SMK Telkom Malang. Spesialisasi dalam React, Node.js, dan pengembangan aplikasi web modern.",
    keywords:
      "jean richnerd, baratrahjaga, fullstack developer, web developer, react, nodejs, portfolio, smk telkom malang, mokletdev",
    ogUrl: "https://baratrahjaga.dev",
    ogImage: "/img/baratrahjaga-og.jpg",
  };

  return (
    <Layout seoProps={seoProps}>
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-blue-900 via-black via-40% to-[#800000] text-white">
        {/* Critical above-the-fold content - loaded immediately */}
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>

        {/* Below-the-fold content - lazy loaded */}
        <Suspense fallback={<SectionLoader />}>
          <CarouselSection images={CAROUSEL_IMAGES} autoPlayInterval={6000} />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <PortfolioSection projects={PROJECTS_DATA} />
        </Suspense>
      </div>
    </Layout>
  );
}


export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 60;