import { HeroCircle } from "../icons/hero-circle";

const heroTitle = "EIRENIA";

export function HeroSection() {
  return (
    <section id="hero">
      <div className="hcl">
        <HeroCircle />
      </div>
      <div className="hbn" aria-label={heroTitle}>
        {heroTitle.split("").map((letter, i) => (
          <span key={`${letter}-${i}`} className="hero-letter" style={{ animationDelay: `${0.38 + i * 0.065}s` }}>
            {letter}
          </span>
        ))}
      </div>
      <div className="hbt">The Return to Peace</div>
      <div className="hq">
        <span>&quot;Here you do not find anything new.</span>
        <br />
        <span className="g">You remember what you already are.&quot;</span>
      </div>
      <h1 className="hh">
        <span className="hh-line">
          <span className="hero-dove" aria-hidden>
            🕊️
          </span>{" "}
          Hier musst du nichts werden.
        </span>
        <br />
        Hier darfst du einfach sein.
      </h1>
      <p className="hs">
        Ein offener, liebevoller Raum für innere Ruhe, Weisheit und menschliche
        Begegnung.
      </p>
      <div className="hbtns">
        <a href="#sternstunde" className="bf hero-cta-primary">
          ✨ Deine Sternstunde buchen
        </a>
        <a href="#programme" className="bo hero-cta-secondary">
          Programme entdecken
        </a>
      </div>
      <div className="scroll-ind">
        <div className="sbar" />
        <span>Erkunden</span>
      </div>
    </section>
  );
}
