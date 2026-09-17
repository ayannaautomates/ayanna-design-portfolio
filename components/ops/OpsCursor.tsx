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
        <span class="ops-remote__power"></span>
        <span class="ops-remote__pad"></span>
        <span class="ops-remote__pad"></span>
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
