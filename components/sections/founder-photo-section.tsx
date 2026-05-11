import { FounderPortraitFrame } from "../founder-portrait-frame";
import { Reveal } from "../reveal";

export function FounderPhotoSection() {
  return (
    <section id="founder-photo">
      <div className="fpi">
        <Reveal>
          <FounderPortraitFrame priority />
        </Reveal>
        <div className="fpt">
          <Reveal>
            <span className="ey">Der Gründer</span>
          </Reveal>
          <Reveal>
            <h2>Andreas Zettel</h2>
          </Reveal>
          <Reveal>
            <span className="frole">Friedensträger. Begleiter. Mensch.</span>
          </Reveal>
          <Reveal>
            <div className="fpdiv" />
          </Reveal>
          <Reveal>
            <p>
              Andreas trägt die Energie des Friedens seit vielen Jahren in sich –
              als stille Kraft, als inneres Licht, als Auftrag. Mit EIRENIA hat
              er einen Raum geschaffen, in dem diese Kraft erlebbar wird.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Als Gründer, Begleiter und Coach steht er für echte Begegnung: ohne
              Masken, ohne Konzepte – nur Mensch zu Mensch, Herz zu Herz.
            </p>
          </Reveal>
          <Reveal>
            <div className="fiq">
              „Es ist nicht meine Aufgabe, etwas zu tun.
              <br />
              <span>Es ist meine Aufgabe, zu sein.{'"'}</span>
            </div>
          </Reveal>
          <Reveal>
            <a
              href="https://www.andreas-zettel.de"
              target="_blank"
              rel="noopener noreferrer"
              className="flink"
            >
              Mehr über Andreas →
            </a>
          </Reveal>
          <Reveal>
            <div style={{ marginTop: "2rem" }}>
              <a href="#coaching" className="boc" style={{ fontSize: "0.78rem", padding: "0.85rem 2rem" }}>
                🤝 1:1 Coaching mit Andreas anfragen
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
