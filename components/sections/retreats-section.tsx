import { RetreatIcon } from "../icons/retreat-icon";
import { Reveal } from "../reveal";

export function RetreatsSection() {
  return (
    <section id="retreats">
      <div className="container">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <RetreatIcon />
          </div>
        </Reveal>
        <div style={{ textAlign: "center" }}>
          <Reveal>
            <span className="ey">🌍 EIRENIA Retreats</span>
          </Reveal>
          <Reveal>
            <h2>EIRENIA Retreats</h2>
          </Reveal>
          <Reveal>
            <span className="rg">Räume des Friedens</span>
          </Reveal>
          <Reveal>
            <p>Manche Begegnungen verändern alles.</p>
          </Reveal>
          <Reveal>
            <p>
              Unsere Retreats sind lebendige Tempel der Stille – Orte, an denen
              sich Menschen aus verschiedenen Ländern begegnen, um gemeinsam
              Frieden zu erleben.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Geführt von erfahrenen Begleitern, getragen von Natur, Ritual und
              Licht.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <div className="rtiles">
            <div className="rt">
              <span className="ri">🌲</span>
              <h4>Natur</h4>
              <p>Weite Landschaften & stille Orte</p>
            </div>
            <div className="rt">
              <span className="ri">🕯️</span>
              <h4>Ritual</h4>
              <p>Gemeinsame Zeremonien & Begegnung</p>
            </div>
            <div className="rt">
              <span className="ri">✨</span>
              <h4>Licht</h4>
              <p>Innere Klarheit & Transformation</p>
            </div>
          </div>
        </Reveal>
        <div style={{ textAlign: "center" }}>
          <Reveal>
            <a href="#kontakt" className="boc">
              🌿 Retreats entdecken → Jetzt Platz anfragen
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
