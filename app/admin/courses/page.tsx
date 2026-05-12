import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { CourseStatusForm } from "@/components/admin/course-status-form";
import { requireSession } from "@/lib/auth/session";
import { getCoursesForUser } from "@/lib/db/courses";

export default async function CoursesPage() {
  const user = await requireSession();
  const courses = await getCoursesForUser(user.id, user.role === "admin");

  return (
    <AdminShell user={user}>
      <section className="admin-card">
        <div className="admin-section-head">
          <div>
            <span className="admin-eyebrow">Programme</span>
            <h2>Kurse verwalten</h2>
          </div>
          <Link href="/admin/courses/new" className="admin-primary compact">
            Neuer Kurs
          </Link>
        </div>
        <div className="admin-table">
          {courses.map((course) => (
            <div key={course.id} className="admin-table-row">
              <div>
                <strong>
                  {course.emoji} {course.title}
                </strong>
                <span>
                  {course.coachName} · {course.location} · {course.status}
                </span>
                <p>{course.subtitle}</p>
              </div>
              <div className="admin-row-actions">
                {user.role === "admin" && <CourseStatusForm course={course} />}
                <Link href={`/admin/courses/${course.id}`} className="admin-link">
                  Bearbeiten
                </Link>
                {course.status === "published" && (
                  <Link href={`/programme/${course.slug}`} className="admin-link">
                    Öffnen
                  </Link>
                )}
              </div>
            </div>
          ))}
          {courses.length === 0 && (
            <p className="admin-muted">Noch keine Kurse vorhanden.</p>
          )}
        </div>
      </section>
    </AdminShell>
  );
}
