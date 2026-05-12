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
            <h2 id="ds-ueberblick">2. Übersicht eingebundener Dienstleistungen</h2>
            <p>Zur Bereitstellung der Website nutzen wir unter anderem:</p>
            <ul className="legal-list">
              <li>
                <strong>Hosting</strong> – Auslieferung der Seite, serverseitige Funktionen und
                technische Protokolle; der Anbieter kann sich außerhalb der EU befinden,
                soweit gesetzlich zulässig abgesichert.
              </li>
              <li>
                <strong>Speicherung</strong> – sichere, serverseitige Ablage von Daten, die Sie uns
                über diese Website übermitteln; Umfang siehe die Abschnitte zu
                Anmeldungen und Mitwirkenden.
              </li>
              <li>
                <strong>E-Mail-Versand</strong> – Zustellung von Bestätigungen und Benachrichtigungen
                bei Anmeldungen über den für unser geschäftliches Postfach genutzten
                Anbieter (EU/EWR).
              </li>
              <li>
                <strong>Karten und Standorte</strong> – Darstellung von Veranstaltungsorten mit
                Kartendarstellungen und – rein technisch, auf unserem Server –
                Ortszuordnung; Anbindung an öffentlich dokumentierte Kartendienste.
              </li>
              <li>
                <strong>Schriftarten</strong> – Auslieferung über diese Domain (siehe unten).
              </li>
              <li>
                <strong>Reichweitenmessung</strong> – Auswertung der Nutzung dieser Website zur
                Verbesserung des Angebots; eingebunden über den Hosting-Anbieter nach dessen
                technischer Dokumentation (ohne herkömmliche Werbe-Cookies).
              </li>
            </ul>
          </section>

          <section className="legal-block" aria-labelledby="ds-hosting">
            <h2 id="ds-hosting">3. Hosting</h2>
            <p>
              Die Website wird durch einen professionellen Hosting-Anbieter betrieben und
              ausgeliefert. Dabei werden technisch erforderliche Informationen verarbeitet
              (u. a. IP-Adresse, Zeitpunkt der Anfrage, aufgerufene Inhalte,
              Browserhinweise), damit die Seite sicher und stabil erreichbar ist. Nutzer in
              Europa können über EU-nahe Rechenzentren bedient werden; je nach Anfrage ist
              auch eine Verarbeitung außerhalb der EU möglich, wobei wir geeignete
              Schutzmaßnahmen (z. B. Standardvertragsklauseln oder vergleichbare
              Garantien) einsetzen.
            </p>
            <p>
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
              Betrieb und Sicherheit des Webangebots). Näheres zu Zwecken und Rechten
              finden Sie typischerweise in der Datenschutzerklärung des jeweiligen
              Hosting-Anbieters, den wir für dieses Projekt einsetzen.
            </p>
            <p>
              <strong>Nutzungsauswertung (Web Analytics):</strong> Wir nutzen im Rahmen des Hostings
              eine Messung, die uns zeigt, wie die Website genutzt wird (z. B.
              Seitenaufrufe, ungefähre Herkunft der Zugriffe), um Inhalte und Technik zu
              verbessern. Die Auswertung erfolgt über die dafür vorgesehene Funktion des
              Hosting-Anbieters; Details zu Datenarten, Speicherfristen und etwaigen
              Cookie- oder Local-Storage-Nutzung entnehmen Sie bitte den aktuellen
              Datenschutzhinweisen des Anbieters. Rechtsgrundlage: Art. 6 Abs. 1 lit. f
              DSGVO (berechtigtes Interesse an einer bedarfsgerechten Weiterentwicklung des
              Auftritts).
            </p>
          </section>

          <section className="legal-block" aria-labelledby="ds-datenbank">
            <h2 id="ds-datenbank">4. Speicherung personenbezogener Daten</h2>
            <p>
              Angaben aus Anmeldungen und aus dem geschlossenen Bereich für registrierte
              Mitwirkende werden elektronisch gespeichert. Die Speicher-Infrastruktur ist
              in das Hosting-Angebot eingebunden; etwaige weitere technische
              Unterauftragnehmer sind über die Angaben des Hosting-Anbieters
              (Auftragsverarbeitung, Unterauftragnehmer-/Subprocessor-Hinweise)
              nachvollziehbar. Bei uns erfolgt die Verarbeitung ausschließlich zu den in
              dieser Erklärung genannten Zwecken.
            </p>
          </section>

          <section className="legal-block" aria-labelledby="ds-mail">
            <h2 id="ds-mail">5. E-Mails bei Anmeldungen</h2>
            <p>
              Wenn Sie sich für eine Veranstaltung anmelden, können automatisiert
              Bestätigungen und Benachrichtigungen per E-Mail versendet werden. Dabei
              werden die für den Versand erforderlichen Metadaten und Inhalte (Absender,
              Empfänger, Betreff, Nachrichtentext) verarbeitet. Hierfür nutzen wir den
              E-Mail-Dienst unseres für das betreffende Postfach eingesetzten Anbieters
              (Sitz in Deutschland). Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO
              (vorvertragliche Maßnahmen / Vertragserfüllung). Einzelheiten zum Datenschutz
              regelt der jeweilige Anbieter in seiner Datenschutzerklärung.
            </p>
          </section>

          <section className="legal-block" aria-labelledby="ds-osm">
            <h2 id="ds-osm">6. Karten und Ortsdarstellung</h2>
            <p>
              Zur Anzeige von Veranstaltungsorten können Kartendarstellungen eingebunden
              werden. Dabei ruft Ihr Browser Darstellungen von den Servern des jeweiligen
              Kartendienstes ab; dabei können die üblichen technischen Daten (u. a.
              IP-Adresse, Browsermerkmale) übermittelt werden. Rechtsgrundlage: Art. 6
              Abs. 1 lit. f DSGVO (nutzerfreundliche Darstellung von Ortsangaben).
            </p>
            <p>
              Die Zuordnung von Ortsnamen zu Koordinaten erfolgt auf unserem Server (nicht
              direkt aus Ihrem Browser heraus), mit Übermittlung der für die Suche
              nötigen Ortsbezeichnungen an den technischen Dienst des Kartendienstes;
              weitergehende personenbezogene Angaben aus dem Formular werden dafür nicht
              weitergegeben. Wir nutzen öffentlich dokumentierte Nutzungsregeln und
              halten das Anfragenvolumen moderat.
            </p>
          </section>

          <section className="legal-block" aria-labelledby="ds-fonts">
            <h2 id="ds-fonts">7. Schriftarten</h2>
            <p>
              Schriftarten werden technisch so eingebunden, dass sie in der Regel über
              diese Website ausgeliefert werden und beim Seitenbesuch keine separate
              Schrift-Auslieferung durch weitere Anbieter nötig ist.
            </p>
          </section>

          <section className="legal-block" aria-labelledby="ds-cookies">
            <h2 id="ds-cookies">8. Cookies und vergleichbare Technologien</h2>
            <p>
              Für den geschützten Bereich <strong>„Für Coaches“</strong> (Login registrierter
              Mitwirkender und administrativer Zugang) setzen wir ein technisch
              notwendiges <strong>Sitzungs-Cookie</strong> ein, um Ihre Anmeldung am geschützten Bereich
              zu erkennen. Es ist technisch gehärtet (u. a. <code>httpOnly</code>,{" "}
              <code>sameSite=lax</code>, in der Live-Umgebung <code>Secure</code>). Die Speicherdauer
              entspricht der Sitzungsdauer (bis zu etwa 7 Tage). Rechtsgrundlage ist Art.
              6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren Zugang zum
              geschützten Bereich).
            </p>
            <p>
              Im übrigen öffentlichen Bereich der Website setzen wir keine Marketing-
              oder Analyse-Cookies ein. Eine nutzungsorientierte Messung kann über den
              Hosting-Anbieter ohne herkömmliche Werbe-Cookies erfolgen (vgl. Abschnitt
              Hosting).
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
              Daten werden bei uns elektronisch gesichert gespeichert; zugleich können
              Benachrichtigungs-E-Mails an Sie und den jeweiligen Kurs-Coach versendet
              werden (siehe Abschnitt E-Mail). Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
              DSGVO (vorvertragliche Maßnahmen bzw. Vertragserfüllung). Sofern gesondert
              erforderlich, kann Art. 6 Abs. 1 lit. a DSGVO für Einwilligungen gelten
              (z. B. bei künftigen Erweiterungen).
            </p>
          </section>

          <section className="legal-block" aria-labelledby="ds-coach">
            <h2 id="ds-coach">10. Registrierte Mitwirkende (geschlossener Bereich)</h2>
            <p>
              Personen mit Zugang zum geschlossenen Bereich können sich registrieren bzw.
              anmelden. Dabei werden die angegebenen Stammdaten (z. B. Name, E-Mail,
              Telefon, optional Kurzbiografie, Passwort in nicht lesbarer Form), Rolle und
              Status sowie inhaltliche Angaben zu Kursen verarbeitet und gespeichert.
              Zweck ist die Organisation unseres Angebots und die Pflege der öffentlich
              dargestellten Programme. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO und
              ggf. Art. 6 Abs. 1 lit. f DSGVO (Betrieb eines internen Verwaltungsbereichs).
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
              bestehen. Daten aus Anmeldungen und aus dem Bereich für registrierte
              Mitwirkende werden gelöscht, sobald sie für den jeweiligen Zweck nicht mehr
              benötigt werden und keine rechtlichen Pflichten entgegenstehen, oder wenn ein
              gesetzlich zulässiger Löschanspruch besteht.
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
