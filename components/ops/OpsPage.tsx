import Link from "next/link";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import OpsInteractions from "./OpsInteractions";

const RESUME_HREF = "/resume.pdf";
const EMAIL = "ayanna.m89@gmail.com";

const channels = [
  { ch: "01", label: "Case Studies", href: "#case-studies" },
  { ch: "02", label: "Career Timeline", href: "#timeline" },
  { ch: "03", label: "Toolkit", href: "#toolkit" },
  { ch: "04", label: "Get in Touch", href: "#contact" },
];

const metrics = [
  { value: "7 to 11", label: "guided screens, down from a manual process of 30 to 40 steps" },
  { value: "$11.5K", label: "to $12K a year of specialist capacity returned to the agency" },
  { value: "Zero", label: "hallucinated compliance answers in production" },
];

const alsoShipped = [
  {
    title: "Monthly KPI dashboard",
    body: "Tracks certification volume, officer turnaround time, and outcomes, with an automated data refresh and QA checks before it reaches leadership.",
  },
  {
    title: "Monday.com CRM optimization",
    body: "Cleaner client tracking, more accurate reporting, and clearer stakeholder communication across the agency's vendor base.",
  },
  {
    title: "11-agency procurement analysis",
    body: "Findings across 11 San Antonio public agencies, turned into a tiered action plan and five recommended training modules.",
  },
];

const timeline = [
  {
    years: "2009 to 2019",
    org: "U.S. Air Force",
    body: "26-member team, Operation Inherent Resolve. 5,600 cargo tons, 16,500 passengers, 3,500 missions, 100% on-time departure reliability.",
  },
  {
    years: "2018 to 2025",
    org: "Surgical Technology",
    body: "Tallahassee Memorial, then traveling. Cut surgical waste 25% through resource allocation and inventory tracking.",
  },
  {
    years: "2025 to 2026",
    org: "Rasmussen University",
    body: "Program Director. Two direct reports, 40+ students per quarter, Excel KPI dashboards, quarterly advisory board.",
  },
  {
    years: "2026 to now",
    org: "SCTRCA",
    body: "Business Operations Lead. Onboarding and TA time down about 30%, admin and content processing down more than 50%, 20+ workshops reaching 500+ stakeholders.",
  },
];

const toolkit = [
  {
    title: "Operations & Program Management",
    skills: ["Operations Management", "Program Management", "Event & Staffing Coordination"],
    evidence: [
      "Led a 26-member Air Force team through 3,500 missions, 16,500 passengers, and 5,600 cargo tons.",
      "Directed a program serving 40+ students per quarter with two direct reports.",
      "Ran 20+ workshops reaching 500+ stakeholders at SCTRCA.",
    ],
  },
  {
    title: "Process Improvement & Workflow Design",
    skills: [
      "Process Improvement",
      "Workflow Design",
      "SOP & Playbook Development",
      "AI-Enabled Workflow Improvement",
    ],
    evidence: [
      "Compressed a 30 to 40 step certification process into 7 to 11 guided screens.",
      "Cut onboarding and TA time about 30% and admin and content processing more than 50%.",
      "Reduced surgical waste 25% through resource allocation and inventory tracking.",
    ],
  },
  {
    title: "Leadership & Cross-Functional Coordination",
    skills: ["Team Leadership", "Cross-Functional Coordination", "Stakeholder Management"],
    evidence: [
      "Held 100% on-time departure reliability with a 26-member team during Operation Inherent Resolve.",
      "Ran a quarterly advisory board as Program Director at Rasmussen University.",
      "Coordinated an analysis across 11 public agencies into one tiered action plan.",
    ],
  },
  {
    title: "Systems, Data & Reporting",
    skills: ["CRM & Systems Management", "KPI Tracking", "Dashboard Design"],
    evidence: [
      "Built a monthly KPI dashboard with automated refresh and QA checks before distribution.",
      "Optimized the agency's Monday.com CRM for tracking and reporting accuracy.",
      "Returned $11.5K to $12K a year of specialist capacity with a production AI assistant.",
    ],
  },
];

const moreWork = projects.filter(
  (p) => !p.isConcept && p.slug !== "supply-sa-vendor-assistant",
);

function ChannelMark({ ch, delay }: { ch: string; delay?: number }) {
  return (
    <span
      className="ops-ch"
      style={delay !== undefined ? { animationDelay: `${delay}s` } : undefined}
    >
      CH {ch}
    </span>
  );
}

// Screen glass positions on /hero/backplate, in % of the image (x, y, w, h)
const screens = {
  id: [32.5, 5, 24.5, 19.5],
  links: [
    [15, 28, 25.5, 20],
    [53, 28.5, 23.5, 20],
    [10.5, 54.5, 29, 22.5],
    [51.5, 55, 28, 22.5],
  ],
} as const;

function screenPos([x, y, w, h]: readonly number[]) {
  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${w}%`,
    height: `${h}%`,
  } as React.CSSProperties;
}

function Scanlines() {
  return <div className="ops-scan" aria-hidden="true" />;
}

export default function OpsPage() {
  return (
    <div className="ops">
      <OpsInteractions />

      <header className="ops-nav" role="banner">
        <a href="#top" className="ops-nav__name">
          AYANNA McCLINTIC
        </a>
        <nav aria-label="Primary" className="ops-nav__links">
          {channels.slice(0, 3).map((c) => (
            <a key={c.ch} href={c.href} className="ops-nav__link" data-nav={c.href.slice(1)}>
              <span className="ops-nav__ch">CH {c.ch}</span>
              {c.label === "Career Timeline" ? "Timeline" : c.label}
            </a>
          ))}
          <a
            href={siteConfig.links.linkedin}
            className="ops-nav__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href={RESUME_HREF} className="ops-btn ops-btn--solid ops-nav__resume">
            Résumé
          </a>
        </nav>
      </header>

      <main id="main-content">
        <section id="top" className="ops-hero" aria-label="Introduction">
          <div className="ops-hero__atmos" aria-hidden="true" />
          <div className="ops-hero__inner">
            <div className="ops-stage">
              <picture>
                <source srcSet="/hero/backplate.avif" type="image/avif" />
                <source
                  srcSet="/hero/backplate-sm.webp 900w, /hero/backplate.webp 1800w"
                  sizes="(max-width: 720px) 100vw, 1200px"
                  type="image/webp"
                />
                <img
                  src="/hero/backplate.jpg"
                  alt=""
                  width={1800}
                  height={1633}
                  fetchPriority="high"
                  decoding="async"
                  className="ops-stage__img"
                />
              </picture>

              <div className="ops-screen ops-screen--id" style={screenPos(screens.id)}>
                <ChannelMark ch="00" />
                <div className="ops-screen__text">
                  <h1 className="ops-id__name">AYANNA McCLINTIC</h1>
                  <p className="ops-id__role">Operations Leader</p>
                  <p className="ops-id__line">
                    I bring structure to complex programs and build processes people actually
                    follow.
                  </p>
                  <p className="ops-id__tag">AI-ENABLED OPS · USAF VETERAN</p>
                </div>
              </div>

              {channels.map((c, i) => (
                <a
                  key={c.ch}
                  href={c.href}
                  className="ops-screen ops-screen--link"
                  style={screenPos(screens.links[i])}
                  data-takeover
                >
                  <ChannelMark ch={c.ch} delay={3.2 + i * 1.7} />
                  <span className="ops-screen__label">{c.label}</span>
                </a>
              ))}
            </div>
            <p className="ops-hero__open">
              OPEN TO OPERATIONS LEADERSHIP AND AI-ENABLED OPERATIONS ROLES
            </p>
          </div>
        </section>

        <div className="ops-body">
          <section id="case-studies" className="ops-section" data-section>
            <Scanlines />
            <div className="ops-wrap">
              <p className="ops-eyebrow">
                <span className="ops-num">01</span> / Case Studies
              </p>
              <h2 className="ops-h2">Supply SA vendor certification assistant</h2>

              <div className="ops-metrics">
                {metrics.map((m) => (
                  <div key={m.value} className="ops-card ops-metric">
                    <p className="ops-metric__value">{m.value}</p>
                    <p className="ops-metric__label">{m.label}</p>
                  </div>
                ))}
              </div>

              <div className="ops-cols">
                <div>
                  <h3 className="ops-label">The problem</h3>
                  {/* OPEN: Ayanna's one line on what the manual process cost applicants and
                      staff. The staff-side figures below are from the published, staff-confirmed
                      case study. */}
                  <p>
                    Every new applicant needed a live 30 to 45 minute walkthrough with a specialist
                    just to learn which of 40+ documents applied to them. At 10 to 15 vendors a
                    week, that was about 34 specialist hours a month.
                  </p>
                </div>
                <div>
                  <h3 className="ops-label">What I built</h3>
                  <p>
                    A production assistant on supply-sa.org. A deterministic rules engine decides
                    which documents apply. The model only explains that result, grounded in the
                    agency&apos;s own SOP, validation workbook, and FAQ.
                  </p>
                </div>
                <div>
                  <h3 className="ops-label">What changed</h3>
                  <p>
                    Applicants get a 7 to 11 screen guided flow at any hour. Specialists get about
                    34 hours a month back. No hallucinated compliance answers in production.
                  </p>
                </div>
              </div>

              <p className="ops-built">
                <span className="ops-label">Built with</span> Claude API · Node.js · Express ·
                deterministic rules engine
              </p>
              <Link href="/projects/supply-sa-vendor-assistant" className="ops-btn ops-btn--line">
                Read the full case study
              </Link>

              <h3 className="ops-subhead">Also shipped at SCTRCA</h3>
              <div className="ops-grid3">
                {alsoShipped.map((a) => (
                  <div key={a.title} className="ops-card">
                    <h4 className="ops-card__title">{a.title}</h4>
                    <p className="ops-card__body">{a.body}</p>
                  </div>
                ))}
              </div>

              {moreWork.length > 0 && (
                <>
                  <h3 className="ops-subhead">More case studies</h3>
                  <ul className="ops-more">
                    {moreWork.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/projects/${p.slug}`} className="ops-more__link">
                          <span>{p.title}</span>
                          <span className="ops-more__meta">
                            {p.category} · {p.year}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </section>

          <section id="timeline" className="ops-section" data-section>
            <Scanlines />
            <div className="ops-wrap">
              <p className="ops-eyebrow">
                <span className="ops-num">02</span> / Career Timeline
              </p>
              <h2 className="ops-h2">Four industries. One way of working.</h2>

              <ol className="ops-timeline">
                {timeline.map((t) => (
                  <li key={t.org} className="ops-timeline__item">
                    <p className="ops-timeline__years">{t.years}</p>
                    <div>
                      <h3 className="ops-timeline__org">{t.org}</h3>
                      <p className="ops-timeline__body">{t.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="ops-own">
                <h3 className="ops-label">Own endeavors</h3>
                <div className="ops-own__cols">
                  <div className="ops-card">
                    <h4 className="ops-card__title">Soulwire Studio</h4>
                    <p className="ops-card__meta">Founder · 2025 to now</p>
                  </div>
                  <div className="ops-card">
                    <h4 className="ops-card__title">Lavender Sky Homes</h4>
                    <p className="ops-card__meta">Founder · 2022 to 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="toolkit" className="ops-section" data-section>
            <Scanlines />
            <div className="ops-wrap">
              <p className="ops-eyebrow">
                <span className="ops-num">03</span> / Toolkit
              </p>
              <h2 className="ops-h2">Core competencies. Pick one.</h2>

              <div className="ops-toolkit" data-accordion>
                {toolkit.map((d, i) => (
                  <details key={d.title} className="ops-domain" open={i === 0}>
                    <summary className="ops-domain__head">
                      <span className="ops-domain__num">0{i + 1}</span>
                      <span className="ops-domain__title">{d.title}</span>
                      <span className="ops-domain__icon" aria-hidden="true" />
                    </summary>
                    <div className="ops-domain__body">
                      <ul className="ops-chips" aria-label="Skills">
                        {d.skills.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                      <ul className="ops-evidence">
                        {d.evidence.map((e) => (
                          <li key={e}>{e}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="ops-section ops-contact" data-section>
            <Scanlines />
            <div className="ops-wrap">
              <p className="ops-eyebrow">
                <span className="ops-num">04</span> / Get in Touch
              </p>
              <h2 className="ops-h2">Signal locked. Let&apos;s talk.</h2>
              <p className="ops-contact__loc">San Antonio, Texas. Open to remote.</p>
              <div className="ops-contact__actions">
                <a href={`mailto:${EMAIL}`} className="ops-btn ops-btn--line">
                  Email
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  className="ops-btn ops-btn--line"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a href={RESUME_HREF} className="ops-btn ops-btn--solid">
                  Download Résumé
                </a>
              </div>
            </div>
          </section>

          <footer className="ops-footer">
            <span>© {new Date().getFullYear()} Ayanna McClintic</span>
            <span className="ops-ch ops-ch--static">CH 04</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
