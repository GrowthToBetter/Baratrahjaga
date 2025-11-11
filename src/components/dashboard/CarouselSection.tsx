"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { CarouselImage } from "@/utils/util"

interface CarouselSectionProps {
  images: CarouselImage[]
  autoPlayInterval?: number
}

export default function CarouselSection({ images, autoPlayInterval = 6000 }: CarouselSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return

    const interval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide, autoPlayInterval, images.length])

  if (images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <section id="gallery" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-white/10" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">Gallery</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <p className="text-center text-white/60">Browse through featured work and moments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Display */}
          <Card className="lg:col-span-2 bg-white/[0.02] border-white/10 backdrop-blur-sm overflow-hidden">
            <div className="relative h-[500px] group bg-black/20">
              <img
                src={currentImage.path || "/placeholder.svg"}
                alt={currentImage.desc || `Gallery image ${currentIndex + 1}`}
                className="w-full h-full object-contain"
              />

              {/* Navigation overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-lg font-medium">{currentImage.desc}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-sm font-medium">
                  {currentIndex + 1} / {images.length}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white"
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                >
                  {isAutoPlaying ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevSlide}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextSlide}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </Card>

          {/* Thumbnail List */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-full group transition-all ${
                  index === currentIndex ? "opacity-100" : "opacity-50 hover:opacity-75"
                }`}
              >
                <Card
                  className={`overflow-hidden ${
                    index === currentIndex ? "bg-white/[0.05] border-white/30" : "bg-white/[0.02] border-white/10"
                  }`}
                >
                  <div className="h-32 relative bg-black/20">
                    <img
                      src={image.path || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                    {index === currentIndex && <div className="absolute inset-0 border-2 border-white/50" />}
                  </div>
                  <div className="p-3">
                    <p className="text-white/80 text-sm font-medium line-clamp-2">
                      {image.desc || `Image ${index + 1}`}
                    </p>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
