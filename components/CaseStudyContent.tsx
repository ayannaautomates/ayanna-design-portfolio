import type { CaseStudy } from "@/lib/case-studies";
import type { Project } from "@/lib/projects";

type CaseStudyContentProps = {
  project: Project;
  caseStudy: CaseStudy;
};

function SectionBlock({
  section,
}: {
  section: CaseStudy["sections"][number];
}) {
  return (
    <section id={section.id} className="scroll-mt-24">
      <p className="hud-label text-cyan mb-3">[ {section.label} ]</p>
      <h2 className="font-display text-xl md:text-2xl uppercase tracking-wider text-ghost mb-5 leading-tight">
        {section.title}
      </h2>

      {section.quote && (
        <blockquote className="mb-6 neon-border border-l-4 border-l-violet bg-violet/5 px-5 py-4">
          <p className="font-display text-lg md:text-xl text-ghost italic leading-snug">
            &ldquo;{section.quote.text}&rdquo;
          </p>
          <footer className="mt-3 hud-label text-violet">
            — {section.quote.attribution}
          </footer>
        </blockquote>
      )}

      {section.paragraphs?.map((paragraph) => (
        <p
          key={paragraph.slice(0, 48)}
          className="text-ghost-muted text-sm font-mono leading-relaxed mb-4 last:mb-0"
        >
          {paragraph}
        </p>
      ))}

      {section.bullets && section.bullets.length > 0 && (
        <ul className="mt-4 space-y-3">
          {section.bullets.map((bullet) => (
            <li
              key={bullet.slice(0, 48)}
              className="flex gap-3 text-ghost-muted text-sm font-mono leading-relaxed"
            >
              <span className="text-cyan shrink-0 mt-0.5" aria-hidden="true">
                &gt;
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function CaseStudyContent({
  project,
  caseStudy,
}: CaseStudyContentProps) {
  return (
    <>
      <p className="hud-label text-violet mb-2">
        {project.year} // {project.category} // {project.title}
      </p>
      <p className="hud-label text-cyan mb-3">CASE STUDY</p>

      <h1 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider text-ghost mb-4 leading-tight">
        {caseStudy.headline}
      </h1>

      <p className="text-ghost-muted text-sm font-mono leading-relaxed mb-8">
        {caseStudy.subtitle}
      </p>

      <dl className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
        {caseStudy.meta.map((item) => (
          <div
            key={item.label}
            className="neon-border bg-navy-light/30 px-3 py-3 min-w-0"
          >
            <dt className="hud-label text-cyan mb-1">{item.label}</dt>
            <dd className="text-ghost text-xs font-mono leading-relaxed break-words">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {caseStudy.stats.map((stat) => (
          <div
            key={stat.label}
            className="neon-border bg-navy-light/40 px-4 py-5 text-center"
          >
            <p className="font-display text-2xl md:text-3xl text-cyan mb-2">
              {stat.value}
            </p>
            <p className="text-ghost-muted text-xs font-mono leading-relaxed">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="h-px bg-gradient-to-r from-cyan/50 via-violet/30 to-transparent mb-12" />

      <div className="space-y-12 md:space-y-14">
        {caseStudy.sections.map((section) => (
          <SectionBlock key={section.id} section={section} />
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-cyan/15">
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
  );
}
