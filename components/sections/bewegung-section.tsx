import { BewegungGlyph, BewegungRings } from "../icons/bewegung-icon";
import { Reveal } from "../reveal";

export function BewegungSection() {
  return (
    <section id="bewegung">
      <BewegungRings />
      <div className="csm" style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <BewegungGlyph />
        </Reveal>
        <Reveal>
          <span className="ey" style={{ textAlign: "center", display: "block" }}>
            💗 EIRENIA – Die Bewegung
          </span>
        </Reveal>
        <Reveal>
          <h2>EIRENIA – Die Bewegung</h2>
        </Reveal>
        <Reveal>
          <p className="bt">
            EIRENIA wächst – durch Begegnung, durch Verbindung, durch Menschen.
          </p>
        </Reveal>
        <Reveal>
          <p className="bt">
            Jeder Kurs, jedes Retreat, jede Sternstunde ist Teil eines größeren
            Feldes:
          </p>
        </Reveal>
        <Reveal>
          <span className="bg">einer Bewegung des Friedens.</span>
        </Reveal>
        <Reveal>
          <span className="bb1">Wir bauen keine Organisation,</span>
        </Reveal>
        <Reveal>
          <span className="bb2">wir öffnen Räume.</span>
        </Reveal>
        <Reveal>
          <p className="bm-quote">
            Ein Raum ist ein Platz an dem du dich sicher fühlst, dich fallen lassen
            kannst, du du sein darfst.
          </p>
        </Reveal>
        <Reveal>
          <p className="bsub">
            Überall dort, wo Menschen sich erinnern, wer sie sind, entsteht ein
            Stück EIRENIA.
          </p>
        </Reveal>
        <div style={{ textAlign: "center" }}>
          <Reveal>
            <a
              href="#programme-kalender"
              className="bo"
              style={{
                color: "rgba(250,248,242,0.65)",
                borderColor: "rgba(250,248,242,0.25)",
              }}
            >
              🤍 Werde Teil des Feldes – EIRENIA erleben
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
