import Link from "next/link";
import { RetreatIcon } from "../icons/retreat-icon";
import { Reveal } from "../reveal";

const retreatOffers = [
  {
    emoji: "🌲",
    tag: "Natur",
    title: "Natur & Weite",
    subtitle: "Retreat",
    text: "Landschaften und Orte, in denen du zur Ruhe kommst und tief durchatmen kannst.",
  },
  {
    emoji: "🕯️",
    tag: "Ritual",
    title: "Ritual & Kreis",
    subtitle: "Retreat",
    text: "Gemeinsame Zeremonien und Begegnung im geschützten Rahmen.",
  },
  {
    emoji: "✨",
    tag: "Licht",
    title: "Licht & Klarheit",
    subtitle: "Retreat",
    text: "Innere Klarheit und Transformation – getragen von erfahrenen Begleitern.",
  },
] as const;

export function RetreatsSection() {
  return (
    <section id="retreats">
      <div className="container">
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <RetreatIcon />
          </div>
        </Reveal>
        <div style={{ textAlign: "center" }}>
          <Reveal>
            <span className="ey">🌍 EIRENIA Retreats</span>
          </Reveal>
          <Reveal>
            <h2>EIRENIA Retreats</h2>
          </Reveal>
          <Reveal>
            <span className="rg">Räume des Friedens</span>
          </Reveal>
          <Reveal>
            <p>Manche Begegnungen verändern alles.</p>
          </Reveal>
          <Reveal>
            <p>
              Unsere Retreats sind lebendige Tempel der Stille – Orte, an denen
              sich Menschen aus verschiedenen Ländern begegnen, um gemeinsam
              Frieden zu erleben.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Geführt von erfahrenen Begleitern, getragen von Natur, Ritual und
              Licht.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <div className="pgrid retreat-offer-grid">
            {retreatOffers.map((item) => (
              <div key={item.title} className="pc retreat-offer-card">
                <div className="course-card-topline">
                  <div className="pci">{item.emoji}</div>
                  <span>{item.tag}</span>
                </div>
                <span className="pt">{item.subtitle}</span>
                <span className="pn">{item.title}</span>
                <span className="pe">{item.text}</span>
                <Link href="/#programme" className="pl" prefetch={false}>
                  Zu Kursen & Terminen →
                </Link>
              </div>
            ))}
          </div>
        </Reveal>
        <div style={{ textAlign: "center" }}>
          <Reveal>
            <Link href="/#programme" className="boc" prefetch={false}>
              🌿 Retreats & Programme entdecken
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
