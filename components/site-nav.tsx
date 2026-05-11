"use client";

import { useEffect, useState } from "react";
import { NavLogo } from "./icons/nav-logo";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav id="nb" className={scrolled ? "scrolled" : undefined}>
      <a href="#hero" className="nl">
        <NavLogo size={42} />
        <div className="lt">
          <span className="wm">EIRENIA</span>
          <span className="tg">The Return to Peace</span>
        </div>
      </a>
      <div className="nr">
        <div className="nlinks">
          <a href="#mission">Mission</a>
          <a href="#programme">Programme</a>
          <a href="#sternstunde">Sternstunde</a>
          <a href="#coaching">Coaching</a>
        </div>
        <a href="#kontakt" className="nbtn">
          Kontakt
        </a>
      </div>
    </nav>
  );
}
