"use client";

import { useEffect } from "react";

// The pointer becomes a remote: it trails the mouse, its button lights on
// anything clickable, and a click fires a short blip. Fine pointers only.
export default function OpsCursor() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)");
    if (!fine.matches) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const remote = document.createElement("div");
    remote.className = "ops-remote";
    remote.setAttribute("aria-hidden", "true");
    remote.innerHTML = `
      <span class="ops-remote__body">
        <span class="ops-remote__beam"></span>
        <svg class="ops-remote__svg" viewBox="0 0 24 64" width="24" height="64">
          <defs>
            <linearGradient id="ops-remote-shell" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stop-color="#2b3233"/>
              <stop offset="0.45" stop-color="#1c2223"/>
              <stop offset="1" stop-color="#121617"/>
            </linearGradient>
          </defs>
          <path class="ops-remote__shell" d="M5 1.5h14a4.5 4.5 0 0 1 4.5 4.5v50.5a6 6 0 0 1-6 6h-11a6 6 0 0 1-6-6V6A4.5 4.5 0 0 1 5 1.5z" fill="url(#ops-remote-shell)"/>
          <rect class="ops-remote__ir" x="8" y="3" width="8" height="2.2" rx="1.1"/>
          <circle class="ops-remote__led" cx="18.5" cy="9.5" r="1"/>
          <circle class="ops-remote__power" cx="6.5" cy="9.5" r="2.4"/>
          <circle class="ops-remote__dpad" cx="12" cy="22" r="6.6"/>
          <path class="ops-remote__arrows" d="M12 16.6l-1.1 1.3h2.2zM12 27.4l-1.1-1.3h2.2zM6.6 22l1.3-1.1v2.2zM17.4 22l-1.3-1.1v2.2z"/>
          <circle class="ops-remote__ok" cx="12" cy="22" r="2.7"/>
          <rect class="ops-remote__rocker" x="3.6" y="31.5" width="4.2" height="10.5" rx="2.1"/>
          <rect class="ops-remote__rocker" x="16.2" y="31.5" width="4.2" height="10.5" rx="2.1"/>
          <path class="ops-remote__marks" d="M4.8 34.2h1.8M5.7 33.3v1.8M4.8 39.4h1.8M17.4 34.2l0.9-0.9 0.9 0.9M17.4 39l0.9 0.9 0.9-0.9"/>
          <rect class="ops-remote__mute" x="10.2" y="34.6" width="3.6" height="3.6" rx="1"/>
          <g class="ops-remote__keys">
            <rect x="4.4" y="45" width="4" height="2.6" rx="1"/><rect x="10" y="45" width="4" height="2.6" rx="1"/><rect x="15.6" y="45" width="4" height="2.6" rx="1"/>
            <rect x="4.4" y="49.2" width="4" height="2.6" rx="1"/><rect x="10" y="49.2" width="4" height="2.6" rx="1"/><rect x="15.6" y="49.2" width="4" height="2.6" rx="1"/>
            <rect x="4.4" y="53.4" width="4" height="2.6" rx="1"/><rect x="10" y="53.4" width="4" height="2.6" rx="1"/><rect x="15.6" y="53.4" width="4" height="2.6" rx="1"/>
            <rect x="10" y="57.6" width="4" height="2.6" rx="1"/>
          </g>
        </svg>
      </span>`;
    document.body.appendChild(remote);
    document.documentElement.classList.add("ops-has-remote");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frame = 0;
    let visible = false;

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        visible = true;
        x = targetX;
        y = targetY;
        remote.classList.add("is-visible");
      }
      const interactive = (event.target as HTMLElement)?.closest(
        'a, button, summary, [role="button"], input, textarea',
      );
      remote.classList.toggle("is-live", Boolean(interactive));
    };

    const render = () => {
      // a little lag, like a hand moving a real remote
      const ease = reduced ? 1 : 0.22;
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      remote.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    const onDown = () => remote.classList.add("is-pressed");
    const onUp = () => remote.classList.remove("is-pressed");
    const onLeave = () => {
      visible = false;
      remote.classList.remove("is-visible");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
      remote.remove();
      document.documentElement.classList.remove("ops-has-remote");
    };
  }, []);

  return null;
}
