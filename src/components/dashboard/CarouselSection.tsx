/* eslint-disable @typescript-eslint/no-unused-vars */
// dashboard/components/CarouselSection.tsx
"use client";

import Image from "next/image";
import { memo, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCarousel } from "@/hooks/useCarousel";
import { CarouselImage } from "@/utils/util";

interface CarouselSectionProps {
  images: CarouselImage[];
  autoPlayInterval?: number;
}

const CarouselSection = memo(
  ({ images, autoPlayInterval = 5000 }: CarouselSectionProps) => {
    const { currentSlide, nextSlide, goToSlide } = useCarousel(
      images.length,
      autoPlayInterval
    );

    return (
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[582px] overflow-hidden rounded-lg sm:rounded-xl lg:rounded-[1.25rem] max-w-7xl mx-auto">
          <CarouselSlides images={images} currentSlide={currentSlide} />
          <CarouselIndicators
            currentSlide={currentSlide}
            totalSlides={images.length}
            onSlideChange={goToSlide}
          />
        </div>
      </section>
    );
  }
);

const CarouselSlides = memo(
  ({
    images,
    currentSlide,
  }: {
    images: readonly CarouselImage[];
    currentSlide: number;
  }) => (
    <div
      className="flex h-full w-full transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
      {images.map((image, index) => (
        <CarouselSlide
          key={`${image.path}-${index}`}
          image={image}
          index={index}
          isActive={index === currentSlide}
        />
      ))}
    </div>
  )
);

const CarouselSlide = memo(
  ({
    image,
    index,
    isActive,
  }: {
    image: CarouselImage;
    index: number;
    isActive: boolean;
  }) => (
    <div className="h-full w-full flex-shrink-0 relative">
      <Image
        src={image.path}
        fill
        alt={`Showcase Image ${index + 1}`}
        className="object-cover"
        priority={index === 0}
        loading={index === 0 ? "eager" : "lazy"}
        sizes="100vw"
        quality={isActive ? 90 : 75}
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[1px]">
        <div className="text-center text-white max-w-4xl px-4 sm:px-6">
          <div className="mb-2 sm:mb-3 flex items-center justify-center gap-2 text-xs sm:text-sm">
            <span className="bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
              <span className="text-white/50">Showcase</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
            {image.desc}
          </h2>
        </div>
      </div>
    </div>
  )
);

const CarouselIndicators = memo(
  ({
    currentSlide,
    totalSlides,
    onSlideChange,
  }: {
    currentSlide: number;
    totalSlides: number;
    onSlideChange: (index: number) => void;
  }) => (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideChange(index)}
            className="focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full transition-all duration-200 hover:scale-110"
            aria-label={`Go to slide ${index + 1}`}>
            <div
              className={cn(
                "rounded-full bg-white transition-all duration-300",
                currentSlide === index
                  ? "size-[0.625rem] bg-opacity-100"
                  : "size-2 bg-opacity-[28%] hover:bg-opacity-50"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
);

CarouselSection.displayName = "CarouselSection";
CarouselSlides.displayName = "CarouselSlides";
CarouselSlide.displayName = "CarouselSlide";
CarouselIndicators.displayName = "CarouselIndicators";

export default CarouselSection;
