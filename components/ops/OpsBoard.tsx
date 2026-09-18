"use client";

import { useEffect, useRef } from "react";

export type Stop = {
  code: string;
  destination: string;
  status: string;
  note: string;
};

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 -";

function Cell({
  text,
  width,
  kind,
}: {
  text: string;
  width: number;
  kind?: string;
}) {
  const chars = text.padEnd(width, " ").slice(0, width).split("");
  return (
    <span className="ops-flaps" data-kind={kind} data-value={text}>
      {chars.map((char, i) => (
        <span key={i} className="ops-flap" data-final={char}>
          {char}
        </span>
      ))}
    </span>
  );
}

// A split-flap board: every character riffles through the drum and lands.
export default function OpsBoard({ stops }: { stops: Stop[] }) {
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const flaps = Array.from(board.querySelectorAll<HTMLElement>(".ops-flap"));
    const timers: number[] = [];

    const run = () => {
      for (const timer of timers) window.clearTimeout(timer);
      timers.length = 0;

      flaps.forEach((flap) => {
        const final = flap.dataset.final ?? " ";
        if (final === " ") return;
        const spins = 6 + Math.floor(Math.random() * 10);
        const delay = Math.random() * 380;
        for (let step = 0; step < spins; step += 1) {
          timers.push(
            window.setTimeout(
              () => {
                flap.textContent = CHARSET[Math.floor(Math.random() * CHARSET.length)];
                flap.classList.remove("is-flipping");
                void flap.offsetWidth;
                flap.classList.add("is-flipping");
              },
              delay + step * 55,
            ),
          );
        }
        timers.push(
          window.setTimeout(
            () => {
              flap.textContent = final;
              flap.classList.remove("is-flipping");
              void flap.offsetWidth;
              flap.classList.add("is-flipping");
            },
            delay + spins * 55,
          ),
        );
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) run();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(board);

    return () => {
      observer.disconnect();
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [stops]);

  return (
    <div className="ops-board" ref={boardRef}>
      <div className="ops-board__head">
        <span className="ops-board__title">Selected stops</span>
        <span className="ops-board__sub">Departures</span>
      </div>

      <div className="ops-board__cols" aria-hidden="true">
        <span>Code</span>
        <span>Destination</span>
        <span>Status</span>
        <span>Note</span>
      </div>

      <ul className="ops-board__rows">
        {stops.map((stop) => (
          <li key={stop.code + stop.destination} className="ops-board__row">
            <span className="sr-only">
              {stop.code} {stop.destination} {stop.status} {stop.note}
            </span>
            <Cell text={stop.code} width={3} kind="code" />
            <Cell text={stop.destination} width={12} kind="destination" />
            <Cell text={stop.status} width={8} kind="status" />
            <Cell text={stop.note} width={9} kind="note" />
          </li>
        ))}
      </ul>
    </div>
  );
}
