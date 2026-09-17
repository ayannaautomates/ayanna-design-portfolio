import Link from "next/link";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import OpsInteractions from "./OpsInteractions";
import OpsMotion from "./OpsMotion";
import OpsCursor from "./OpsCursor";

const RESUME_HREF = "/resume.pdf";
const EMAIL = "ayanna.m89@gmail.com";

const channels = [
  { ch: "01", label: "Career Timeline", href: "#timeline" },
  { ch: "02", label: "Toolkit", href: "#toolkit" },
  { ch: "03", label: "Case Studies", href: "#case-studies" },
  { ch: "04", label: "Off the Clock", href: "#off-clock" },
  { ch: "05", label: "Get in Touch", href: "#contact" },
];

// Nodes around the sphere, placed by angle on a ring
const orbit = [
  { ch: "01", label: "Career Timeline", href: "#timeline", angle: -104 },
  { ch: "02", label: "Toolkit", href: "#toolkit", angle: -40 },
  { ch: "03", label: "Case Studies", href: "#case-studies", angle: 26 },
  { ch: "04", label: "Off the Clock", href: "#off-clock", angle: 92 },
  { ch: "05", label: "LinkedIn", href: siteConfig.links.linkedin, angle: -166, external: true },
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
    role: "Logistics Operations Manager · Honolulu, HI",
    body: "26-member team, Operation Inherent Resolve. 5,600 cargo tons, 16,500 passengers, 3,500 missions, 100% on-time departure reliability.",
    detail: [
      "Directed operations across five terminal sections supporting Pacific air mobility, contributing to the movement of 164,000+ passengers and 36,000+ tons of cargo.",
      "Stood up a new Passenger Transit Center in under 12 hours, coordinating people, resources and infrastructure with zero mission degradation.",
      "Coordinated logistics for executive government travel, humanitarian relief, medical evacuations and multinational exercises.",
    ],
  },
  {
    years: "2018 to 2025",
    org: "Surgical Technology",
    role: "Tallahassee Memorial, then traveling · 15+ hospitals",
    body: "Cut surgical waste 25% through resource allocation and inventory tracking.",
    detail: [
      "Integrated into a new team, new system and new protocol set at every assignment, across more than 15 hospitals.",
      "Ran room set-up and breakdown around each case, cutting turnover time between surgeries and holding the sterile field.",
      "Owned instrument and supply counts, which kept shortages and intra-operative delays off the schedule.",
    ],
  },
  {
    years: "2025 to 2026",
    org: "Rasmussen University",
    role: "Program Director & Instructor · Odessa, FL",
    body: "Two direct reports, 40+ students per quarter, Excel KPI dashboards, quarterly advisory board.",
    detail: [
      "Owned curriculum and program leadership for health sciences, keeping delivery aligned to institutional goals and accreditation standards.",
      "Tracked enrollment, student outcomes and graduate placement on dashboards leadership used to adjust recruitment.",
      "Worked with academic deans and national coordinators on retention strategy, and ran monthly faculty coordination alongside the quarterly board.",
      "Coordinated externship placements and negotiated affiliation agreements with industry partners.",
    ],
  },
  {
    years: "2026 to now",
    org: "SCTRCA",
    role: "Business Operations Lead · San Antonio, TX",
    body: "Onboarding and TA time down about 30%, admin and content processing down more than 50%, 20+ workshops reaching 500+ stakeholders.",
    detail: [
      "Own a monthly KPI dashboard covering certification volume, officer turnaround and demographic outcomes, with an automated refresh and QA checks before it reaches leadership.",
      "Architected and shipped the production AI assistant that compressed a 30 to 40 step process into 7 to 11 guided screens.",
      "Standardized vendor support intake through a ticket portal with assignment, 30-day follow-up and closure, which ended dropped requests.",
      "Ran an 11-agency procurement analysis and a 28-respondent ecosystem survey, each delivered as prioritized recommendations.",
      "Own team scheduling and event staffing, and act as the organization's lead in the executive director's absence.",
    ],
  },
];

const endeavors = [
  {
    name: "Soulwire Studio",
    meta: "Founder · 2025 to now · San Antonio, TX",
    body: "I map a client's process before I build anything, then turn the manual bottlenecks in lead follow-up, invoicing and reporting into a scoped automation roadmap with projected return. The builds connect CRMs, inboxes and spreadsheets so the copy-paste work disappears, and the support agents run on deterministic logic rather than improvisation, which gives a small team 24/7 response without adding headcount.",
  },
  {
    name: "Lavender Sky Homes",
    meta: "Founder · 2022 to 2025 · Tucson, AZ",
    body: "A furnished mid-term rental run end to end: tenant communication, scheduling, maintenance and vendor work, all tracked on Excel project plans that kept the place ready and occupancy high. I rewrote the listings and the marketing around what renters actually search for, which lifted interest and lead flow, and held cleaners and contractors to turnover timelines so the experience stayed the same for every tenant. Budgeting and payment tracking ran through Baselane, so expenses stayed in line and payments went out on time.",
  },
];

const toolkit = [
  {
    title: "Operations & Program Management",
    skills: [
      "Operations Management",
      "Program Management",
      "Event & Staffing Coordination",
      "Logistics",
    ],
    evidence: [
      "Led a 26-member Air Force team through 3,500 missions, 16,500 passengers, and 5,600 cargo tons.",
      "Directed five terminal sections in Pacific air mobility: 164,000+ passengers and 36,000+ tons moved.",
      "Stood up a Passenger Transit Center in under 12 hours with zero mission degradation.",
      "Directed a program serving 40+ students per quarter with two direct reports.",
      "Own team scheduling and event staffing by capacity and priority, and act as agency lead when the executive director is out.",
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
      "Lean Six Sigma Green Belt",
    ],
    evidence: [
      "Compressed a 30 to 40 step certification process into 7 to 11 guided screens.",
      "Cut onboarding and TA time about 30% and admin and content processing more than 50%.",
      "Replaced phone and scheduled-call intake with a ticket portal carrying assignment, 30-day follow-up and closure, which ended dropped requests.",
      "Reduced surgical waste 25% through resource allocation and inventory tracking.",
      "Cut operating room turnover between cases through disciplined set-up and breakdown.",
      "Lean Six Sigma Green Belt, 2026.",
    ],
  },
  {
    title: "Leadership & Cross-Functional Coordination",
    skills: [
      "Team Leadership",
      "Cross-Functional Coordination",
      "Stakeholder Management",
      "Partnership Development",
    ],
    evidence: [
      "Held 100% on-time departure reliability with a 26-member team during Operation Inherent Resolve.",
      "Ran a quarterly advisory board and monthly faculty coordination as Program Director.",
      "Worked with academic deans and national coordinators to rebuild retention strategy around real outcome data.",
      "Coordinated an analysis across 11 public agencies into one tiered action plan and five training modules.",
      "Built partnerships with public agencies, chambers and economic development organizations that grew small-business participation in the regional procurement pipeline.",
      "Negotiated affiliation agreements and externship placements with industry partners.",
    ],
  },
  {
    title: "Systems, Data & Reporting",
    skills: [
      "CRM & Systems Management",
      "KPI Tracking",
      "Dashboard Design",
      "Survey Design & Analysis",
    ],
    evidence: [
      "Built a monthly KPI dashboard with automated refresh and QA checks before distribution.",
      "Optimized the agency's Monday.com CRM for tracking and reporting accuracy.",
      "Ran Excel dashboards on enrollment, student outcomes and graduate placement that leadership used to adjust recruitment.",
      "Designed and fielded a 28-respondent ecosystem survey and turned the results into five prioritized recommendations.",
      "Returned $11.5K to $12K a year of specialist capacity with a production AI assistant.",
    ],
  },
];

const moreWork = projects.filter(
  (p) => !p.isConcept && p.slug !== "supply-sa-vendor-assistant",
);

const conceptBuilds = projects.filter((p) => p.isConcept);

function Scanlines() {
  return (
    <>
      <div className="ops-scan" aria-hidden="true" />
      <div className="ops-glow" aria-hidden="true" />
    </>
  );
}

export default function OpsPage() {
  return (
    <div className="ops">
      <OpsInteractions />
      <OpsMotion />
      <OpsCursor />

      <header className="ops-nav" role="banner">
        <a href="#top" className="ops-nav__name">
          AYANNA McCLINTIC
        </a>
        <nav aria-label="Primary" className="ops-nav__links">
          {channels.slice(0, 4).map((c) => (
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
          <div className="ops-hero__track">
            <div className="ops-beat ops-beat--portal">
              <div className="ops-portal__frame" aria-hidden="true">
                <div className="ops-portal__inner">
                  <picture>
                    <source srcSet="/hero/portal.avif" type="image/avif" />
                    <source
                      srcSet="/hero/portal-sm.webp 1100w, /hero/portal.webp 2200w"
                      sizes="100vw"
                      type="image/webp"
                    />
                    <img
                      src="/hero/portal.jpg"
                      alt=""
                      width={2200}
                      height={1227}
                      fetchPriority="high"
                      className="ops-portal__img"
                    />
                  </picture>
                  {/* Sits exactly on the screen glass in the photograph */}
                  <div className="ops-glitch">
                    <span className="ops-glitch__noise" />
                    <span className="ops-glitch__roll" />
                    <span className="ops-glitch__tear" />
                  </div>
                </div>
              </div>
              <div className="ops-portal__copy">
                <p className="ops-ch ops-ch--inline">CH 00</p>
                <h1 className="ops-id__name">AYANNA McCLINTIC</h1>
                <p className="ops-id__role">Operations Leader</p>
                <p className="ops-id__line">
                  I bring structure to complex programs and build processes people actually
                  follow.
                </p>
                <p className="ops-quip">
                  Static is just a process nobody has tuned yet. I find the signal, then I build
                  the system that holds it.
                </p>
                <p className="ops-id__tag">AI-ENABLED OPS · USAF VETERAN</p>
                <p className="ops-hero__open">
                  OPEN TO OPERATIONS LEADERSHIP AND AI-ENABLED OPERATIONS ROLES
                </p>
              </div>
              <p className="ops-cue" aria-hidden="true">
                SCROLL
              </p>
            </div>

          </div>
        </section>

        <div className="ops-body">
          <section className="ops-orbit" aria-label="Sections">
            <picture className="ops-orbit__space" aria-hidden="true">
              <source
                srcSet="/orbit/earth-sm.webp 1000w, /orbit/earth.webp 2000w"
                sizes="100vw"
                type="image/webp"
              />
              <img src="/orbit/earth.jpg" alt="" loading="lazy" decoding="async" />
            </picture>

            <div className="ops-orbit__inner">
              <p className="ops-orbit__kicker">Pick a channel</p>

              <div className="ops-orbit__ring">
                <img
                  className="ops-orbit__sphere"
                  src="/orbit/sphere.webp"
                  srcSet="/orbit/sphere-sm.webp 700w, /orbit/sphere.webp 1400w"
                  sizes="(max-width: 860px) 74vw, 520px"
                  alt=""
                  width={1400}
                  height={1400}
                  loading="lazy"
                  decoding="async"
                />

                <ul className="ops-orbit__nodes">
                  {orbit.map((o) => (
                    <li
                      key={o.ch}
                      className="ops-orbit__node"
                      style={{ "--angle": `${o.angle}deg` } as React.CSSProperties}
                    >
                      <a
                        href={o.href}
                        className="ops-orbit__link"
                        {...(o.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        <span className="ops-orbit__ch">CH {o.ch}</span>
                        <span className="ops-orbit__label">{o.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="timeline" data-ch="01" className="ops-section" data-section>
            <Scanlines />
            <div className="ops-wrap">
              <p className="ops-eyebrow op">
                <span className="ops-num">01</span> / Career Timeline
              </p>
              <h2 className="ops-h2">Four industries. One way of working.</h2>

              <ol className="ops-timeline">
                {timeline.map((t) => (
                  <li key={t.org} className="ops-timeline__item op">
                    <p className="ops-timeline__years">{t.years}</p>
                    <div>
                      <h3 className="ops-timeline__org">{t.org}</h3>
                      <p className="ops-timeline__role">{t.role}</p>
                      <p className="ops-timeline__body">{t.body}</p>
                      <ul className="ops-detail">
                        {t.detail.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="ops-own op">
                <h3 className="ops-label">Own endeavors</h3>
                <div className="ops-own__cols">
                  {endeavors.map((e) => (
                    <div key={e.name} className="ops-card">
                      <h4 className="ops-card__title">{e.name}</h4>
                      <p className="ops-card__meta">{e.meta}</p>
                      {e.body && <p className="ops-card__body">{e.body}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="toolkit" data-ch="02" className="ops-section" data-section>
            <Scanlines />
            <div className="ops-wrap">
              <p className="ops-eyebrow op">
                <span className="ops-num">02</span> / Toolkit
              </p>
              <h2 className="ops-h2">Core competencies. Pick one.</h2>

              <div className="ops-toolkit" data-accordion>
                {toolkit.map((d, i) => (
                  <details key={d.title} className="ops-domain op" open={i === 0}>
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

          <section id="case-studies" data-ch="03" className="ops-section" data-section>
            <Scanlines />
            <div className="ops-wrap">
              <p className="ops-eyebrow op">
                <span className="ops-num">03</span> / Case Studies
              </p>
              <h2 className="ops-h2">Supply SA vendor certification assistant</h2>

              <div className="ops-metrics">
                {metrics.map((m) => (
                  <div key={m.value} className="ops-card ops-metric op">
                    <p className="ops-metric__value">{m.value}</p>
                    <p className="ops-metric__label">{m.label}</p>
                  </div>
                ))}
              </div>

              <div className="ops-cols op">
                <div>
                  <h3 className="ops-label">The problem</h3>
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

              <p className="ops-built op">
                <span className="ops-label">Built with</span> Claude API · Node.js · Express ·
                deterministic rules engine
              </p>
              <Link href="/projects/supply-sa-vendor-assistant" className="ops-btn ops-btn--line op">
                Read the full case study
              </Link>

              <h3 className="ops-subhead">Also shipped at SCTRCA</h3>
              <div className="ops-grid3">
                {alsoShipped.map((a) => (
                  <div key={a.title} className="ops-card op">
                    <h4 className="ops-card__title">{a.title}</h4>
                    <p className="ops-card__body">{a.body}</p>
                  </div>
                ))}
              </div>

              {conceptBuilds.length > 0 && (
                <>
                  <h3 className="ops-subhead">Concept builds</h3>
                  <p className="ops-note op">
                    Self-initiated systems, built end to end to test an approach. Not client
                    projects, and labelled that way wherever they appear.
                  </p>
                  <div className="ops-grid2">
                    {conceptBuilds.map((c) => (
                      <Link key={c.slug} href={`/projects/${c.slug}`} className="ops-card ops-card--link op">
                        <h4 className="ops-card__title">{c.title}</h4>
                        <p className="ops-card__body">{c.description}</p>
                        <p className="ops-card__meta">{c.tags.slice(0, 4).join(" · ")}</p>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {moreWork.length > 0 && (
                <>
                  <h3 className="ops-subhead">More case studies</h3>
                  <ul className="ops-more">
                    {moreWork.map((p) => (
                      <li key={p.slug} className="op">
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

          {/* The descent: pinned, and scroll drives the depth */}
          <section id="off-clock" data-ch="04" className="ops-section ops-descent" data-section>
            <div className="ops-descent__stage">
              <div className="ops-descent__plates" aria-hidden="true">
                {["surface", "mid", "deep"].map((plate) => (
                  <picture key={plate} className={`ops-plate ops-plate--${plate}`}>
                    <source srcSet={`/off-clock/${plate}.webp`} type="image/webp" />
                    <img src={`/off-clock/${plate}.jpg`} alt="" loading="lazy" decoding="async" />
                  </picture>
                ))}
                <span className="ops-descent__dark" />
                <span className="ops-descent__motes" />
              </div>

              <p className="ops-descent__depth" aria-hidden="true">
                <span data-depth>0</span> M
              </p>

              <div className="ops-descent__copy">
                <p className="ops-eyebrow">
                  <span className="ops-num">04</span> / Off the Clock
                </p>
                <div className="ops-descent__panels">
                  <h2 className="ops-descent__line" data-panel="0">
                    I love diving cenotes in Mexico.
                  </h2>
                  <p className="ops-descent__line" data-panel="1">
                    Fresh water, no daylight, a line to follow and a plan you do not improvise on.
                  </p>
                  <p className="ops-descent__line" data-panel="2">
                    Same discipline as the work. Plan the dive, dive the plan, check your gas before
                    you need it. Calm is a system, not a personality trait.
                  </p>
                </div>
              </div>
            </div>

            <div className="ops-wrap ops-descent__after">
              <Scanlines />
              <div className="ops-dive__grid">
                <div className="ops-dive__copy op">
                  <h3 className="ops-subhead">37 countries, and counting.</h3>
                  <p>
                    Traveling is the other half of it. Thirty-seven countries so far, and the habit
                    it builds is reading a room you have never been in: working with people whose
                    training, language and assumptions are nothing like yours, and getting to the
                    point without steamrolling anyone. That shows up in every cross-functional room
                    I walk into.
                  </p>
                </div>
                <div className="ops-dive__stat op" aria-hidden="true">
                  <span className="ops-dive__figureNum">37</span>
                  <span className="ops-dive__figureLabel">countries</span>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" data-ch="05" className="ops-section ops-contact" data-section>
            <Scanlines />
            <div className="ops-wrap">
              <p className="ops-eyebrow op">
                <span className="ops-num">05</span> / Get in Touch
              </p>
              <h2 className="ops-h2">Signal locked. Let&apos;s talk.</h2>
              <p className="ops-contact__loc op">San Antonio, Texas. Open to remote.</p>
              <div className="ops-contact__actions op">
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
            <span className="ops-ch ops-ch--static">CH 05</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
