import { KontaktForm } from "../kontakt-form";
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
          <KontaktForm />
        </Reveal>
      </div>
    </section>
  );
}
