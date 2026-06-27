"use client";

import { useState, useEffect, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

export type NavItem = {
  label: string;
  href: string;
  section?: string;
  page?: string;
};

type MenuHoverEffectsProps = {
  items: NavItem[];
  className?: string;
  activeSection?: string | null;
  pathname?: string;
  onMenuOpenChange?: (open: boolean) => void;
};

function isItemActive(
  item: NavItem,
  pathname: string,
  activeSection: string | null,
) {
  const onHomePage = pathname === "/" || pathname === "";

  if (onHomePage) {
    return Boolean(item.section && activeSection === item.section);
  }

  if (item.page && pathname === item.page) return true;
  return pathname === item.href;
}

function NavLink({
  item,
  isActive,
  onNavigate,
  className = "",
  pathname = "/",
}: {
  item: NavItem;
  isActive: boolean;
  onNavigate?: () => void;
  className?: string;
  pathname?: string;
}) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (
      item.section === "hero" &&
      (pathname === "/" || pathname === "") &&
      window.location.pathname === "/"
    ) {
      e.preventDefault();
      window.history.replaceState(null, "", "/#hero");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    onNavigate?.();
  };

  return (
    <Link
      href={item.href}
      onClick={handleClick}
      className={`relative inline-block group ${className}`}
      aria-current={isActive ? "page" : undefined}
    >
      <span
        className={`relative z-10 block hud-label transition-colors duration-300 px-3 py-2 md:px-4 ${
          isActive
            ? "text-navy"
            : "text-ghost-muted group-hover:text-navy group-focus-visible:text-navy"
        }`}
      >
        {isActive && (
          <span className="text-violet mr-1" aria-hidden="true">
            &gt;
          </span>
        )}
        {item.label}
      </span>

      <span
        className="absolute inset-0 border-t border-b border-cyan transform scale-y-[2] opacity-0 transition-all duration-300 origin-center group-hover:scale-y-100 group-hover:opacity-100 group-focus-visible:scale-y-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      />

      <span
        className={`absolute top-px left-0 w-full h-full bg-cyan transform transition-all duration-300 origin-top shadow-neon-cyan-sm ${
          isActive
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        }`}
        aria-hidden="true"
      />
    </Link>
  );
}

export default function MenuHoverEffects({
  items,
  className = "",
  activeSection = null,
  pathname = "/",
  onMenuOpenChange,
}: MenuHoverEffectsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const setMenuOpen = (open: boolean) => {
    setIsMenuOpen(open);
    onMenuOpenChange?.(open);
  };

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const mobileMenu =
    mounted && isMenuOpen
      ? createPortal(
          <div
            id="menu-hover-panel"
            className="fixed inset-0 z-[50] flex items-center justify-center bg-navy/95 backdrop-blur-md md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
          >
            <ul className="flex flex-col items-center gap-6">
              {items.map((item) => (
                <li key={item.href} className="list-none">
                  <NavLink
                    item={item}
                    isActive={isItemActive(item, pathname, activeSection)}
                    onNavigate={closeMenu}
                    pathname={pathname}
                    className="text-lg"
                  />
                </li>
              ))}
            </ul>
          </div>,
          document.body,
        )
      : null;

  return (
    <nav className={className} aria-label="Main navigation">
      <button
        type="button"
        onClick={toggleMenu}
        className="md:hidden relative z-[60] p-2 min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-1.5"
        aria-expanded={isMenuOpen}
        aria-controls="menu-hover-panel"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <span
          className={`block w-6 h-px bg-cyan transition-all duration-300 origin-center ${
            isMenuOpen ? "rotate-45 translate-y-[7px]" : ""
          }`}
        />
        <span
          className={`block w-6 h-px bg-cyan transition-opacity duration-300 ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-px bg-cyan transition-all duration-300 origin-center ${
            isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
          }`}
        />
      </button>

      {mobileMenu}

      <div className="hidden md:block">
        <ul className="flex flex-row items-center gap-2 lg:gap-4">
          {items.map((item) => (
            <li key={item.href} className="list-none">
              <NavLink
                item={item}
                isActive={isItemActive(item, pathname, activeSection)}
                pathname={pathname}
                className="text-sm"
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
