import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Impressum | EIRENIA",
  description: "Impressum und Angaben gemäß § 5 TMG für EIRENIA.",
};

export default function ImpressumPage() {
  return (
    <>
      <SiteNav />
      <main className="legal-page">
        <div className="legal-page-inner">
          <Link href="/" className="legal-back">
            ← Zur Startseite
          </Link>
          <h1>Impressum</h1>
          <p className="legal-lead">
            Angaben gemäß § 5 Telemediengesetz (TMG) und § 55 Abs. 2
            Rundfunkstaatsvertrag (RStV)
          </p>

          <section className="legal-block" aria-labelledby="impressum-anbieter">
            <h2 id="impressum-anbieter">Anbieter</h2>
            <address className="legal-address">
              EIRENIA
              <br />
              Mariaberger Str. 41
              <br />
              87439 Kempten (Allgäu)
              <br />
              Deutschland
            </address>
          </section>

          <section className="legal-block" aria-labelledby="impressum-kontakt">
            <h2 id="impressum-kontakt">Kontakt</h2>
            <p>
              Telefon:{" "}
              <a href="tel:+4983120695676" className="legal-link">
                +49 831 20695676
              </a>
              <br />
              E-Mail:{" "}
              <a href="mailto:info@eirenia.de" className="legal-link">
                info@eirenia.de
              </a>
            </p>
          </section>

          <section className="legal-block" aria-labelledby="impressum-inhalt">
            <h2 id="impressum-inhalt">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              Andreas Zettel
              <br />
              Mariaberger Str. 41, 87439 Kempten (Allgäu), Deutschland
            </p>
          </section>

          <section className="legal-block" aria-labelledby="impressum-haftung">
            <h2 id="impressum-haftung">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen.
            </p>
          </section>

          <section className="legal-block" aria-labelledby="impressum-links">
            <h2 id="impressum-links">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte keine Gewähr übernehmen.
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich.
            </p>
          </section>

          <section className="legal-block" aria-labelledby="impressum-streit">
            <h2 id="impressum-streit">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="legal-link"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
          <p style={{ marginTop: "2rem" }}>
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
