/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useRef } from "react";

/**
 * Debounce hook for performance optimization
 */
export const useDebounce = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );
};

/**
 * Throttle hook for performance optimization
 */
export const useThrottle = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  const lastCallRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: T) => {
      const now = Date.now();
      const elapsed = now - lastCallRef.current;

      if (elapsed >= delay) {
        lastCallRef.current = now;
        callback(...args);
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          lastCallRef.current = Date.now();
          callback(...args);
        }, delay - elapsed);
      }
    },
    [callback, delay]
  );
};

/**
 * Intersection Observer hook for lazy loading
 */
export const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const isIntersectingRef = useRef(false);

  const observer = useMemo(
    () =>
      typeof window !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            isIntersectingRef.current = entry.isIntersecting;
          }, options)
        : null,
    [options]
  );

  const observe = useCallback(() => {
    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }
  }, [observer]);

  const unobserve = useCallback(() => {
    if (observer && elementRef.current) {
      observer.unobserve(elementRef.current);
    }
  }, [observer]);

  return {
    elementRef,
    isIntersecting: isIntersectingRef.current,
    observe,
    unobserve,
  };
};

/**
 * Memoized style generator for dynamic styles
 */
export const createMemoizedStyles = <T extends Record<string, any>>(
  generator: (props: T) => React.CSSProperties
) => {
  const cache = new Map<string, React.CSSProperties>();

  return (props: T): React.CSSProperties => {
    const key = JSON.stringify(props);

    if (!cache.has(key)) {
      cache.set(key, generator(props));
    }

    return cache.get(key)!;
  };
};

/**
 * Image preloader for better performance
 */
export const preloadImages = (urls: string[]): Promise<void[]> => {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = url;
        })
    )
  );
};

/**
 * Resource prefetch utility
 */
export const prefetchResource = (url: string, as: string = "fetch") => {
  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    link.as = as;
    document.head.appendChild(link);
  }
};

/**
 * Performance measurement utility
 */
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== "undefined" && window.performance) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
};
