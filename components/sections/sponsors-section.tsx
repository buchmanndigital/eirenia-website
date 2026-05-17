import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../reveal";

const BUCHMANN_LOGO =
  "https://www.buchmann.digital/images/buchmann-digital-logo-black.png";

const sponsors = [
  {
    name: "Buchmann Digital",
    href: "https://www.buchmann.digital",
    logoSrc: BUCHMANN_LOGO,
  },
] as const;

export function SponsorsSection() {
  return (
    <section id="sponsoren" className="sponsors-section">
      <div className="container">
        <Reveal>
          <span className="ey">Unterstützung</span>
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
              color: "var(--ocean)",
              fontWeight: 400,
              marginBottom: "0.9rem",
            }}
          >
            Sponsoren
          </h2>
        </Reveal>
        <Reveal>
          <p
            style={{
              color: "var(--tm2)",
              fontSize: "0.97rem",
              maxWidth: 560,
              margin: "0 auto 2rem",
              lineHeight: 1.9,
              textAlign: "center",
            }}
          >
            Dieses Projekt wird von Partnern ermöglicht, die unsere Mission
            mittragen.
          </p>
        </Reveal>
        <Reveal>
          <ul className="sponsors-grid" role="list">
            {sponsors.map((s) => (
              <li key={s.href} className="sponsors-grid__item">
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-card"
                  aria-label={`${s.name} – zur Website`}
                >
                  <span className="sponsor-card__logo-shell">
                    <Image
                      src={s.logoSrc}
                      alt=""
                      width={220}
                      height={72}
                      role="presentation"
                      className="sponsor-card__logo"
                      sizes="(max-width: 480px) 70vw, 220px"
                    />
                  </span>
                  <span className="sponsor-card__meta">
                    <span className="sponsor-card__name">{s.name}</span>
                    <span className="sponsor-card__cta">Website besuchen →</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
