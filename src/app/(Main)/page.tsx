"use client";

import { lazy, Suspense } from "react";
import Layout from "@/components/dashboard/Layout";
import { SectionLoader } from "@/components/dashboard/LoadingSpinner";
import { useDataFetching } from "@/hooks/useDataFetching"; // Adjust path as needed
import {CarouselLoadingSkeleton, PortfolioLoadingSkeleton, ProjectCardSkeleton } from "@/components/dashboard/Skeleton";

// Lazy load components
const HeroSection = lazy(() => import("@/components/dashboard/HeroSection"));
const CarouselSection = lazy(() => import("@/components/dashboard/CarouselSection"));
const PortfolioSection = lazy(() => import("@/components/dashboard/PortfolioSection"));

// Error component
const ErrorMessage = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-md text-center">
      <h3 className="text-lg font-semibold text-red-400 mb-2">Error Loading Data</h3>
      <p className="text-red-300 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default function Home() {
  const { projects, carousel, refetch, isInitialLoading } = useDataFetching();

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
        {/* Hero Section */}
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>

        {/* Carousel Section */}
        <Suspense fallback={<SectionLoader />}>
          {carousel.loading ? (
            <CarouselLoadingSkeleton />
          ) : carousel.error ? (
            <ErrorMessage message={carousel.error} onRetry={refetch} />
          ) : (
            <CarouselSection 
              images={carousel.data} 
              autoPlayInterval={6000}
            />
          )}
        </Suspense>

        {/* Portfolio Section */}
        <Suspense fallback={<SectionLoader />}>
          {projects.loading ? (
            <PortfolioLoadingSkeleton />
          ) : projects.error ? (
            <ErrorMessage message={projects.error} onRetry={refetch} />
          ) : (
            <PortfolioSection projects={projects.data} />
          )}
        </Suspense>

        {/* Global loading overlay for initial load */}
        {isInitialLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span>Loading portfolio data...</span>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

CarouselLoadingSkeleton.displayName = "CarouselLoadingSkeleton";
PortfolioLoadingSkeleton.displayName = "PortfolioLoadingSkeleton";
ProjectCardSkeleton.displayName = "ProjectCardSkeleton";

export const maxDuration = 60;