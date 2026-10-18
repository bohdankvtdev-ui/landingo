"use client";

import { useEffect, useRef, useState } from "react";

/** Survives Strict Mode remounts so the intro only runs once per page load. */
let bootDone = false;

function signalReady() {
  bootDone = true;
  document.documentElement.classList.add("is-ready");
  window.dispatchEvent(new Event("site:ready"));
}

export function PageLoader() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">(() =>
    bootDone ? "gone" : "in",
  );
  const timers = useRef<{ out?: number; gone?: number }>({});

  useEffect(() => {
    if (bootDone || document.documentElement.classList.contains("is-ready")) {
      bootDone = true;
      setPhase("gone");
      return;
    }

    let cancelled = false;
    document.documentElement.classList.remove("is-ready");
    document.documentElement.classList.add("is-booting");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.documentElement.classList.remove("is-booting");
      signalReady();
      setPhase("gone");
      return;
    }

    const FADE_MS = 280;
    const MIN_MS = 480;
    const started = performance.now();

    const finish = () => {
      if (cancelled) return;
      setPhase("out");
      timers.current.gone = window.setTimeout(() => {
        if (cancelled) return;
        document.documentElement.classList.remove("is-booting");
        signalReady();
        setPhase("gone");
      }, FADE_MS);
    };

    const kickoff = () => {
      if (cancelled) return;
      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      timers.current.out = window.setTimeout(finish, wait);
    };

    // Wait for fonts + a painted frame so the spinner is visible before exit.
    void Promise.all([
      document.fonts.ready.catch(() => undefined),
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
    ]).then(kickoff);

    // Hard safety: never leave the page stuck behind the loader.
    const safety = window.setTimeout(() => {
      if (cancelled || bootDone) return;
      document.documentElement.classList.remove("is-booting");
      signalReady();
      setPhase("gone");
    }, 2500);

    return () => {
      cancelled = true;
      window.clearTimeout(timers.current.out);
      window.clearTimeout(timers.current.gone);
      window.clearTimeout(safety);
      // Only strip booting class if we never finished — remount will re-add it.
      if (!bootDone) {
        document.documentElement.classList.remove("is-booting");
      }
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`page-loader${phase === "out" ? " is-out" : ""}`}
      aria-busy={phase === "in"}
      aria-live="polite"
      role="status"
    >
      <div className="loader-spinner" aria-hidden="true">
        <span className="loader-spinner-ring" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
