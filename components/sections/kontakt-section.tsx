import { FormSubmitButton } from "../form-submit-button";
import { KontaktIcon } from "../icons/kontakt-icon";
import { Reveal } from "../reveal";

export function KontaktSection() {
  return (
    <section id="kontakt">
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <Reveal>
            <KontaktIcon />
          </Reveal>
          <Reveal>
            <h2>🕊️ Lass uns verbinden</h2>
          </Reveal>
          <Reveal>
            <p className="ksub">Schreibe uns, was dich bewegt</p>
          </Reveal>
        </div>
        <Reveal>
          <div className="kcard">
            <div className="fr">
              <div className="fg">
                <label htmlFor="k-name">Dein Name</label>
                <input id="k-name" type="text" placeholder="Wie heißt du?" />
              </div>
              <div className="fg">
                <label htmlFor="k-email">E-Mail</label>
                <input id="k-email" type="email" placeholder="deine@email.de" />
              </div>
            </div>
            <div className="fg">
              <label htmlFor="k-msg">Deine Nachricht</label>
              <textarea
                id="k-msg"
                style={{ height: 140 }}
                placeholder="Was möchtest du mit uns teilen?"
              />
            </div>
            <FormSubmitButton variant="ocean">Jetzt Verbindung spüren</FormSubmitButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
