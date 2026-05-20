import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { CoachDeleteForm } from "@/components/admin/coach-delete-form";
import { CoachForm } from "@/components/admin/coach-form";
import { requireAdmin } from "@/lib/auth/session";
import { getCoachAccount } from "@/lib/db/users";

type EditCoachPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
};

export default async function EditCoachPage({ params, searchParams }: EditCoachPageProps) {
  const user = await requireAdmin();
  const { id } = await params;
  const q = await searchParams;
  const coach = await getCoachAccount(id);

  if (!coach) {
    notFound();
  }

  return (
    <AdminShell user={user}>
      <section>
        <div className="admin-section-head">
          <div>
            <span className="admin-eyebrow">Coach-Profil</span>
            <h2>{coach.name}</h2>
          </div>
        </div>
        {q.saved && <p className="admin-success">Coach wurde gespeichert.</p>}
        {q.error === "invalid" && (
          <p className="admin-alert">Bitte Vorname, Nachname, E-Mail und Status ausfüllen.</p>
        )}
        {q.error === "password" && (
          <p className="admin-alert">Das neue Passwort muss mindestens 8 Zeichen haben.</p>
        )}
        <CoachForm coach={coach} />
        <CoachDeleteForm coachId={coach.id} coachName={coach.name} />
      </section>
    </AdminShell>
  );
}
