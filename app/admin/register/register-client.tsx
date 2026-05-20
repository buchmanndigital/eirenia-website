"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { COACH_LOGIN } from "@/lib/coach-public-paths";
import { registerCoachAction } from "../actions";

type RegisterClientProps = {
  hasDatabase: boolean;
};

export function RegisterClient({ hasDatabase }: RegisterClientProps) {
  const searchParams = useSearchParams();
  const success = Boolean(searchParams.get("success"));
  const error = searchParams.get("error");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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
        {error === "password" && (
          <div className="admin-alert">
            Bitte wähle ein Passwort mit mindestens 8 Zeichen, mindestens einem Buchstaben
            und mindestens einer Zahl.
          </div>
        )}
        {error === "invalid" && (
          <div className="admin-alert">
            Bitte fülle alle Pflichtfelder korrekt aus und prüfe, ob beide Passwörter
            übereinstimmen.
          </div>
        )}
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
          <div className="admin-password-guidance">
            <strong>Passwort</strong>
            <span>
              Mindestens 8 Zeichen, mindestens ein Buchstabe und mindestens eine Zahl.
              Verwende am besten zusätzlich Groß-/Kleinbuchstaben und ein Sonderzeichen.
            </span>
          </div>
          <label>
            Passwort
            <span className="admin-password-field">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                minLength={8}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                aria-pressed={showPassword}
              >
                <EyeIcon hidden={showPassword} />
              </button>
            </span>
          </label>
          <label>
            Passwort wiederholen
            <span className="admin-password-field">
              <input
                name="passwordConfirm"
                type={showPasswordConfirm ? "text" : "password"}
                minLength={8}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPasswordConfirm((current) => !current)}
                aria-label={
                  showPasswordConfirm ? "Passwort-Wiederholung verbergen" : "Passwort-Wiederholung anzeigen"
                }
                aria-pressed={showPasswordConfirm}
              >
                <EyeIcon hidden={showPasswordConfirm} />
              </button>
            </span>
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

function EyeIcon({ hidden }: { hidden: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {hidden ? (
        <path
          d="M4 20 20 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ) : null}
    </svg>
  );
}
