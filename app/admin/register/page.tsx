import Link from "next/link";
import { hasDatabase } from "@/lib/db/connection";
import { registerCoachAction } from "../actions";

type RegisterPageProps = {
  searchParams: Promise<{ success?: string; error?: string }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;

  return (
    <main className="admin-auth">
      <div className="admin-auth-card wide">
        <Link href="/" className="admin-brand centered">
          EIRENIA
          <span>Coach Registrierung</span>
        </Link>
        <h1>Coach Account beantragen</h1>
        <p>
          Nach deiner Registrierung wird dein Account von einem Admin geprüft und
          freigeschaltet.
        </p>
        {params.success && (
          <div className="admin-success">
            Danke für deine Registrierung. Dein Account wartet jetzt auf Freigabe.
          </div>
        )}
        {params.error && <div className="admin-alert">Bitte fülle alle Pflichtfelder korrekt aus.</div>}
        {!hasDatabase && (
          <div className="admin-alert">
            Coach-Registrierungen benötigen eine verbundene Vercel
            Postgres/Neon-Datenbank.
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
        <Link href="/admin/login" className="admin-link">
          Ich habe bereits einen Account
        </Link>
      </div>
    </main>
  );
}
