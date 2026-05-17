import { CoachingInquiryForm } from "../coaching-inquiry-form";
import { FounderPortraitFrame } from "../founder-portrait-frame";
import { Reveal } from "../reveal";

export function CoachingSection() {
  return (
    <section id="coaching">
      <div className="container">
        <Reveal>
          <div className="fpi" style={{ marginBottom: "5rem" }}>
            <FounderPortraitFrame />
            <div className="fpt">
              <span className="ey">Der Gründer</span>
              <h2>Andreas Zettel</h2>
              <span className="frole">Friedensträger. Begleiter. Mensch.</span>
              <div className="fpdiv" />
              <p>
                Andreas trägt die Energie des Friedens seit vielen Jahren in sich –
                als stille Kraft, als inneres Licht, als Auftrag. Mit EIRENIA hat
                er einen Raum geschaffen, in dem diese Kraft erlebbar wird.
              </p>
              <p>
                Als Gründer, Begleiter und Coach steht er für echte Begegnung:
                ohne Masken, ohne Konzepte – nur Mensch zu Mensch, Herz zu Herz.
              </p>
              <div className="fiq">
                „Es ist nicht meine Aufgabe, etwas zu tun.
                <br />
                <span>Es ist meine Aufgabe, zu sein.{'"'}</span>
              </div>
              <a
                href="https://www.andreas-zettel.de"
                target="_blank"
                rel="noopener noreferrer"
                className="flink"
              >
                Mehr über Andreas →
              </a>
            </div>
          </div>
        </Reveal>

        <div style={{ textAlign: "center" }}>
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                color: "var(--ocean)",
                fontWeight: 400,
                marginBottom: "0.8rem",
              }}
            >
              1:1 Coaching Anfragen
            </h2>
          </Reveal>
          <Reveal>
            <p
              style={{
                color: "var(--tm2)",
                fontSize: "0.97rem",
                maxWidth: 560,
                margin: "0 auto 3rem",
                lineHeight: 1.9,
              }}
            >
              Du sehnst dich nach persönlicher Begleitung auf deinem Weg? Andreas
              nimmt sich Zeit für dich – in einem tiefen, achtsamen Einzelgespräch.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <CoachingInquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
