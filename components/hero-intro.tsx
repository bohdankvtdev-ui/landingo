"use client";

import { useRef } from "react";
import { FileText, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { BadgeQuestionMark } from "@/components/ui/badge-question";
import { Separator } from "@/components/ui/separator";
import { ShaderBackground } from "@/components/ui/hero-shader";
import { site } from "@/lib/content";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#ff2400"
      aria-hidden="true"
      className="hero-heart"
    >
      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
    </svg>
  );
}

const links = [
  {
    href: `mailto:${site.email}`,
    label: "Email",
    external: false,
    icon: "mail" as const,
    primary: true,
  },
  {
    href: site.linkedin,
    label: "LinkedIn",
    external: true,
    icon: "linkedin" as const,
    primary: false,
  },
  {
    href: site.github,
    label: "GitHub",
    external: true,
    icon: "github" as const,
    primary: false,
  },
  {
    href: site.resume,
    label: "Resume",
    external: false,
    icon: "resume" as const,
    primary: false,
  },
];

export function HeroIntro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let killed = false;
      let splits: SplitText[] = [];

      const play = () => {
        if (killed || !root.current) return;

        document.fonts.ready.then(() => {
          if (killed || !root.current) return;

          const textNodes = gsap.utils.toArray<HTMLElement>(
            ".hero-word-text",
            root.current,
          );
          splits = textNodes.map((node) =>
            SplitText.create(node, {
              type: "chars",
              mask: "chars",
              charsClass: "hero-char",
            }),
          );
          const chars = splits.flatMap((split) => split.chars);

          gsap.set(".hero-display .hero-aside", { autoAlpha: 0, x: -16 });
          gsap.set(".hero-aside-right", { x: 16 });
          gsap.set(".hero-badge-q, .hero-heart-wrap", {
            autoAlpha: 0,
            scale: 0.4,
            rotate: -12,
            transformOrigin: "50% 50%",
          });
          gsap.set(".hero-signoff-rule", {
            scaleX: 0,
            transformOrigin: "left center",
          });
          gsap.set(
            [".hero-place", ".hero-byline", ".hero-lede", ".hero-links", ".hero-foot"],
            { autoAlpha: 0, y: 18 },
          );
          gsap.set(chars, { yPercent: 120, autoAlpha: 0 });

          gsap
            .timeline({ defaults: { ease: "arrive" } })
            .to(
              chars,
              {
                yPercent: 0,
                autoAlpha: 1,
                duration: 0.72,
                stagger: { each: 0.022, from: "start" },
                ease: "power3.out",
              },
              0,
            )
            .to(
              ".hero-badge-q",
              {
                autoAlpha: 1,
                scale: 1,
                rotate: 0,
                duration: 0.55,
                ease: "back.out(1.6)",
              },
              0.28,
            )
            .to(
              ".hero-heart-wrap",
              {
                autoAlpha: 1,
                scale: 1,
                rotate: 0,
                duration: 0.55,
                ease: "back.out(1.7)",
              },
              0.42,
            )
            .to(
              ".hero-display .hero-aside",
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.55,
                stagger: 0.08,
              },
              0.32,
            )
            .to(
              ".hero-signoff-rule",
              { scaleX: 1, duration: 0.7, ease: "power2.inOut" },
              0.55,
            )
            .to(
              [".hero-place", ".hero-byline"],
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.06,
              },
              0.72,
            )
            .to(".hero-lede", { autoAlpha: 1, y: 0, duration: 0.5 }, 0.82)
            .to(".hero-links", { autoAlpha: 1, y: 0, duration: 0.55 }, 0.9)
            .from(
              ".hero-link",
              {
                autoAlpha: 0,
                y: 10,
                duration: 0.35,
                stagger: 0.06,
              },
              0.95,
            )
            .to(".hero-foot", { autoAlpha: 1, y: 0, duration: 0.4 }, 1.1);
        });
      };

      let played = false;
      const onReady = () => {
        if (played || killed) return;
        played = true;
        play();
      };

      if (document.documentElement.classList.contains("is-ready")) {
        onReady();
      } else {
        window.addEventListener("site:ready", onReady);
      }

      const fallback = window.setTimeout(onReady, 2600);

      return () => {
        killed = true;
        splits.forEach((split) => split.revert());
        window.removeEventListener("site:ready", onReady);
        window.clearTimeout(fallback);
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {});

    return () => mm.revert();
  }, { scope: root });

  return (
    <section ref={root} className="hero hero-solo" id="top">
      <ShaderBackground />

      <div className="hero-stage">
        <h1 className="sr-only">
          {site.name} — {site.headline}
        </h1>

        <div className="hero-display">
          <div className="hero-row hero-row-1">
            <p className="hero-aside">
              IT specialist for web, content, and support.
            </p>
            <p className="hero-word" aria-hidden="true">
              <span className="hero-word-text">WEB</span>
            </p>
          </div>

          <div className="hero-row hero-row-2">
            <p className="hero-word hero-word-split" aria-hidden="true">
              <span className="hero-word-text">DES</span>
              <BadgeQuestionMark />
              <span className="hero-word-text">GN</span>
            </p>
            <p className="hero-aside hero-aside-right">
              HTML, CSS, JS, React, Cloudflare, Figma, Design, iOS, AI.
            </p>
          </div>

          <div className="hero-row hero-row-3">
            <p className="hero-word hero-word-split" aria-hidden="true">
              <span className="hero-word-text">CODE</span>
              <span className="hero-heart-wrap" aria-hidden="true">
                <HeartIcon />
              </span>
              <span className="hero-word-text">AI</span>
            </p>
          </div>
        </div>

        <div className="hero-signoff">
          <Separator className="hero-signoff-rule" />
          <p className="hero-place">{site.location.toUpperCase()}</p>
          <p className="hero-byline">
            <span className="hero-byline-role">SPECIALIST</span>
            <span className="hero-byline-name">{site.name}</span>
          </p>
        </div>

        <p className="hero-lede">{site.lede}</p>

        <nav className="hero-links" aria-label="Contact">
          {links.map((link) => (
            <a
              key={link.label}
              className={`hero-link${link.primary ? " hero-link-primary" : ""}`}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {link.icon === "mail" ? (
                <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
              ) : null}
              {link.icon === "linkedin" ? (
                <LinkedInIcon size={16} aria-hidden />
              ) : null}
              {link.icon === "github" ? (
                <GitHubIcon size={16} aria-hidden />
              ) : null}
              {link.icon === "resume" ? (
                <FileText size={16} strokeWidth={1.75} aria-hidden="true" />
              ) : null}
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <p className="hero-foot">
          {`© ${site.year} · ${site.location}`}
        </p>
      </div>
    </section>
  );
}
