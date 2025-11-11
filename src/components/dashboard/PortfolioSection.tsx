"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Project } from "@/utils/util";

interface PortfolioSectionProps {
  projects: Project[];
}

export default function PortfolioSection({ projects }: PortfolioSectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (projects.length === 0) return null;

  return (
    <section id="portfolio" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-white/10" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Projects
            </h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <p className="text-center text-white/60">
            Selected work and recent projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group bg-white/[0.02] border-white/10 backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 overflow-hidden"
              onMouseEnter={() => setSelectedId(project?.id)}
              onMouseLeave={() => setSelectedId(null)}>
              {/* Project Image */}
              {project.cover && (
                <div className="relative aspect-video overflow-hidden bg-white/5">
                  <img
                    src={project.cover || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              )}

              {/* Project Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                    {project.name}
                  </h3>
                  {project.description && (
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </div>

                {/* Project Link */}
                {project.url && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/80 hover:text-white hover:bg-white/10 -ml-2"
                    asChild>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer">
                      View Project
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm">
            Showing {projects.length}{" "}
            {projects.length === 1 ? "project" : "projects"}
          </p>
        </div>
      </div>
    </section>
  );
}
