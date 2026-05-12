"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { COACH_REGISTER } from "@/lib/coach-public-paths";
import { loginAction } from "../actions";

type LoginClientProps = {
  hasDatabase: boolean;
};

export function LoginClient({ hasDatabase }: LoginClientProps) {
  const searchParams = useSearchParams();
  const hasError = Boolean(searchParams.get("error"));

  return (
    <main className="admin-auth">
      <div className="admin-auth-card">
        <Link href="/" className="admin-brand centered">
          EIRENIA
          <span>Zugang für Coaches & Team</span>
        </Link>
        <h1>Anmelden</h1>
        <p>
          Melde dich an, um Kurse zu pflegen, Anmeldungen einzusehen und Freigaben zu
          verwalten.
        </p>
        {hasError && (
          <div className="admin-alert">
            Die Zugangsdaten sind nicht korrekt oder der Account ist noch nicht
            freigeschaltet.
          </div>
        )}
        {!hasDatabase && (
          <div className="admin-alert">
            Es ist noch keine Vercel Postgres/Neon-Datenbank verbunden. Die Anmeldung
            wird aktiv, sobald die Datenbank-Umgebungsvariablen im Vercel-Projekt
            gesetzt sind.
          </div>
        )}
        <form action={loginAction} className="admin-form">
          <label>
            E-Mail
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Passwort
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <button className="admin-primary" type="submit">
            Einloggen
          </button>
        </form>
        <Link href={COACH_REGISTER} className="admin-link">
          Als Coach registrieren
        </Link>
      </div>
    </main>
  );
}
