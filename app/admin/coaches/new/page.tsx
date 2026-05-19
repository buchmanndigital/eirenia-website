import { AdminShell } from "@/components/admin/admin-shell";
import { CoachForm } from "@/components/admin/coach-form";
import { requireAdmin } from "@/lib/auth/session";

type NewCoachPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function NewCoachPage({ searchParams }: NewCoachPageProps) {
  const user = await requireAdmin();
  const q = await searchParams;

  return (
    <AdminShell user={user}>
      <section>
        <div className="admin-section-head">
          <div>
            <span className="admin-eyebrow">Coach-Profil</span>
            <h2>Coach anlegen</h2>
          </div>
        </div>
        {q.error === "invalid" && (
          <p className="admin-alert">Bitte Vorname, Nachname, E-Mail und Status ausfüllen.</p>
        )}
        {q.error === "password" && (
          <p className="admin-alert">Bitte ein Passwort mit mindestens 8 Zeichen vergeben.</p>
        )}
        <CoachForm />
      </section>
    </AdminShell>
  );
}
