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
              <strong>
                Wir treffen uns LIVE in kleinen, größeren Gruppen und begegnen uns
                auf Augenhöhe und mit Respekt für diesen besonderen Moment.
              </strong>
            </p>
          </Reveal>
          <Reveal>
            <p>
              Erfahrene Coaches, Trainer und Menschen inspirieren und begleiten
              dich. In unseren Programmen und Kursen treffen wir uns in kleinen
              oder größeren Gruppen zu einem bestimmten Thema mit einem klaren
              Fokus für diese besondere Zeit.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Du darfst, wir dürfen gemeinsam wachen, zu uns finden und in Frieden
              kommen – ganz bewusst und klar.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <p
            style={{
              fontSize: "0.92rem",
              color: "var(--ts)",
              maxWidth: 560,
              margin: "0 auto 0",
              lineHeight: 1.7,
              fontStyle: "italic",
            }}
          >
            <strong style={{ color: "var(--tm2)", fontStyle: "normal" }}>Tipp:</strong>{" "}
            In einem Satz: Es geht nicht darum, etwas zu leisten – sondern anzukommen und in
            kleiner, echter Gemeinschaft spüren zu dürfen, wer du bist.
          </p>
        </Reveal>
        <Reveal>
          <div id="programme-kalender" className="spbox">
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
            <a href="#programme-kalender" className="bf">
              ✨ Zu den Terminen → Kalender & Orte
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
