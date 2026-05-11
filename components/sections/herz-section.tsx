import { HerzIcon } from "../icons/herz-icon";
import { Reveal } from "../reveal";

export function HerzSection() {
  return (
    <section id="herz">
      <div className="csm">
        <Reveal>
          <HerzIcon />
        </Reveal>
        <Reveal>
          <span className="ey">🌸 Das Herz von EIRENIA</span>
        </Reveal>
        <Reveal>
          <div className="hzt">Der Mensch</div>
        </Reveal>
        <Reveal>
          <p>
            <span className="bold">EIRENIA ist ein People Movement.</span>
          </p>
        </Reveal>
        <Reveal>
          <p>Kein Online-Kurs. Keine Plattform.</p>
        </Reveal>
        <Reveal>
          <p>
            Sondern ein lebendiger Raum, in dem Menschen einander wirklich
            begegnen.
          </p>
        </Reveal>
        <Reveal>
          <p>
            <span className="bold">
              Hier geschieht Heilung im Gespräch, Frieden in der Stille, Wachstum
              im Kreis.
            </span>
          </p>
        </Reveal>
        <Reveal>
          <p className="hzit">
            „Frieden geschieht nicht allein. Er wächst in Begegnung.{'"'}
          </p>
        </Reveal>
        <Reveal>
          <a href="#sternstunde" className="bf">
            🌿 Erlebe EIRENIA – Jetzt Platz sichern
          </a>
        </Reveal>
      </div>
    </section>
  );
}
