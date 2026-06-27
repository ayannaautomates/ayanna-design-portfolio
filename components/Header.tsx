"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuHoverEffects, { type NavItem } from "./MenuHoverEffects";

const navLinks: NavItem[] = [
  { label: "Home", href: "/#hero", section: "hero" },
  { label: "About", href: "/#about", section: "about", page: "/about" },
  { label: "Work", href: "/#projects", section: "projects", page: "/projects" },
  { label: "Contact", href: "/#contact", section: "contact", page: "/contact" },
];

const sectionIds = ["hero", "about", "projects", "contact"];
const HEADER_OFFSET = 80;

function resolveActiveSection() {
  const heroEl = document.getElementById("hero");
  const aboutEl = document.getElementById("about");

  if (!heroEl || !aboutEl) return "hero";

  const scrollY = window.scrollY;
  const aboutTop = aboutEl.getBoundingClientRect().top + scrollY;

  // Still in hero until the about section actually enters the viewport.
  if (scrollY + window.innerHeight * 0.45 < aboutTop) {
    return "hero";
  }

  const marker = scrollY + HEADER_OFFSET;
  let current = "hero";

  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;

    const top = el.getBoundingClientRect().top + scrollY;
    if (marker >= top) {
      current = id;
    }
  }

  return current;
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("hero");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const updateActiveSection = () => {
      setActiveSection(resolveActiveSection());
    };

    updateActiveSection();
    const rafId = requestAnimationFrame(updateActiveSection);

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [pathname]);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-navy/90 backdrop-blur-md border-b border-cyan/15"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12 flex items-center justify-between h-16">
        <Link
          href="/"
          className="flex items-center gap-3 group relative z-20"
          aria-label="Ayanna — Home"
        >
          <Image
            src="/logo-mark.png"
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 shrink-0 object-contain drop-shadow-[0_0_8px_rgba(125,249,255,0.35)] group-hover:drop-shadow-[0_0_12px_rgba(125,249,255,0.5)] transition-[filter]"
          />
          <span className="font-display text-sm text-ghost tracking-wider hidden sm:block uppercase">
            Ayanna
          </span>
        </Link>

        <MenuHoverEffects
          items={navLinks}
          pathname={pathname}
          activeSection={activeSection}
        />
      </div>
    </header>
  );
}
