// dashboard/components/PortfolioSection.tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import { memo } from "react";
import { ExternalLink, Eye } from "lucide-react";
import { Project } from "@/utils/util";


interface PortfolioSectionProps {
  projects: Project[];
}

const PortfolioSection = memo(({ projects }: PortfolioSectionProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="portfolio"
      className="relative w-full py-20 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={shouldReduceMotion ? false : { scale: 0.5, opacity: 0 }}
            whileInView={shouldReduceMotion ? undefined : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium backdrop-blur-sm">
              Portfolio
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              Proyek
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Unggulan
            </span>
          </h2>
          
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Kumpulan karya terbaik yang menunjukkan keahlian dan dedikasi dalam pengembangan teknologi
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

const ProjectCard = memo(({
  project,
  index,
  shouldReduceMotion,
}: {
  project: Project;
  index: number;
  shouldReduceMotion: boolean | null;
}) => {
  const handleProjectClick = () => {
    if (project.url) {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.article
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      initial={shouldReduceMotion ? false : { 
        opacity: 0, 
        y: 50,
        scale: 0.95
      }}
      whileInView={shouldReduceMotion ? undefined : { 
        opacity: 1, 
        y: 0,
        scale: 1
      }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={shouldReduceMotion ? {} : { 
        scale: 1.03,
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      viewport={{ once: true, margin: "-50px" }}
      onClick={handleProjectClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleProjectClick();
        }
      }}
    >
      {/* Card Background with Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-2xl p-[1px]">
        <div className="w-full h-full bg-slate-900/90 backdrop-blur-xl rounded-2xl" />
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 rounded-2xl blur-xl" />
      </div>

      {/* Card Content */}
      <div className="relative h-full p-6 md:p-8 flex flex-col">
        {/* Project Image/Cover */}
        <div className="relative mb-6 h-48 md:h-52 rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700 group-hover:from-slate-700 group-hover:to-slate-600 transition-all duration-500">
          {project.cover ? (
            <img 
              src={project.cover} 
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Project Link Icon */}
          {project.url && (
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>

        {/* Project Info */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
            {project.name}
          </h3>
          
          <p className="text-slate-300 leading-relaxed mb-6 flex-1 group-hover:text-slate-200 transition-colors duration-300">
            {project.description || "Proyek menarik yang menunjukkan implementasi teknologi modern dengan pendekatan inovatif."}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {project.url && (
                <motion.div
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm font-medium">Lihat Proyek</span>
                </motion.div>
              )}
            </div>
            
            {/* Progress Indicator */}
            <div className="w-12 h-1 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-br-2xl" />
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tl-2xl" />
      </div>
    </motion.article>
  );
});

PortfolioSection.displayName = "PortfolioSection";
ProjectCard.displayName = "ProjectCard";

export default PortfolioSection;