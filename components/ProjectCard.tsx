import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
  layout?: "horizontal" | "vertical";
};

export default function ProjectCard({
  project,
  index,
  layout = "horizontal",
}: ProjectCardProps) {
  const isHorizontal = layout === "horizontal";

  return (
    <article
      className={
        isHorizontal
          ? "flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[440px] snap-start"
          : "w-full max-w-md sm:max-w-lg md:max-w-xl"
      }
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block neon-border bg-navy-light/40 focus-visible:outline-offset-4"
        aria-label={`View project: ${project.title}`}
      >
        <div className="relative overflow-hidden aspect-[16/10]">
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            sizes={
              isHorizontal
                ? "(max-width: 640px) 85vw, 440px"
                : "(max-width: 768px) 100vw, 50vw"
            }
            className="object-cover transition-transform duration-200 group-hover:scale-[1.03]"
            loading="lazy"
            unoptimized={project.image.endsWith(".svg")}
          />
          {project.isConcept && (
            <span className="absolute top-3 right-3 hud-label text-pink border border-pink/40 bg-navy/80 px-2 py-1 backdrop-blur-sm">
              CONCEPT
            </span>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent group-hover:via-cyan transition-all" />
        </div>

        <div className="p-4">
          <p className="hud-label text-violet mb-2">
            {project.year} // {project.category}
          </p>
          <h3 className="font-display text-lg md:text-xl uppercase tracking-wide text-ghost group-hover:text-cyan transition-colors duration-200">
            {project.title}
          </h3>
          <p className="mt-2 text-ghost-muted text-xs font-mono leading-relaxed line-clamp-2">
            {project.description}
          </p>
          <span className="inline-block mt-3 hud-label text-cyan/50 group-hover:text-cyan transition-colors">
            &gt; ACCESS FILE
          </span>
        </div>

        <span className="sr-only">
          Project {index + 1}: {project.title}
        </span>
      </Link>
    </article>
  );
}
