import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import CaseStudyContent from "@/components/CaseStudyContent";
import {
  getProjectBySlug,
  getAllProjectSlugs,
} from "@/lib/projects";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";
import { getProjectJsonLd } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const caseStudy = getCaseStudyBySlug(slug);
  if (!project) return { title: "404 — Not Found" };

  const url = `${siteConfig.url}/projects/${slug}`;
  const description = caseStudy?.subtitle ?? project.description;

  return {
    title: project.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: project.title,
      description,
      url,
      type: "article",
      images: [{ url: project.image, alt: project.title, width: 1200, height: 750 }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const caseStudy = getCaseStudyBySlug(slug);
  const isSvg = project.image.endsWith(".svg");
  const jsonLd = getProjectJsonLd({
    title: project.title,
    description: caseStudy?.subtitle ?? project.description,
    slug: project.slug,
    year: project.year,
    liveUrl: project.liveUrl,
  });

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden neon-border border-x-0 border-t-0">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            priority
            sizes="100vw"
            unoptimized={isSvg}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        </div>

        <div className="mx-auto w-full max-w-6xl xl:max-w-7xl px-6 md:px-12 lg:px-16 -mt-16 relative z-10 pb-24">
          <Link
            href="/projects"
            className="hud-label text-cyan hover:text-violet inline-flex items-center gap-2 mb-8 transition-colors"
          >
            &lt; BACK TO PROJECTS
          </Link>

          {caseStudy ? (
            <CaseStudyContent project={project} caseStudy={caseStudy} />
          ) : (
            <>
              <p className="hud-label text-violet mb-3">
                {project.year} // {project.category}
              </p>

              <h1 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-ghost mb-6 leading-tight">
                {project.title}
              </h1>

              <p className="text-ghost-muted text-sm font-mono leading-relaxed mb-10">
                {project.description}
              </p>

              <figure className="mb-10 neon-border overflow-hidden bg-navy-light/30">
                <Image
                  src={project.image}
                  alt={`${project.title} project preview`}
                  width={1200}
                  height={750}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 1152px, 1280px"
                  unoptimized={isSvg}
                  className="w-full h-auto object-cover"
                />
                <figcaption className="sr-only">
                  {project.title} preview image
                </figcaption>
              </figure>

              <div className="h-px bg-gradient-to-r from-cyan/50 via-violet/30 to-transparent mb-10" />

              <div className="space-y-5 text-ghost-muted text-sm font-mono leading-relaxed">
                <p>{project.longDescription}</p>
              </div>

              <div className="mt-10 pt-8 border-t border-cyan/15">
                <p className="hud-label text-cyan mb-4">[ STACK ]</p>
                <ul className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="hud-label text-violet border border-violet/30 px-3 py-1.5 bg-violet/5"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-block"
                  >
                    &gt; VIEW LIVE
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-code inline-block"
                  >
                    &gt; VIEW CODE
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </article>
    </SiteShell>
  );
}
