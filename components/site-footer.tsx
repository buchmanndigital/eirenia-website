import { FooterSymbol } from "./icons/footer-symbol";
import Link from "next/link";
import { COACH_AREA } from "@/lib/coach-public-paths";

export function SiteFooter() {
  return (
    <footer>
      <p className="fq">
        „Ich bin – den Frieden in mir tragend und beschützend,
        <br />
        begleite ich dich in deine vollkommene Verbundenheit, Stille und
        Weisheit.{'"'}
      </p>
      <div className="fdiv" />
      <div
        style={{
          margin: "0 auto 1.2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <FooterSymbol />
      </div>
      <span className="fwm">EIRENIA</span>
      <span className="ftg">The Return to Peace</span>
      <nav className="fnav">
        <a href="#hero">Home</a>
        <a href="#mission">Mission</a>
        <a href="#programme">Programme</a>
        <a href="#sternstunde">Sternstunde</a>
        <a href="#kontakt">Kontakt</a>
        <Link href={COACH_AREA}>Für Coaches</Link>
      </nav>
      <div className="fdiv2" />
      <p className="fcp">
        © 2025 EIRENIA. Ein Raum für echte Begegnung, Bewusstwerdung und Heilung.
      </p>
    </footer>
  );
}
