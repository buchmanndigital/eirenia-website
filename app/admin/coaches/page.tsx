import { AdminShell } from "@/components/admin/admin-shell";
import { updateCoachStatusAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth/session";
import { getCoachAccounts } from "@/lib/db/users";

export const dynamic = "force-dynamic";

type CoachesPageProps = {
  searchParams: Promise<{ saved?: string; error?: string }>;
};

export default async function CoachesPage({ searchParams }: CoachesPageProps) {
  const user = await requireAdmin();
  const coaches = await getCoachAccounts();
  const q = await searchParams;

  return (
    <AdminShell user={user}>
      <section className="admin-card">
        <div className="admin-section-head">
          <div>
            <span className="admin-eyebrow">Freigaben</span>
            <h2>Coaches verwalten</h2>
          </div>
        </div>
        {q.saved && (
          <div className="admin-success">Status wurde gespeichert.</div>
        )}
        {q.error === "invalid" && (
          <div className="admin-alert">Ungültige Angaben. Bitte erneut versuchen.</div>
        )}
        {q.error === "no-rows" && (
          <div className="admin-alert">
            Es konnte kein Coach-Eintrag aktualisiert werden. Bitte Seite neu laden.
          </div>
        )}
        <div className="admin-table">
          {coaches.length === 0 ? (
            <p className="admin-muted">Noch keine Coach-Accounts.</p>
          ) : (
            coaches.map((coach) => (
              <div key={coach.id} className="admin-table-row">
                <div>
                  <strong>{coach.name}</strong>
                  <span>{coach.email}</span>
                  {coach.bio && <p>{coach.bio}</p>}
                </div>
                <form action={updateCoachStatusAction} className="admin-inline-form">
                  <input type="hidden" name="coachId" value={coach.id} />
                  <select name="status" defaultValue={coach.status} aria-label={`Status für ${coach.name}`}>
                    <option value="pending">Wartet</option>
                    <option value="active">Aktiv</option>
                    <option value="blocked">Blockiert</option>
                  </select>
                  <button type="submit">Speichern</button>
                </form>
              </div>
            ))
          )}
        </div>
      </section>
    </AdminShell>
  );
}
