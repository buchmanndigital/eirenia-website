import { HeroCircle } from "../icons/hero-circle";

export function HeroSection() {
  return (
    <section id="hero">
      <div className="hcl">
        <HeroCircle />
      </div>
      <div className="hbn">EIRENIA</div>
      <div className="hbt">The Return to Peace</div>
      <div className="hq">
        <span>&quot;Here you do not find anything new.</span>
        <br />
        <span className="g">You remember what you already are.&quot;</span>
      </div>
      <h1 className="hh">
        🕊️ Hier musst du nichts werden.
        <br />
        Hier darfst du einfach sein.
      </h1>
      <p className="hs">
        Ein offener, liebevoller Raum für innere Ruhe, Weisheit und menschliche
        Begegnung.
      </p>
      <div className="hbtns">
        <a href="#sternstunde" className="bf">
          ✨ Deine Sternstunde buchen
        </a>
        <a href="#programme" className="bo">
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
