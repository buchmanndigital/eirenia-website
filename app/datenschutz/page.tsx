import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Datenschutz | EIRENIA",
  description: "Datenschutzerklärung der Website EIRENIA gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <>
      <SiteNav />
      <main className="legal-page">
        <div className="legal-page-inner">
          <Link href="/" className="legal-back">
            ← Zur Startseite
          </Link>
          <h1>Datenschutzerklärung</h1>
          <p className="legal-lead">
            Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr ernst. Nachfolgend
            informieren wir Sie darüber, welche Daten wir verarbeiten, zu welchen Zwecken
            und auf welcher Rechtsgrundlage – einschließlich der externen Dienste, die
            auf dieser Website technisch eingebunden sind.
          </p>

          <section className="legal-block" aria-labelledby="ds-verantwortlich">
            <h2 id="ds-verantwortlich">1. Verantwortliche Stelle</h2>
            <p>
              Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
            </p>
            <address className="legal-address">
              EIRENIA
              <br />
              Mariaberger Str. 41
              <br />
              87439 Kempten (Allgäu)
              <br />
              Deutschland
            </address>
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

          <section className="legal-block" aria-labelledby="ds-ueberblick">
            <h2 id="ds-ueberblick">2. Übersicht der eingesetzten Dienste</h2>
            <p>Für den Betrieb dieser Website und verbundener Funktionen nutzen wir u. a.:</p>
            <ul className="legal-list">
              <li>
                <strong>Vercel Inc.</strong> – Hosting, Auslieferung der Website, serverseitige
                Funktionen (Serverless/Edge) und technische Protokolle.
              </li>
              <li>
                <strong>Neon (über Vercel Postgres)</strong> – verwaltete PostgreSQL-Datenbank zur
                Speicherung von Inhalten und personenbezogenen Daten aus dem
                geschützten Coach-/Admin-Bereich sowie aus Kursanmeldungen.
              </li>
              <li>
                <strong>STRATO AG</strong> – Versand von E-Mails (SMTP) im Zusammenhang mit
                Kursanmeldungen.
              </li>
              <li>
                <strong>OpenStreetMap (OSM)</strong> – Kartenkacheln zur Darstellung von
                Veranstaltungsorten.
              </li>
              <li>
                <strong>Nominatim (OpenStreetMap)</strong> – serverseitige Umwandlung von
                Ortsbezeichnungen in Koordinaten für die Kartendarstellung.
              </li>
              <li>
                <strong>Next.js / Schriftarten</strong> – über <code>next/font</code> eingebundene
                Schriftdateien (siehe Abschnitt Schriftarten).
              </li>
            </ul>
          </section>

          <section className="legal-block" aria-labelledby="ds-hosting">
            <h2 id="ds-hosting">3. Hosting und Infrastruktur (Vercel)</h2>
            <p>
              Unsere Website wird bei{" "}
              <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133, Covina, CA 91723, USA
              gehostet. Für Nutzer in der EU kann die Bereitstellung auch über
              Rechenzentren in Europa erfolgen (z. B. Region Frankfurt). Beim Aufruf der
              Seite werden durch Vercel technisch erforderliche Daten verarbeitet
              (z. B. IP-Adresse, Zeitpunkt der Anfrage, angeforderte URL, User-Agent,
              ggf. Referrer), um die Seite auszuliefern und zu stabilisieren.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
              einem sicheren und zuverlässigen Webangebot). Mit Vercel besteht ein
              Vertrag zur Auftragsverarbeitung, soweit erforderlich. Soweit Daten in
              die USA übermittelt werden, stützen wir uns auf geeignete Garantien im
              Sinne von Art. 46 DSGVO (u. a. EU-Standardvertragsklauseln) bzw. auf die
              Voraussetzungen eines Angemessenheitsbeschlusses / Data Privacy
              Framework, sofern anwendbar. Weitere Informationen:{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="legal-link"
              >
                vercel.com/legal/privacy-policy
              </a>
            </p>
          </section>

          <section className="legal-block" aria-labelledby="ds-datenbank">
            <h2 id="ds-datenbank">4. Datenbank (Neon / Vercel Postgres)</h2>
            <p>
              Personenbezogene Daten aus dem geschützten Bereich für Coaches und
              Administratoren sowie aus öffentlichen Kursanmeldungen werden in einer
              von <strong>Neon</strong> betriebenen PostgreSQL-Datenbank gespeichert (Anbindung über
              Vercel Postgres). Umfang und Zweck ergeben sich aus den jeweiligen
              Verarbeitungen (Abschnitte Coach-Bereich und Kursanmeldung). Es besteht
              ein Auftragsverarbeitungsverhältnis mit dem Anbieter, soweit gesetzlich
              erforderlich. Hinweise zum Datenschutz:{" "}
              <a
                href="https://neon.tech/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="legal-link"
              >
                neon.tech/privacy-policy
              </a>
            </p>
          </section>

          <section className="legal-block" aria-labelledby="ds-mail">
            <h2 id="ds-mail">5. E-Mail-Versand (STRATO)</h2>
            <p>
              Wenn Sie sich für einen Kurs anmelden, versenden wir transaktionsbezogene
              E-Mails über die SMTP-Dienste der{" "}
              <strong>STRATO AG</strong>, Pascalstraße 10, 10587 Berlin, Deutschland. Dabei werden
              die für den Versand nötigen Daten (insbesondere Absender, Empfänger,
              Betreff und Inhalt der Nachricht) verarbeitet. Rechtsgrundlage ist Art. 6
              Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen bzw.
              Vertragserfüllung). Datenschutzhinweise STRATO:{" "}
              <a
                href="https://www.strato.de/datenschutz/"
                target="_blank"
                rel="noopener noreferrer"
                className="legal-link"
              >
                strato.de/datenschutz
              </a>
            </p>
          </section>

          <section className="legal-block" aria-labelledby="ds-osm">
            <h2 id="ds-osm">6. Karten: OpenStreetMap und Nominatim</h2>
            <h3 className="legal-h3">6.1 Kartendarstellung (Kacheln)</h3>
            <p>
              Zum Anzeigen von Karten werden Kartendarstellungen (Kacheln) von den
              Servern der <strong>OpenStreetMap Foundation</strong> (OSMF) geladen. Dabei kann Ihre
              IP-Adresse und technische Metadaten (z. B. Browserkennung) an die
              jeweiligen Server übermittelt werden. Rechtsgrundlage ist Art. 6 Abs. 1
              lit. f DSGVO (berechtigtes Interesse an einer nutzerfreundlichen Darstellung
              von Veranstaltungsorten). OSM-Nutzungsrichtlinien und Impressum der OSMF:{" "}
              <a
                href="https://operations.osmfoundation.org/policies/tiles/"
                target="_blank"
                rel="noopener noreferrer"
                className="legal-link"
              >
                operations.osmfoundation.org/policies/tiles/
              </a>
            </p>
            <h3 className="legal-h3">6.2 Geocoding (Nominatim)</h3>
            <p>
              Damit Ortstexte auf der Karte erscheinen, ruft unser Server die
              Schnittstelle <strong>Nominatim</strong> (OpenStreetMap) auf und übergibt dabei die
              eingegebenen bzw. angezeigten Orts-/Adressbezeichnungen (Suchanfragen).
              Es findet also eine serverseitige Anfrage von unserem Hosting-Anbieter aus
              an <code>nominatim.openstreetmap.org</code> statt. Dabei können auch dort technische
              Zugriffsdaten (u. a. IP-Adresse des anfragenden Servers) verarbeitet
              werden. Wir beachten bei der Nutzung eine moderate Anfragerate. Mehr zu
              Nominatim:{" "}
              <a
                href="https://operations.osmfoundation.org/policies/nominatim/"
                target="_blank"
                rel="noopener noreferrer"
                className="legal-link"
              >
                operations.osmfoundation.org/policies/nominatim/
              </a>
            </p>
          </section>

          <section className="legal-block" aria-labelledby="ds-fonts">
            <h2 id="ds-fonts">7. Schriftarten</h2>
            <p>
              Wir binden Schriftarten über das Paket{" "}
              <code>next/font</code> von Next.js ein. Die Schriftdateien werden in der Regel beim
              Build Ihrer Seite optimiert und über unsere eigene Domain ausgeliefert, sodass
              beim Besuch der Website in der Regel keine direkte Verbindung Ihres
              Browsers zu Drittanbietern zu Zwecken der Schriftauslieferung nötig ist.
            </p>
          </section>

          <section className="legal-block" aria-labelledby="ds-cookies">
            <h2 id="ds-cookies">8. Cookies und vergleichbare Technologien</h2>
            <p>
              Für den geschützten Bereich <strong>„Für Coaches“</strong> (Login von Coaches und
              Administratoren) setzen wir ein technisch notwendiges{" "}
              <strong>HTTP-Cookie</strong> (<code>eirenia_session</code>), um Ihre Sitzung zu erkennen. Es
              ist <code>httpOnly</code>, <code>sameSite=lax</code> und in der Produktionsumgebung mit dem Flag{" "}
              <code>Secure</code> markiert. Die Speicherdauer entspricht der Sitzungsdauer (bis zu
              etwa 7 Tage). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
              Interesse an einem sicheren Zugang zum geschützten Bereich).
            </p>
            <p>
              Im übrigen öffentlichen Bereich der Website setzen wir keine Marketing-
              oder Analyse-Cookies ein.
            </p>
          </section>

          <section className="legal-block" aria-labelledby="ds-anmeldung">
            <h2 id="ds-anmeldung">9. Kursanmeldungen (öffentliche Programme)</h2>
            <p>Wenn Sie sich über ein Formular für ein Programm anmelden, verarbeiten wir:</p>
            <ul className="legal-list">
              <li>Vor- und Nachname</li>
              <li>E-Mail-Adresse, ggf. Telefonnummer</li>
              <li>freiwillige Nachricht</li>
              <li>Angabe zur Kenntnisnahme der Bedingungen (Checkbox)</li>
              <li>Zeitpunkt der Anmeldung</li>
            </ul>
            <p>
              Zweck ist die Organisation der Veranstaltung und die Kontaktaufnahme. Die
              Daten werden in unserer Datenbank gespeichert; zugleich können
              Benachrichtigungs-E-Mails an Sie und den jeweiligen Kurs-Coach versendet
              werden (siehe Abschnitt E-Mail). Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
              DSGVO (vorvertragliche Maßnahmen bzw. Vertragserfüllung). Sofern gesondert
              erforderlich, kann Art. 6 Abs. 1 lit. a DSGVO für Einwilligungen gelten
              (z. B. bei künftigen Erweiterungen).
            </p>
          </section>

          <section className="legal-block" aria-labelledby="ds-coach">
            <h2 id="ds-coach">10. Coach- und Admin-Bereich</h2>
            <p>
              Coaches und Administratoren können sich registrieren bzw. anmelden. Dabei
              werden die angegebenen Stammdaten (z. B. Name, E-Mail, Telefon, optional
              Kurzbiografie, Passwort in gehashter Form), Rolle und Status sowie
              inhaltliche Angaben zu Kursen verarbeitet und in der Datenbank gespeichert.
              Zweck ist die Bereitstellung und Moderation der Plattform. Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. b DSGVO und ggf. Art. 6 Abs. 1 lit. f DSGVO (Betrieb
              eines geschlossenen Verwaltungsbereichs).
            </p>
          </section>

          <section className="legal-block" aria-labelledby="ds-kontakt">
            <h2 id="ds-kontakt">11. Kontaktaufnahme</h2>
            <p>
              Sie können uns über die im Impressum genannten Kanäle erreichen. Wenn Sie
              uns per E-Mail oder Telefon kontaktieren, verarbeiten wir die von Ihnen
              mitgeteilten Daten zur Bearbeitung Ihres Anliegens (Art. 6 Abs. 1 lit. b
              bzw. f DSGVO).
            </p>
            <p>
              Der auf der Website dargestellte Bereich „Kontakt“ kann Schaltflächen
              enthalten; eine technische Übermittlung von Formulareingaben über diese
              Schaltflächen an uns erfolgt <strong>derzeit nicht</strong>. Bitte nutzen Sie für
              konkrete Anfragen E-Mail oder Telefon.
            </p>
          </section>

          <section className="legal-block" aria-labelledby="ds-speicher">
            <h2 id="ds-speicher">12. Speicherdauer und Löschung</h2>
            <p>
              Wir speichern personenbezogene Daten nur so lange, wie dies für die
              jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen
              bestehen. Kursanmeldungen und Coach-Daten werden gelöscht, sobald sie für
              den Zweck nicht mehr benötigt werden und keine rechtlichen Pflichten
              entgegenstehen, oder wenn ein gesetzlich zulässiger Löschanspruch besteht.
            </p>
          </section>

          <section className="legal-block" aria-labelledby="ds-rechte">
            <h2 id="ds-rechte">13. Ihre Rechte</h2>
            <p>Sie haben – soweit die gesetzlichen Voraussetzungen erfüllt sind – das Recht auf:</p>
            <ul className="legal-list">
              <li>Auskunft (Art. 15 DSGVO)</li>
              <li>Berichtigung (Art. 16 DSGVO)</li>
              <li>Löschung (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>
                Widerruf einer Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3
                DSGVO)
              </li>
              <li>
                Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO), z. B. beim Bayerischen
                Landesamt <strong>für Datenschutzaufsicht (BayLDA)</strong>
              </li>
            </ul>
          </section>

          <section className="legal-block" aria-labelledby="ds-stand">
            <h2 id="ds-stand">14. Stand</h2>
            <p>
              Stand dieser Erklärung: Mai 2026. Bei Änderungen der Website oder
              eingesetzter Dienste passen wir diese Erläuterung an.
            </p>
            <p>
              <Link href="/impressum" className="legal-link">
                Zum Impressum
              </Link>
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
