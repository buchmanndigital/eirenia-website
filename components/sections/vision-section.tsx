import { VisionIcon } from "../icons/vision-icon";
import { Reveal } from "../reveal";

export function VisionSection() {
  return (
    <section id="vision">
      <div className="csm" style={{ textAlign: "center" }}>
        <Reveal>
          <div style={{ marginBottom: "1.5rem" }}>
            <VisionIcon />
          </div>
        </Reveal>
        <Reveal>
          <span className="ey" style={{ display: "inline-block" }}>
            ⭐ Vision
          </span>
        </Reveal>
        <Reveal>
          <h2>
            Wir sehen eine Welt, in der Frieden kein Ideal mehr ist –
            <br />
            <span className="vi">sondern eine gelebte Realität.</span>
          </h2>
        </Reveal>
        <Reveal>
          <p className="vision-lead" style={{ marginTop: "1.5rem" }}>
            In jeder Stadt, jedem Land, überall auf der Erde entstehen Räume der
            Stille, geführt von Menschen, die EIRENIA leben und tragen.
          </p>
        </Reveal>
        <Reveal>
          <div className="ve">
            <p>Es beginnt hier.</p>
            <p className="vg">In dir.</p>
            <p>In uns.</p>
          </div>
        </Reveal>
        <Reveal>
          <div className="vw">
            <p>Willkommen bei EIRENIA.</p>
            <p className="vwg">Willkommen zu deiner Rückkehr.</p>
          </div>
        </Reveal>
        <div style={{ marginTop: "3rem" }}>
          <Reveal>
            <a href="#kontakt" className="bf">
              🕊️ Jetzt Verbindung spüren → Kontakt aufnehmen
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
