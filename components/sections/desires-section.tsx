import { Reveal } from "../reveal";

const desires = [
  "Du sehnst dich nach tiefer Zufriedenheit.",
  "Du wünschst dir ein inneres Gefühl von Fülle.",
  "Du suchst einen Ort von Ruhe und Stille.",
  "Du möchtest endlich bei dir selbst ankommen.",
  "Du willst dich von allem lösen, was nicht mehr passt.",
  "Du suchst nach einem inneren Kraftort.",
  "Du sehnst dich nach allumfassender Selbstliebe.",
  "Du wünschst dir Orientierung in deinem Leben.",
];

export function DesiresSection() {
  return (
    <section id="desires">
      <div className="container">
        <div className="dh">
          <Reveal>
            <span className="ey">🪶 Was dein Herz hier findet</span>
          </Reveal>
          <Reveal>
            <h2>Was dein Herz hier findet</h2>
          </Reveal>
        </div>
        <Reveal>
          <div className="dgrid">
            {desires.map((text) => (
              <div key={text} className="dc">
                <span className="dsp">✦</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="dcl">
            <p>EIRENIA ist der Raum, in dem du das alles wiederfindest</p>
            <p className="dclg">in dir.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
