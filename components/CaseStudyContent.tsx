import type { CaseStudy } from "@/lib/case-studies";
import type { Project } from "@/lib/projects";

type CaseStudyContentProps = {
  project: Project;
  caseStudy: CaseStudy;
};

function PhaseBlock({ phase }: { phase: CaseStudy["phases"][number] }) {
  return (
    <section id={phase.id} className="relative scroll-mt-28 pl-10 md:pl-14">
      <span
        className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center border border-cyan/40 bg-navy font-mono text-[10px] text-cyan"
        aria-hidden="true"
      >
        {phase.step}
      </span>

      <h2 className="font-display text-lg md:text-xl uppercase tracking-wider text-ghost mb-4 leading-tight">
        {phase.title}
      </h2>

      {phase.paragraphs?.map((paragraph) => (
        <p
          key={paragraph.slice(0, 48)}
          className="text-ghost-muted text-sm md:text-base font-mono leading-relaxed mb-4 last:mb-0"
        >
          {paragraph}
        </p>
      ))}

      {phase.bullets && phase.bullets.length > 0 && (
        <ul className="mt-4 space-y-3">
          {phase.bullets.map((bullet) => (
            <li
              key={bullet.slice(0, 48)}
              className="flex gap-3 text-ghost-muted text-sm md:text-base font-mono leading-relaxed"
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
    <div className="lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[14rem_minmax(0,1fr)] xl:gap-16">
      <aside className="hidden lg:block">
        <nav
          aria-label="Case study sections"
          className="sticky top-24 space-y-1 border-l border-cyan/15 pl-4"
        >
          <p className="hud-label text-ghost-dim mb-4 -ml-4 pl-4">SECTIONS</p>
          {caseStudy.phases.map((phase) => (
            <a
              key={phase.id}
              href={`#${phase.id}`}
              className="group flex items-baseline gap-2 py-1.5 text-xs font-mono text-ghost-muted transition-colors hover:text-cyan"
            >
              <span className="text-cyan/60 group-hover:text-cyan">
                {phase.step}
              </span>
              <span className="line-clamp-2 leading-snug">{phase.title}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <p className="hud-label text-cyan">[ DEPLOYMENT DOSSIER ]</p>
          {caseStudy.isConcept && (
            <span className="hud-label text-pink border border-pink/40 bg-pink/10 px-2 py-1">
              CONCEPT PROJECT
            </span>
          )}
        </div>

        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider text-ghost mb-4 leading-tight">
          {caseStudy.title}
        </h1>

        <p className="text-ghost-muted text-sm md:text-base font-mono leading-relaxed mb-8">
          {caseStudy.subtitle}
        </p>

        {caseStudy.isConcept && caseStudy.conceptNote && (
          <div className="mb-8 border border-pink/30 bg-pink/5 px-5 py-4">
            <p className="hud-label text-pink mb-2">NOT A CLIENT PROJECT</p>
            <p className="text-ghost-muted text-xs md:text-sm font-mono leading-relaxed">
              {caseStudy.conceptNote}
            </p>
          </div>
        )}

        <dl className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-8">
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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

        {caseStudy.testimonial && (
          <blockquote className="mb-12 px-5 py-4 border-y border-violet/30 bg-gradient-to-r from-violet/10 to-transparent">
            <p className="font-display text-base md:text-lg text-ghost leading-snug">
              &ldquo;{caseStudy.testimonial.text}&rdquo;
            </p>
            <footer className="mt-2 hud-label text-violet">
              — {caseStudy.testimonial.attribution}
            </footer>
          </blockquote>
        )}

        <div className="h-px bg-gradient-to-r from-cyan/50 via-violet/30 to-transparent mb-12" />

        <div className="relative space-y-12 md:space-y-14 pb-4 before:absolute before:left-[13px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-cyan/40 before:via-violet/20 before:to-transparent">
          {caseStudy.phases.map((phase) => (
            <PhaseBlock key={phase.id} phase={phase} />
          ))}
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
      </div>
    </div>
  );
}
