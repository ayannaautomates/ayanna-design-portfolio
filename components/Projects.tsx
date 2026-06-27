"use client";

import { useRef } from "react";
import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

type ProjectsProps = {
  headingLevel?: 1 | 2;
};

export default function Projects({ headingLevel = 2 }: ProjectsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isScrollGallery = projects.length > 1;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isScrollGallery) return;
    const track = trackRef.current;
    if (!track) return;
    const amount = 460;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      track.scrollBy({ left: amount, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      track.scrollBy({ left: -amount, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" aria-labelledby="projects-heading" className="pt-24 md:pt-32 pb-10 md:pb-12 overflow-x-clip">
      <div className="mx-auto max-w-6xl px-6 md:px-12 mb-12 min-w-0">
        <ScrollReveal>
          <p className="hud-label text-cyan mb-4">[ PROJECTS ]</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 min-w-0">
            <SectionHeading
              level={headingLevel}
              id="projects-heading"
              className="font-display text-3xl md:text-5xl uppercase tracking-wider text-ghost break-words min-w-0"
            >
              Deployed Systems
            </SectionHeading>
            {isScrollGallery && (
              <p className="text-ghost-muted text-xs font-mono max-w-xs leading-relaxed">
                Scroll horizontally · Arrow keys when focused
              </p>
            )}
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={80} className="w-full min-w-0 overflow-x-clip">
        <div
          ref={trackRef}
          role="region"
          aria-label={
            isScrollGallery
              ? "Projects gallery — scroll horizontally"
              : "Featured project"
          }
          tabIndex={isScrollGallery ? 0 : undefined}
          onKeyDown={handleKeyDown}
          className={
            isScrollGallery
              ? "projects-track flex flex-nowrap gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 pb-8 md:pb-12 w-full max-w-full"
              : "flex justify-center px-6 md:px-12 pb-8 md:pb-12 w-full max-w-full"
          }
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              layout={isScrollGallery ? "horizontal" : "vertical"}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
