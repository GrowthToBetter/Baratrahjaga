// dashboard/components/LoadingSpinner.tsx
"use client";

import { memo } from "react";

const LoadingSpinner = memo(
  ({
    size = "md",
    color = "blue",
  }: {
    size?: "sm" | "md" | "lg";
    color?: "blue" | "cyan" | "white";
  }) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-8 h-8",
      lg: "w-12 h-12",
    };

    const colorClasses = {
      blue: "border-blue-500",
      cyan: "border-cyan-400",
      white: "border-white",
    };

    return (
      <div className="flex items-center justify-center py-8">
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent border-solid rounded-full animate-spin`}
          role="status"
          aria-label="Loading...">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
);

const FullScreenLoader = memo(() => (
  <div className="fixed inset-0 bg-gradient-to-b from-blue-900 via-black via-40% to-[#800000] flex items-center justify-center z-50">
    <div className="text-center">
      <LoadingSpinner size="lg" color="cyan" />
      <p className="text-slate-300 mt-4 text-sm">Loading...</p>
    </div>
  </div>
));

const SectionLoader = memo(() => (
  <div className="w-full py-16 flex items-center justify-center">
    <LoadingSpinner size="md" color="blue" />
  </div>
));

LoadingSpinner.displayName = "LoadingSpinner";
FullScreenLoader.displayName = "FullScreenLoader";
SectionLoader.displayName = "SectionLoader";

export default LoadingSpinner;
export { FullScreenLoader, SectionLoader };
