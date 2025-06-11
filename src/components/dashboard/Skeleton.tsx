"use client";

import { memo } from "react";

// Carousel Loading Component that matches your design
export const CarouselLoadingSkeleton = memo(() => (
  <section className="px-4 sm:px-6 py-12 sm:py-16">
    <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[582px] overflow-hidden rounded-lg sm:rounded-xl lg:rounded-[1.25rem] max-w-7xl mx-auto">
      {/* Loading skeleton */}
      <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-700 animate-pulse">
        {/* Overlay Content Skeleton */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[1px]">
          <div className="text-center text-white max-w-4xl px-4 sm:px-6">
            <div className="mb-2 sm:mb-3 flex items-center justify-center gap-2">
              <div className="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-16 h-3 bg-white/20 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-8 bg-white/20 rounded mx-auto w-3/4 animate-pulse"></div>
              <div className="h-6 bg-white/15 rounded mx-auto w-1/2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex justify-center gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="size-2 rounded-full bg-white/20 animate-pulse"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
));

// Portfolio Loading Component that matches your design
export const PortfolioLoadingSkeleton = memo(() => (
  <section className="relative w-full py-20 sm:py-24 md:py-32 overflow-hidden">
    {/* Animated Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />
      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500" />
    </div>

    <div className="relative container max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header Skeleton */}
      <div className="text-center mb-16 md:mb-20">
        <div className="inline-block mb-4">
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm">
            <div className="w-16 h-4 bg-blue-300/30 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="h-12 bg-gradient-to-r from-white/20 to-blue-100/20 rounded mx-auto w-64 animate-pulse"></div>
          <div className="h-12 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded mx-auto w-72 animate-pulse"></div>
        </div>

        <div className="space-y-2 max-w-2xl mx-auto">
          <div className="h-4 bg-slate-300/20 rounded mx-auto w-full animate-pulse"></div>
          <div className="h-4 bg-slate-300/20 rounded mx-auto w-3/4 animate-pulse"></div>
        </div>
      </div>

      {/* Projects Grid Skeleton */}
      <div className="grid gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} index={index} />
        ))}
      </div>
    </div>
  </section>
));

// Individual Project Card Skeleton
export const ProjectCardSkeleton = memo(({ index }: { index: number }) => (
  <div className="group relative rounded-2xl overflow-hidden">
    {/* Card Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-2xl p-[1px]">
      <div className="w-full h-full bg-slate-900/90 backdrop-blur-xl rounded-2xl" />
    </div>

    {/* Card Content */}
    <div className="relative h-full p-6 md:p-8 flex flex-col">
      {/* Project Image/Cover Skeleton */}
      <div className="relative mb-6 h-48 md:h-52 rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700 animate-pulse">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-500/30 animate-pulse" />
        </div>
      </div>

      {/* Project Info Skeleton */}
      <div className="flex-1 flex flex-col">
        <div className="space-y-3 mb-6">
          <div className="h-6 bg-white/20 rounded w-3/4 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-slate-300/20 rounded w-full animate-pulse" />
            <div className="h-4 bg-slate-300/20 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-slate-300/20 rounded w-2/3 animate-pulse" />
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-400/30 rounded animate-pulse" />
              <div className="w-20 h-4 bg-blue-400/30 rounded animate-pulse" />
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="w-12 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500/50 to-cyan-500/50 rounded-full animate-pulse"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-br-2xl" />
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tl-2xl" />
    </div>
  </div>
));

CarouselLoadingSkeleton.displayName = "CarouselLoadingSkeleton";
ProjectCardSkeleton.displayName = "ProjectCardSkeleton";
PortfolioLoadingSkeleton.displayName = "PortfolioLoadingSkeleton";
