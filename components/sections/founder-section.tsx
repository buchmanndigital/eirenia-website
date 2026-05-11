import { FounderSymbol } from "../icons/founder-symbol";
import { Reveal } from "../reveal";

export function FounderSection() {
  return (
    <section id="founder">
      <div className="container">
        <Reveal>
          <div className="fsym">
            <FounderSymbol />
          </div>
        </Reveal>
        <Reveal>
          <span className="ey" style={{ textAlign: "center" }}>
            Die Geschichte des Gründers
          </span>
        </Reveal>
        <Reveal>
          <h2 className="fh2">Andreas Zettel</h2>
        </Reveal>
        <Reveal>
          <p className="fsub">Friedensträger. Begleiter. Mensch.</p>
        </Reveal>

        <Reveal>
          <div className="fbox">
            <p className="fp">
              In den letzten Tagen hat sich alles gefügt – mein ganz persönliches
              Puzzle aus Energien, Fähigkeiten und inneren Kräften.
            </p>
            <p className="fp">
              Meine Wirkkraft des Friedens begleitet mich seit vielen Jahren. Sie
              war immer da – eine stille Aufgabe, ein inneres Licht, das ich erst
              zu tragen lernen musste.
            </p>
            <span className="fhi">Ich trage die Energie des weißen Wächters in mir</span>
            <p className="fp">
              eine Kraft, die Frieden schützt und ihn bedingungslos weitergibt.
            </p>
            <p className="fp">
              Lange wusste ich nicht, wie ich diese Gabe in die Welt bringen
              sollte. Heute verstehe ich:
            </p>
            <div className="fbig">Es ist nicht meine Aufgabe, etwas zu tun.</div>
            <div className="fbig2">Es ist meine Aufgabe, zu sein.</div>
            <p className="fp">
              Ich bin dankbar und demütig, dass mir das Leben diesen Auftrag
              anvertraut hat – den Frieden in mir zu halten und mit euch zu teilen.
            </p>
            <p className="fp">
              Mit euch gemeinsam verspüre ich tiefe Freude, diesen Weg nach außen
              zu tragen – um unsere Welt zu einem wundervollen Ort zu machen.
            </p>
            <div className="fcite">– Andreas Zettel</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
