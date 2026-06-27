"use client";

import { PulseBeams, type BeamPath } from "@/components/ui/pulse-beams";

const beams: BeamPath[] = [
  {
    path: "M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["0%", "0%", "200%"],
        x2: ["0%", "0%", "180%"],
        y1: ["80%", "0%", "0%"],
        y2: ["100%", "20%", "20%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 0.3,
      },
    },
    connectionPoints: [
      { cx: 6.5, cy: 398.5, r: 6 },
      { cx: 269, cy: 220.5, r: 6 },
    ],
  },
  {
    path: "M568 200H841C846.523 200 851 195.523 851 190V40",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["20%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "80%", "-20%"],
        y2: ["100%", "100%", "0%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 1.1,
      },
    },
    connectionPoints: [
      { cx: 851, cy: 34, r: 6.5 },
      { cx: 568, cy: 200, r: 6 },
    ],
  },
  {
    path: "M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5",
    gradientConfig: {
      initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
      animate: {
        x1: ["20%", "100%", "100%"],
        x2: ["0%", "90%", "90%"],
        y1: ["80%", "80%", "-20%"],
        y2: ["100%", "100%", "0%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 0.7,
      },
    },
    connectionPoints: [
      { cx: 142, cy: 427, r: 6.5 },
      { cx: 425.5, cy: 274, r: 6 },
    ],
  },
  {
    path: "M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427",
    gradientConfig: {
      initial: { x1: "40%", x2: "50%", y1: "160%", y2: "180%" },
      animate: {
        x1: "0%",
        x2: "10%",
        y1: "-40%",
        y2: "-20%",
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 1.5,
      },
    },
    connectionPoints: [
      { cx: 770, cy: 427, r: 6.5 },
      { cx: 493, cy: 274, r: 6 },
    ],
  },
  {
    path: "M380 168V17C380 11.4772 384.477 7 390 7H414",
    gradientConfig: {
      initial: { x1: "-40%", x2: "-10%", y1: "0%", y2: "20%" },
      animate: {
        x1: ["40%", "0%", "0%"],
        x2: ["10%", "0%", "0%"],
        y1: ["0%", "0%", "180%"],
        y2: ["20%", "20%", "200%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "linear",
        repeatDelay: 2,
        delay: 0.2,
      },
    },
    connectionPoints: [
      { cx: 420.5, cy: 6.5, r: 6 },
      { cx: 380, cy: 168, r: 6 },
    ],
  },
];

const gradientColors = {
  start: "#7DF9FF",
  middle: "#9D4EFF",
  end: "#FF6EC7",
};

export default function BookCallCta() {
  return (
    <section
      id="book-call"
      aria-labelledby="book-call-heading"
      className="overflow-x-clip border-y border-cyan/10 bg-navy"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12 pt-16 md:pt-20 pb-4 text-center">
        <p className="hud-label text-cyan mb-4">[ LET&apos;S TALK ]</p>
        <h2
          id="book-call-heading"
          className="font-display text-2xl md:text-4xl uppercase tracking-wider text-ghost mb-2"
        >
          Book a Call Now
        </h2>
        <p className="text-ghost-muted text-sm font-mono max-w-md mx-auto">
          30 minutes. No pitch deck. Just a straight conversation about what
          you need built.
        </p>
      </div>

      <PulseBeams
        beams={beams}
        gradientColors={gradientColors}
        baseColor="#111822"
        accentColor="#1a2332"
        className="min-h-[22rem] md:min-h-[26rem] w-full bg-navy pb-16 md:pb-20"
      >
        <a
          href="https://clients.soulwirestudio.com/public/digital-services-consultation"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative z-40 inline-block w-[min(280px,85vw)] cursor-pointer rounded-full p-px text-xs font-semibold leading-6 text-ghost no-underline shadow-2xl shadow-navy-light"
        >
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(125,249,255,0.55)_0%,rgba(125,249,255,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative z-10 flex h-[5rem] md:h-[6rem] w-full items-center justify-center rounded-full bg-navy-light px-6 py-0.5 ring-1 ring-cyan/20 group-hover:ring-cyan/40 transition-all">
            <span className="inline-block bg-gradient-to-r from-ghost via-cyan to-violet bg-clip-text text-base md:text-xl font-display uppercase tracking-wide text-transparent whitespace-nowrap">
              Book Here
            </span>
          </div>
        </a>
      </PulseBeams>
    </section>
  );
}
