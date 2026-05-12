import { getPublishedCourses } from "@/lib/db/courses";
import { ProgrammeExplorer } from "../programme-explorer";
import { Reveal } from "../reveal";

export async function ProgrammeSection() {
  const courses = await getPublishedCourses();

  return (
    <section id="programme">
      <div className="container">
        <div className="ph">
          <Reveal>
            <span className="ey">🔆 Kurse & Programme</span>
          </Reveal>
          <Reveal>
            <h2>Kurse & Programme</h2>
          </Reveal>
          <Reveal>
            <span className="pgs">Echte Begegnung, lebendige Energie</span>
          </Reveal>
          <Reveal>
            <p>
              In jedem unserer Programme steht der Mensch im Mittelpunkt – präsent,
              echt, geführt.
              <br />
              Wir begegnen uns in kleinen Kreisen, um gemeinsam zu wachsen.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <div className="spbox">
            <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: "2px" }}>
              🤍
            </span>
            <p>
              <strong>🌿 Alle Programme finden auf Spendenbasis statt.</strong>{" "}
              Du gibst, was sich für dich stimmig anfühlt – aus deinem Herzen
              heraus, ohne Verpflichtung. Jeder ist willkommen, ganz gleich, was
              er mitbringt. Deine Anwesenheit ist das Geschenk. 🩶
            </p>
          </div>
        </Reveal>
        <Reveal>
          <ProgrammeExplorer courses={courses} />
        </Reveal>
        <div style={{ textAlign: "center" }}>
          <Reveal>
            <a href="#kontakt" className="bf">
              ✨ Zu den Terminen → Jetzt Platz reservieren
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
