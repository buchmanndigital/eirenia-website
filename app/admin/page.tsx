import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireSession } from "@/lib/auth/session";
import { getCoursesForUser } from "@/lib/db/courses";
import { getAllCoaches } from "@/lib/db/users";

export default async function AdminPage() {
  const user = await requireSession();
  const [courses, coaches] = await Promise.all([
    getCoursesForUser(user.id, user.role === "admin"),
    user.role === "admin" ? getAllCoaches() : Promise.resolve([]),
  ]);

  const pendingCourses = courses.filter((course) => course.status === "pending").length;
  const publishedCourses = courses.filter((course) => course.status === "published").length;
  const pendingCoaches = coaches.filter((coach) => coach.status === "pending").length;

  return (
    <AdminShell user={user}>
      <section className="admin-stats">
        <div className="admin-card">
          <span>Veröffentlichte Kurse</span>
          <strong>{publishedCourses}</strong>
        </div>
        <div className="admin-card">
          <span>Kurse zur Freigabe</span>
          <strong>{pendingCourses}</strong>
        </div>
        {user.role === "admin" && (
          <div className="admin-card">
            <span>Coaches zur Freigabe</span>
            <strong>{pendingCoaches}</strong>
          </div>
        )}
      </section>

      <section className="admin-card">
        <div className="admin-section-head">
          <div>
            <span className="admin-eyebrow">Nächster Schritt</span>
            <h2>Kurse pflegen</h2>
          </div>
          <Link href="/admin/courses/new" className="admin-primary compact">
            Neuen Kurs anlegen
          </Link>
        </div>
        <p className="admin-muted">
          Coaches sehen ihre eigenen Kurse und senden Änderungen zur Freigabe.
          Admins können alle Coaches und Kurse freischalten, bearbeiten und einsehen.
        </p>
      </section>
    </AdminShell>
  );
}
