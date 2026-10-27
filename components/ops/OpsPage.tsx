import Link from "next/link";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import OpsInteractions from "./OpsInteractions";
import OpsMotion from "./OpsMotion";
import OpsCursor from "./OpsCursor";
import OpsBoard, { type Stop } from "./OpsBoard";

const RESUME_HREF = "/Ayanna_McClintic_Resume.pdf";
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
  {
    ch: "06",
    label: "Creative Portfolio",
    href: siteConfig.links.creativePortfolio,
    angle: 136,
  },
];

const stops: Stop[] = [
  { code: "NRT", destination: "TOKYO", status: "EXPLORED", note: "JAPAN" },
  { code: "MAN", destination: "MANCHESTER", status: "LIVED", note: "ENGLAND" },
  { code: "PNH", destination: "PHNOM PENH", status: "EXPLORED", note: "CAMBODIA" },
  { code: "WDH", destination: "WINDHOEK", status: "EXPLORED", note: "NAMIBIA" },
  { code: "BKK", destination: "BANGKOK", status: "EXPLORED", note: "THAILAND" },
  { code: "SYD", destination: "SYDNEY", status: "EXPLORED", note: "AUSTRALIA" },
  { code: "DXB", destination: "DUBAI", status: "EXPLORED", note: "UAE" },
  { code: "CAI", destination: "CAIRO", status: "EXPLORED", note: "EGYPT" },
  { code: "TQO", destination: "TULUM", status: "DIVED", note: "MEXICO" },
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

const certifications = [
  { name: "NetSuite Certified BI and Reporting Associate", issuer: "NetSuite", year: "2026" },
  { name: "HubSpot Sales Hub Software Certified", issuer: "HubSpot Academy", year: "2026" },
  { name: "Lean Six Sigma Green Belt", issuer: "Six Sigma Global Institute", year: "2026" },
  {
    name: "Career Essentials in Generative AI",
    issuer: "Microsoft and LinkedIn",
    year: "2026",
  },
  { name: "Google AI Essentials Specialization", issuer: "Google", year: "2026" },
  { name: "Meta Certified Digital Marketing Associate", issuer: "Meta", year: "2025" },
  { name: "AI Fluency: Framework and Foundations", issuer: "Anthropic", year: "2026" },
  { name: "Claude Academy: Model Context Protocol", issuer: "Anthropic", year: "2026" },
  { name: "Claude Academy: Claude Code 101", issuer: "Anthropic", year: "2026" },
];

// Client work leads, with the two flagship builds first; everything else
// keeps its order from lib/projects.ts.
const leadSlugs = ["supply-sa-vendor-assistant", "hva-resource-center"];
const clientWork = [
  ...leadSlugs.flatMap((slug) => projects.filter((p) => p.slug === slug)),
  ...projects.filter((p) => !p.isConcept && !leadSlugs.includes(p.slug)),
];

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
          <a href={siteConfig.links.creativePortfolio} className="ops-nav__link">
            Creative
          </a>
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
                <span className="ops-timeline__line" aria-hidden="true" />
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

              <h3 className="ops-subhead">Certifications</h3>
              <ul className="ops-certs">
                {certifications.map((c) => (
                  <li key={c.name} className="ops-certs__row op">
                    <span className="ops-certs__name">{c.name}</span>
                    <span className="ops-certs__meta">
                      {c.issuer} · {c.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="case-studies" data-ch="03" className="ops-section" data-section>
            <Scanlines />
            <div className="ops-wrap">
              <p className="ops-eyebrow op">
                <span className="ops-num">03</span> / Case Studies
              </p>
              <h2 className="ops-h2 op">Work I&apos;ve shipped</h2>

              <a href={siteConfig.links.creativePortfolio} className="ops-creative op">
                <span className="ops-creative__label">Looking for the creative portfolio?</span>
                <span className="ops-creative__body">
                  Social media, blog, email and web design work lives on its own page.
                </span>
                <span className="ops-creative__cta">Go here</span>
              </a>

              <h3 className="ops-subhead">Client work</h3>
              <ul className="ops-more">
                {clientWork.map((p) => (
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

              <h3 className="ops-subhead">My product</h3>
              <ul className="ops-more">
                <li className="op">
                  <a
                    href="https://weaverkeep.com"
                    className="ops-more__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>WeaverKeep</span>
                    <span className="ops-more__meta">
                      Operating hub for surgical technology programs · Live
                    </span>
                  </a>
                </li>
              </ul>
              <p className="ops-disclaimer op">
                WeaverKeep is an independent product. It is not affiliated with, endorsed by, or
                sponsored by any accrediting body, and all third-party names and marks belong to
                their respective owners.
              </p>

              {conceptBuilds.length > 0 && (
                <>
                  <h3 className="ops-subhead">Concept builds</h3>
                  <p className="ops-note op">
                    Self-initiated systems, built end to end to test an approach. Not client
                    projects, and labelled that way wherever they appear.
                  </p>
                  <ul className="ops-more">
                    {conceptBuilds.map((c) => (
                      <li key={c.slug} className="op">
                        <Link href={`/projects/${c.slug}`} className="ops-more__link">
                          <span>{c.title}</span>
                          <span className="ops-more__meta">
                            {c.tags.slice(0, 3).join(" · ")}
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
                    you need it.
                  </p>
                  <p className="ops-descent__line ops-descent__line--last" data-panel="3">
                    Calm is a system.
                  </p>
                </div>
              </div>
            </div>

          </section>

          <section className="ops-section ops-travel-sec" data-section>
            <div className="ops-wrap">
              <Scanlines />
              <div className="ops-travel">
                <div className="ops-travel__lede">
                  <p className="ops-travel__count" aria-hidden="true">
                    37
                  </p>
                  <div className="ops-travel__copy op">
                    <h3 className="ops-subhead">37 countries and counting</h3>
                    <p>
                      Traveling across 37 countries shaped how I adapt, communicate, and solve
                      problems. Every place taught me something different about people, systems,
                      and perspective.
                    </p>
                    <p>
                      From Tokyo to Dubai to Cairo, the journey became part of how I work.
                    </p>
                  </div>
                </div>

                <div className="ops-travel__row">
                  <OpsBoard stops={stops} />

                  <figure className="ops-map op">
                    <img
                      src="/travel/world.svg"
                      alt="World map with the 37 countries Ayanna has visited highlighted in teal"
                      width={1400}
                      height={660}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption>
                      <span className="ops-map__key" aria-hidden="true" /> 37 countries visited
                    </figcaption>
                  </figure>
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
