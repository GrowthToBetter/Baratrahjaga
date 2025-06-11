"use client";

import React, { lazy, Suspense, memo, useMemo, useState, useCallback } from "react";
import Layout from "@/components/dashboard/Layout";
import {
  CarouselLoadingSkeleton,
  PortfolioLoadingSkeleton,
  ProjectCardSkeleton,
} from "@/components/dashboard/Skeleton";
import { CarouselImage, Project } from "@/utils/util";

// Lazy load components with better chunk naming
const HeroSection = lazy(() => 
  import("@/components/dashboard/HeroSection").then(module => ({
    default: module.default
  }))
);

const CarouselSection = lazy(() =>
  import("@/components/dashboard/CarouselSection").then(module => ({
    default: module.default
  }))
);

const PortfolioSection = lazy(() =>
  import("@/components/dashboard/PortfolioSection").then(module => ({
    default: module.default
  }))
);

// Memoized Error Component
const ErrorMessage = memo(({ 
  message, 
  onRetry, 
  type = "general" 
}: { 
  message: string; 
  onRetry: () => void;
  type?: "general" | "carousel" | "portfolio";
}) => {
  const errorConfig = useMemo(() => ({
    general: {
      title: "Error Loading Data",
      bgColor: "bg-red-900/20",
      borderColor: "border-red-500",
      textColor: "text-red-400",
      descColor: "text-red-300",
      buttonColor: "bg-red-600 hover:bg-red-700"
    },
    carousel: {
      title: "Failed to Load Gallery",
      bgColor: "bg-orange-900/20",
      borderColor: "border-orange-500",
      textColor: "text-orange-400",
      descColor: "text-orange-300",
      buttonColor: "bg-orange-600 hover:bg-orange-700"
    },
    portfolio: {
      title: "Portfolio Unavailable",
      bgColor: "bg-yellow-900/20",
      borderColor: "border-yellow-500",
      textColor: "text-yellow-400",
      descColor: "text-yellow-300",
      buttonColor: "bg-yellow-600 hover:bg-yellow-700"
    }
  }), []);

  const config = errorConfig[type];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 min-h-[300px]">
      <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-6 max-w-md text-center backdrop-blur-sm`}>
        <div className="mb-3">
          <svg 
            className={`w-12 h-12 mx-auto ${config.textColor}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
        <h3 className={`text-lg font-semibold ${config.textColor} mb-2`}>
          {config.title}
        </h3>
        <p className={`${config.descColor} mb-4 text-sm leading-relaxed`}>
          {message}
        </p>
        <button
          onClick={onRetry}
          className={`${config.buttonColor} px-4 py-2 rounded-md transition-all duration-200 font-medium text-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20`}
          aria-label="Retry loading data"
        >
          Try Again
        </button>
      </div>
    </div>
  );
});

// Warning Alert Component
const WarningAlert = memo(({ 
  message, 
  onDismiss 
}: { 
  message: string; 
  onDismiss?: () => void; 
}) => (
  <div className="mx-4 mb-6 bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 backdrop-blur-sm">
    <div className="flex items-start space-x-3">
      <svg 
        className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" 
        />
      </svg>
      <div className="flex-1">
        <p className="text-yellow-300 text-sm">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-yellow-400 hover:text-yellow-300 transition-colors"
          aria-label="Dismiss warning"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  </div>
));

// Enhanced Loading Skeleton with better UX
const EnhancedSectionLoader = memo(() => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="relative">
      <div className="animate-spin rounded-full h-12 w-12 border-2 border-white/20 border-t-white"></div>
      <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
    </div>
    <p className="mt-4 text-white/60 text-sm">Loading content...</p>
  </div>
));

export default function Home({
  carousel,
  portfolio,
}: {
  carousel: CarouselImage[];
  portfolio: Project[];
}) {
  // State for error handling and retry mechanism
  const [carouselError, setCarouselError] = useState<string | null>(null);
  const [portfolioError, setPortfolioError] = useState<string | null>(null);
  const [showDataWarning, setShowDataWarning] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  // Memoized SEO props to prevent unnecessary re-renders
  const seoProps = useMemo(() => ({
    title: "Jean Richnerd Rantabaratrahjaga - Fullstack Developer Portfolio",
    description:
      "Portofolio profesional Jean Richnerd Rantabaratrahjaga, Fullstack Developer dari SMK Telkom Malang. Spesialisasi dalam React, Node.js, dan pengembangan aplikasi web modern.",
    keywords:
      "jean richnerd, baratrahjaga, fullstack developer, web developer, react, nodejs, portfolio, smk telkom malang, mokletdev",
    ogUrl: "https://baratrahjaga.dev",
    ogImage: "/img/baratrahjaga-og.jpg",
  }), []);

  // Data validation with warnings
  const { validatedCarousel, validatedPortfolio } = useMemo(() => {
    const carouselValid = Array.isArray(carousel) && carousel.length > 0;
    const portfolioValid = Array.isArray(portfolio) && portfolio.length > 0;
    
    if (!carouselValid || !portfolioValid) {
      setShowDataWarning(true);
    }

    return {
      validatedCarousel: carouselValid ? carousel : [],
      validatedPortfolio: portfolioValid ? portfolio : []
    };
  }, [carousel, portfolio]);

  // Retry mechanism
  const handleRetry = useCallback(async (section: 'carousel' | 'portfolio') => {
    setIsRetrying(true);
    
    try {
      // Simulate retry delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (section === 'carousel') {
        setCarouselError(null);
      } else {
        setPortfolioError(null);
      }
      
      // You can add actual retry logic here if needed
      // For example, trigger a data refetch
      
    } catch (error) {
      console.error(`Retry failed for ${section}:`, error);
    } finally {
      setIsRetrying(false);
    }
  }, []);

  // Error boundary simulation
  const handleCarouselError = useCallback(() => {
    setCarouselError("Unable to load gallery images. Please check your connection.");
  }, []);

  const handlePortfolioError = useCallback(() => {
    setPortfolioError("Failed to load portfolio projects. Please try again later.");
  }, []);

  return (
    <Layout seoProps={seoProps}>
      <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-blue-900 via-black via-40% to-[#800000] text-white">
        {/* Data Warning Alert */}
        {showDataWarning && (
          <WarningAlert 
            message="Some content may be limited due to data availability. Please refresh the page if issues persist."
            onDismiss={() => setShowDataWarning(false)}
          />
        )}

        {/* Hero Section */}
        <Suspense fallback={<EnhancedSectionLoader />}>
          <HeroSection />
        </Suspense>

        {/* Carousel Section with Error Handling */}
        <Suspense fallback={<CarouselLoadingSkeleton />}>
          {carouselError ? (
            <ErrorMessage 
              message={carouselError} 
              onRetry={() => handleRetry('carousel')}
              type="carousel"
            />
          ) : validatedCarousel.length === 0 ? (
            <div className="py-12">
              <CarouselLoadingSkeleton />
            </div>
          ) : (
            <ErrorBoundary 
              fallback={<ErrorMessage 
                message="Gallery temporarily unavailable" 
                onRetry={handleCarouselError}
                type="carousel"
              />}
            >
              <CarouselSection
                images={validatedCarousel}
                autoPlayInterval={6000}
              />
            </ErrorBoundary>
          )}
        </Suspense>

        {/* Portfolio Section with Error Handling */}
        <Suspense fallback={<PortfolioLoadingSkeleton />}>
          {portfolioError ? (
            <ErrorMessage 
              message={portfolioError} 
              onRetry={() => handleRetry('portfolio')}
              type="portfolio"
            />
          ) : validatedPortfolio.length === 0 ? (
            <div className="py-12">
              <PortfolioLoadingSkeleton />
            </div>
          ) : (
            <ErrorBoundary 
              fallback={<ErrorMessage 
                message="Portfolio temporarily unavailable" 
                onRetry={handlePortfolioError}
                type="portfolio"
              />}
            >
              <PortfolioSection projects={validatedPortfolio} />
            </ErrorBoundary>
          )}
        </Suspense>

        {/* Retry Loading Overlay */}
        {isRetrying && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800/90 rounded-lg p-6 flex items-center space-x-3 border border-gray-600">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/20 border-t-white"></div>
              <span className="text-white">Retrying...</span>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

// Simple Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Set display names for better debugging
ErrorMessage.displayName = "ErrorMessage";
WarningAlert.displayName = "WarningAlert";
EnhancedSectionLoader.displayName = "EnhancedSectionLoader";
CarouselLoadingSkeleton.displayName = "CarouselLoadingSkeleton";
PortfolioLoadingSkeleton.displayName = "PortfolioLoadingSkeleton";
ProjectCardSkeleton.displayName = "ProjectCardSkeleton";

export const maxDuration = 60;