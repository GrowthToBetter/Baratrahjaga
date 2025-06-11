// dashboard/hooks/useCarousel.ts
import { useState, useCallback, useEffect, useRef } from "react";

export const useCarousel = (totalSlides: number, autoPlayInterval: number = 5000) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  }, [totalSlides]);

  const pauseAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resumeAutoPlay = useCallback(() => {
    if (!intervalRef.current && !isHoveredRef.current) {
      intervalRef.current = setInterval(nextSlide, autoPlayInterval);
    }
  }, [nextSlide, autoPlayInterval]);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    pauseAutoPlay();
  }, [pauseAutoPlay]);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    resumeAutoPlay();
  }, [resumeAutoPlay]);

  // Auto-play functionality
  useEffect(() => {
    resumeAutoPlay();
    return () => pauseAutoPlay();
  }, [resumeAutoPlay, pauseAutoPlay]);

  // Pause on tab visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseAutoPlay();
      } else {
        resumeAutoPlay();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [pauseAutoPlay, resumeAutoPlay]);

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    handleMouseEnter,
    handleMouseLeave,
  };
};