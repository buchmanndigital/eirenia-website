import { AdminShell } from "@/components/admin/admin-shell";
import { updateCoachStatusAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth/session";
import { getAllCoaches } from "@/lib/db/users";

export default async function CoachesPage() {
  const user = await requireAdmin();
  const coaches = await getAllCoaches();

  return (
    <AdminShell user={user}>
      <section className="admin-card">
        <div className="admin-section-head">
          <div>
            <span className="admin-eyebrow">Freigaben</span>
            <h2>Coaches verwalten</h2>
          </div>
        </div>
        <div className="admin-table">
          {coaches.map((coach) => (
            <div key={coach.id} className="admin-table-row">
              <div>
                <strong>{coach.name}</strong>
                <span>{coach.email}</span>
                {coach.bio && <p>{coach.bio}</p>}
              </div>
              <form action={updateCoachStatusAction} className="admin-inline-form">
                <input type="hidden" name="coachId" value={coach.id} />
                <select name="status" defaultValue={coach.status}>
                  <option value="pending">Wartet</option>
                  <option value="active">Aktiv</option>
                  <option value="blocked">Blockiert</option>
                </select>
                <button type="submit">Speichern</button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
