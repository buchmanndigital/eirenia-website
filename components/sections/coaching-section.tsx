import { FormSubmitButton } from "../form-submit-button";
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
          <div className="kcard">
            <div className="fr">
              <div className="fg">
                <label htmlFor="c-first">
                  Vorname{" "}
                  <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>
                </label>
                <input id="c-first" type="text" placeholder="Dein Vorname" required />
              </div>
              <div className="fg">
                <label htmlFor="c-last">
                  Nachname{" "}
                  <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>
                </label>
                <input id="c-last" type="text" placeholder="Dein Nachname" required />
              </div>
            </div>
            <div className="fr">
              <div className="fg">
                <label htmlFor="c-email">
                  E-Mail{" "}
                  <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>
                </label>
                <input id="c-email" type="email" placeholder="deine@email.de" required />
              </div>
              <div className="fg">
                <label htmlFor="c-phone">
                  Telefon{" "}
                  <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>{" "}
                  <span style={{ color: "var(--ts)", fontWeight: 300, fontSize: "0.78rem" }}>
                    – damit Andreas dich direkt erreicht
                  </span>
                </label>
                <input
                  id="c-phone"
                  type="tel"
                  placeholder="z.B. +49 151 23456789"
                  required
                  style={{ borderColor: "rgba(201,168,76,0.5)" }}
                />
              </div>
            </div>
            <div className="fg">
              <label htmlFor="c-msg">
                Deine Nachricht{" "}
                <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>
              </label>
              <textarea
                id="c-msg"
                style={{ height: 160 }}
                placeholder="Was bewegt dich? Was erhoffst du dir vom Coaching?"
                required
              />
            </div>
            <FormSubmitButton
              variant="goldAfter"
              idleStyle={{ background: "var(--ocean)", border: "none" }}
            >
              1:1 Coaching anfragen
            </FormSubmitButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
