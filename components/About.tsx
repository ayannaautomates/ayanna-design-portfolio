"use client";

import { CinematicAbout } from "@/components/ui/motion-footer";

type AboutProps = {
  headingLevel?: 1 | 2;
};

export default function About({ headingLevel = 2 }: AboutProps) {
  return (
    <section id="about" aria-labelledby="about-heading" className="min-w-0">
      <CinematicAbout headingLevel={headingLevel} />
    </section>
  );
}
