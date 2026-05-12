"use client";

import Link from "next/link";
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
      <Link href="/#hero" className="nl">
        <NavLogo size={42} />
        <div className="lt">
          <span className="wm">EIRENIA</span>
          <span className="tg">The Return to Peace</span>
        </div>
      </Link>
      <div className="nr">
        <div className="nlinks">
          <Link href="/#mission">Mission</Link>
          <Link href="/#programme">Programme</Link>
          <Link href="/#sternstunde">Sternstunde</Link>
          <Link href="/#coaching">Coaching</Link>
        </div>
        <Link href="/#kontakt" className="nbtn">
          Kontakt
        </Link>
      </div>
    </nav>
  );
}
