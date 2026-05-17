"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NavLogo } from "./icons/nav-logo";

const navLinks = [
  { href: "/#mission", label: "Mission" },
  { href: "/#programme", label: "Programme" },
  { href: "/#sternstunde", label: "Sternstunde" },
  { href: "/#retreats", label: "Retreats" },
  { href: "/#coaching", label: "Coaching" },
  { href: "/#sponsoren", label: "Sponsoren" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <nav id="nb" className={scrolled ? "scrolled" : undefined} aria-label="Hauptnavigation">
      <Link href="/#hero" className="nl" prefetch={false} onClick={() => setMobileOpen(false)}>
        <NavLogo size={42} />
        <div className="lt">
          <span className="wm">EIRENIA</span>
          <span className="tg">The Return to Peace</span>
        </div>
      </Link>
      <div className="nr">
        <div className="nlinks">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} prefetch={false}>
              {label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          className={`nav-burger${mobileOpen ? " nav-burger--open" : ""}`}
          aria-expanded={mobileOpen}
          aria-controls="nav-mobile-panel"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="nav-burger-lines" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="sr-only">Menü</span>
        </button>
        <Link
          href="/#kontakt"
          className="nbtn"
          prefetch={false}
          onClick={() => setMobileOpen(false)}
        >
          Kontakt
        </Link>
      </div>
      <div
        id="nav-mobile-panel"
        className={`nav-mobile-panel${mobileOpen ? " nav-mobile-panel--open" : ""}`}
        hidden={!mobileOpen}
      >
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            prefetch={false}
            className="nav-mobile-link"
            onClick={() => setMobileOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/#kontakt"
          prefetch={false}
          className="nav-mobile-link nav-mobile-link--kontakt"
          onClick={() => setMobileOpen(false)}
        >
          Kontakt
        </Link>
      </div>
    </nav>
  );
}
