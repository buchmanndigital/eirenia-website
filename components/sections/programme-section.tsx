import { getPublishedCourses } from "@/lib/db/courses";
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
          <div className="pgrid">
            {courses.map((course) => (
              <div key={course.slug} className="pc">
                <div className="pci">{course.emoji}</div>
                <span className="pn">{course.title}</span>
                <span
                  className="pt"
                  style={course.categoryColor ? { color: course.categoryColor } : undefined}
                >
                  {course.category}
                </span>
                <span className="pe">{course.subtitle}</span>
                <a href={`/programme/${course.slug}`} className="pl">
                  Details ansehen →
                </a>
              </div>
            ))}
            {courses.length === 0 && (
              <p className="programme-empty">
                Aktuell sind keine Kurse veröffentlicht. Schau bald wieder vorbei
                oder melde dich bei uns.
              </p>
            )}
          </div>
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
