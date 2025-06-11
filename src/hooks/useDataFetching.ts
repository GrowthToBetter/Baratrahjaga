// Custom hook for data fetching with error handling and loading states
"use client";

import { useEffect, useState, useCallback } from "react";
import { z } from "zod";
import { Project, CarouselImage, ProjectSchema, CarouselSchema } from "../utils/util";
import {getAllCarousel, getAllProjects} from "../utils/AdminServerAction";

// Types for better type safety
interface DataState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

interface UseDataFetchingReturn {
  projects: DataState<Project[]>;
  carousel: DataState<CarouselImage[]>;
  refetch: () => Promise<void>;
  isInitialLoading: boolean;
}

// Enhanced data fetching hook
export function useDataFetching(): UseDataFetchingReturn {
  const [projects, setProjects] = useState<DataState<Project[]>>({
    data: [],
    loading: true,
    error: null,
  });

  const [carousel, setCarousel] = useState<DataState<CarouselImage[]>>({
    data: [],
    loading: true,
    error: null,
  });

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Fetch portfolio data with error handling
  const fetchPortfolio = useCallback(async (): Promise<Project[]> => {
    try {
      const data = await getAllProjects();
      const parsed = z.array(ProjectSchema).safeParse(data);

      if (parsed.success) {
        return parsed.data;
      } else {
        throw new Error(`Portfolio validation failed: ${parsed.error.message}`);
      }
    } catch (error) {
      throw new Error(
        `Failed to fetch portfolio: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }, []);

  // Fetch carousel data with error handling
  const fetchCarousel = useCallback(async (): Promise<CarouselImage[]> => {
    try {
      const data = await getAllCarousel();
      const parsed = z.array(CarouselSchema).safeParse(data);

      if (parsed.success) {
        return parsed.data;
      } else {
        throw new Error(`Carousel validation failed: ${parsed.error.message}`);
      }
    } catch (error) {
      throw new Error(
        `Failed to fetch carousel: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }, []);

  // Main fetch function that handles both data sources
  const fetchData = useCallback(async () => {
    // Reset loading states
    setProjects((prev) => ({ ...prev, loading: true, error: null }));
    setCarousel((prev) => ({ ...prev, loading: true, error: null }));

    try {
      // Fetch both data sources concurrently for better performance
      const [portfolioData, carouselData] = await Promise.allSettled([
        fetchPortfolio(),
        fetchCarousel(),
      ]);

      // Handle portfolio results
      if (portfolioData.status === "fulfilled") {
        setProjects({
          data: portfolioData.value,
          loading: false,
          error: null,
        });
      } else {
        setProjects({
          data: [],
          loading: false,
          error: portfolioData.reason.message,
        });
      }

      // Handle carousel results
      if (carouselData.status === "fulfilled") {
        setCarousel({
          data: carouselData.value,
          loading: false,
          error: null,
        });
      } else {
        setCarousel({
          data: [],
          loading: false,
          error: carouselData.reason.message,
        });
      }
    } catch (error) {
      // This shouldn't happen with Promise.allSettled, but just in case
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      setProjects((prev) => ({ ...prev, loading: false, error: errorMessage }));
      setCarousel((prev) => ({ ...prev, loading: false, error: errorMessage }));
    } finally {
      setIsInitialLoading(false);
    }
  }, [fetchPortfolio, fetchCarousel]);

  // Refetch function for manual refresh
  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    projects,
    carousel,
    refetch,
    isInitialLoading,
  };
}

// Alternative approach: Service-based data fetching with caching
class DataService {
  private static instance: DataService;
  private cache = new Map<
    string,
    { data: any; timestamp: number; ttl: number }
  >();

  // Cache TTL in milliseconds (5 minutes)
  private readonly DEFAULT_TTL = 5 * 60 * 1000;

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  private isExpired(cacheEntry: { timestamp: number; ttl: number }): boolean {
    return Date.now() - cacheEntry.timestamp > cacheEntry.ttl;
  }

  private async fetchWithCache<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number = this.DEFAULT_TTL
  ): Promise<T> {
    const cached = this.cache.get(key);

    if (cached && !this.isExpired(cached)) {
      return cached.data;
    }

    const data = await fetcher();
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });

    return data;
  }

  async fetchPortfolio(): Promise<{ data: Project[]; error: string | null }> {
    try {
      const data = await this.fetchWithCache("portfolio", async () => {
        const rawData = await getAllProjects();
        const parsed = z.array(ProjectSchema).safeParse(rawData);

        if (!parsed.success) {
          throw new Error(
            `Portfolio validation failed: ${parsed.error.message}`
          );
        }

        return parsed.data;
      });

      return { data, error: null };
    } catch (error) {
      return {
        data: [],
        error:
          error instanceof Error ? error.message : "Failed to fetch portfolio",
      };
    }
  }

  async fetchCarousel(): Promise<{
    data: CarouselImage[];
    error: string | null;
  }> {
    try {
      const data = await this.fetchWithCache("carousel", async () => {
        const rawData = await getAllCarousel();
        const parsed = z.array(CarouselSchema).safeParse(rawData);

        if (!parsed.success) {
          throw new Error(
            `Carousel validation failed: ${parsed.error.message}`
          );
        }

        return parsed.data;
      });

      return { data, error: null };
    } catch (error) {
      return {
        data: [],
        error:
          error instanceof Error ? error.message : "Failed to fetch carousel",
      };
    }
  }

  async fetchAllData(): Promise<{
    portfolio: { data: Project[]; error: string | null };
    carousel: { data: CarouselImage[]; error: string | null };
  }> {
    const [portfolio, carousel] = await Promise.all([
      this.fetchPortfolio(),
      this.fetchCarousel(),
    ]);

    return { portfolio, carousel };
  }

  clearCache(): void {
    this.cache.clear();
  }

  clearCacheEntry(key: string): void {
    this.cache.delete(key);
  }
}

// Hook using the service approach
export function useDataService() {
  const [state, setState] = useState<{
    projects: DataState<Project[]>;
    carousel: DataState<CarouselImage[]>;
    isInitialLoading: boolean;
  }>({
    projects: { data: [], loading: true, error: null },
    carousel: { data: [], loading: true, error: null },
    isInitialLoading: true,
  });

  const service = DataService.getInstance();

  const fetchData = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      projects: { ...prev.projects, loading: true, error: null },
      carousel: { ...prev.carousel, loading: true, error: null },
    }));

    try {
      const { portfolio, carousel } = await service.fetchAllData();

      setState({
        projects: {
          data: portfolio.data,
          loading: false,
          error: portfolio.error,
        },
        carousel: {
          data: carousel.data,
          loading: false,
          error: carousel.error,
        },
        isInitialLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setState({
        projects: { data: [], loading: false, error: errorMessage },
        carousel: { data: [], loading: false, error: errorMessage },
        isInitialLoading: false,
      });
    }
  }, [service]);

  const refetch = useCallback(async () => {
    service.clearCache();
    await fetchData();
  }, [service, fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch,
    clearCache: service.clearCache.bind(service),
  };
}
