/* eslint-disable @typescript-eslint/no-explicit-any */
// dashboard/components/Layout.tsx
"use client";

import { ReactNode, Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import SEO from "./SEO";
import { FullScreenLoader } from "./LoadingSpinner";
import { prefetchResource } from "@/utils/performance";
import { useEffect } from "react";

interface LayoutProps {
  children: ReactNode;
  seoProps?: {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogUrl?: string;
  };
}

const Layout = ({ children, seoProps }: LayoutProps) => {
  // Prefetch critical resources
  useEffect(() => {
    // Prefetch images that will be used
    prefetchResource("/img/baratrahjaga.jpg", "image");
    
    // Prefetch fonts if not already loaded
    if (typeof window !== "undefined") {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
      link.as = "style";
      link.onload = function() {
        (this as any).rel = "stylesheet";
      };
      document.head.appendChild(link);
    }
  }, []);

  return (
    <>
      <SEO {...seoProps} />
      <ErrorBoundary>
        <Suspense fallback={<FullScreenLoader />}>
          <main className="min-h-screen">
            {children}
          </main>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Layout;