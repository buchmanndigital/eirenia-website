"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { COACH_LOGIN } from "@/lib/coach-public-paths";
import { registerCoachAction } from "../actions";

type RegisterClientProps = {
  hasDatabase: boolean;
};

export function RegisterClient({ hasDatabase }: RegisterClientProps) {
  const searchParams = useSearchParams();
  const success = Boolean(searchParams.get("success"));
  const error = Boolean(searchParams.get("error"));

  return (
    <main className="admin-auth">
      <div className="admin-auth-card wide">
        <Link href="/" className="admin-brand centered">
          EIRENIA
          <span>Coach Registrierung</span>
        </Link>
        <h1>Coach Account beantragen</h1>
        <p>
          Nach deiner Registrierung wird dein Account vom EIRENIA-Team geprüft und
          freigeschaltet.
        </p>
        {success && (
          <div className="admin-success">
            Danke für deine Registrierung. Dein Account wartet jetzt auf Freigabe.
          </div>
        )}
        {error && <div className="admin-alert">Bitte fülle alle Pflichtfelder korrekt aus.</div>}
        {!hasDatabase && (
          <div className="admin-alert">
            Coach-Registrierungen benötigen eine verbundene Vercel Postgres/Neon-Datenbank.
          </div>
        )}
        <form action={registerCoachAction} className="admin-form">
          <label>
            Name
            <input name="name" required />
          </label>
          <div className="admin-grid-2">
            <label>
              E-Mail
              <input name="email" type="email" required />
            </label>
            <label>
              Telefon
              <input name="phone" type="tel" />
            </label>
          </div>
          <label>
            Passwort
            <input name="password" type="password" minLength={8} required />
          </label>
          <label>
            Kurzbeschreibung
            <textarea name="bio" rows={4} placeholder="Wofür stehst du als Begleiter:in?" />
          </label>
          <button className="admin-primary" type="submit">
            Registrierung absenden
          </button>
        </form>
        <Link href={COACH_LOGIN} className="admin-link">
          Ich habe bereits einen Account
        </Link>
      </div>
    </main>
  );
}
