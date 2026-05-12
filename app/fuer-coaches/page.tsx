import type { Metadata } from "next";
import Link from "next/link";
import { COACH_LOGIN, COACH_REGISTER } from "@/lib/coach-public-paths";

export const metadata: Metadata = {
  title: "Für Coaches & Mitwirkende | EIRENIA",
  description:
    "Als Coach bei EIRENIA registrieren oder mit bestehendem Zugang anmelden.",
};

export default function FuerCoachesPage() {
  return (
    <main className="admin-auth">
      <div className="admin-auth-card wide">
        <Link href="/" className="admin-brand centered">
          EIRENIA
          <span>Mitwirkende & Coaches</span>
        </Link>
        <h1>Dein Zugang</h1>
        <p>
          Neue Coaches können sich hier registrieren – nach einer kurzen Prüfung schalten wir dich frei.
          Mit bestehendem Konto meldest du dich unten an.
        </p>
        <div className="coach-area-actions">
          <Link href={COACH_REGISTER} className="coach-area-btn coach-area-btn--primary">
            Als Coach registrieren
          </Link>
          <Link href={COACH_LOGIN} className="coach-area-btn coach-area-btn--quiet">
            Anmelden
          </Link>
        </div>
      </div>
    </main>
  );
}
