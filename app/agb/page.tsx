import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "AGB | EIRENIA",
  description: "Allgemeine Geschäftsbedingungen für Programme und Veranstaltungen von EIRENIA.",
};

export default function AgbPage() {
  return (
    <>
      <SiteNav />
      <main className="legal-page">
        <div className="legal-page-inner">
          <Link href="/" className="legal-back" prefetch={false}>
            ← Zur Startseite
          </Link>
          <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>
          <p className="legal-lead">
            Für Teilnahmen an Programmen, Kursen, Veranstaltungen und Retreats von EIRENIA.
            Stand: Mai 2026
          </p>

          <section className="legal-block">
            <h2>1. Geltungsbereich</h2>
            <p>
              Diese AGB gelten für alle Leistungen, die von EIRENIA (Anbieterin im Sinne des
              Rechtsverkehrs, vertreten durch den im Impressum Genannten) über die Website und im
              Rahmen der gebuchten oder vereinbarten Programme erbracht werden. Abweichende
              Bedingungen von Teilnehmenden finden nur Anwendung, wenn sie ausdrücklich schriftlich
              bestätigt wurden.
            </p>
          </section>

          <section className="legal-block">
            <h2>2. Vertragsschluss</h2>
            <p>
              Eine verbindliche Anmeldung kommt zustande, wenn du dich über das Anmeldeformular
              oder auf anderem Wege angemeldet hast und wir diese angenommen haben (z.&nbsp;B. durch
              Bestätigungs-E-Mail oder konkrete Zusage). Wir behalten uns vor, Anmeldungen
              aus wichtigem Grund abzulehnen (z.&nbsp;B. bei Auslastung oder bei fehlender
              Eignung des Angebots).
            </p>
          </section>

          <section className="legal-block">
            <h2>3. Leistungsinhalt</h2>
            <p>
              Der Umfang der Leistung ergibt sich aus der jeweiligen Kurs- bzw. Programmbeschreibung
              auf der Website. Begleitende Formate (Gruppen, Meditation, Ritual, coachingnahe
              Elemente) dienen dem persönlichen Erleben und ersetzen keine Therapie oder
              ärztliche Behandlung.
            </p>
          </section>

          <section className="legal-block">
            <h2>4. Spendenbeiträge und Zahlung</h2>
            <p>
              Soweit Programme auf Spendenbasis angeboten werden, bezeichnest du mit deinem Beitrag
              einen freiwilligen Spenden- bzw. Herzensbetrag. Technische oder organisatorische
              Gebühren können – sofern mitgeteilt – gesondert ausgewiesen werden. Details zum
              Zahlungszeitpunkt und den Zahlungsmitteln teilen wir dir mit der Anmeldung bzw.
              Bestätigung mit.
            </p>
          </section>

          <section className="legal-block">
            <h2>5. Stornierung und Umbuchung</h2>
            <p>
              Stornierungsfristen und etwaige Gebühren teilen wir dir mit der jeweiligen
              Anmeldung mit. Umbuchungen auf andere Termine sind nach Möglichkeit und freien
              Plätzen möglich und bedürfen unserer Zustimmung.
            </p>
          </section>

          <section className="legal-block">
            <h2>6. Mitwirkungspflicht der Teilnehmenden</h2>
            <p>
              Du bist für deine gesundheitliche und seelische Eignung zur Teilnahme selbst
              verantwortlich. Bei akuten körperlichen oder psychischen Krisen wende dich bitte an
              ärztliche oder therapeutische Hilfe. Respektvoller Umgang im Kreis ist
              Grundlage der Teilnahme; wir können bei grobem Verstoß von einer weiteren Teilnahme
              ausschließen.
            </p>
          </section>

          <section className="legal-block">
            <h2>7. Haftung</h2>
            <p>
              Wir haften nach den gesetzlichen Vorschriften für Vorsatz und grobe Fahrlässigkeit.
              Im Übrigen haften wir nur bei Verletzung wesentlicher Vertragspflichten in Höhe des
              vertragstypischen, vorhersehbaren Schadens. Eine Haftung für leicht fahrlässige
              Verletzungen anderer Pflichten ist ausgeschlossen, soweit gesetzlich zulässig.
            </p>
          </section>

          <section className="legal-block">
            <h2>8. Bild- und Tonaufnahmen</h2>
            <p>
              Werden im Rahmen eines Formats Aufnahmen geplant, wirst du gesondert darauf
              hingewiesen und – soweit erforderlich – um Einwilligung gebeten.
            </p>
          </section>

          <section className="legal-block">
            <h2>9. Schlussbestimmungen</h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
              UN-Kaufrechts. Sofern du Verbraucherin oder Verbraucher bist, bleiben gesetzliche
              Mängelrechte und zwingende Verbraucherschutzvorschriften unberührt. Sollten
              einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen unberührt.
            </p>
          </section>

          <p style={{ marginTop: "2rem" }}>
            <Link href="/impressum" className="legal-link">
              Zum Impressum
            </Link>
            {" · "}
            <Link href="/datenschutz" className="legal-link">
              Zur Datenschutzerklärung
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
