import Link from "next/link";
import { approveCourseAction } from "@/app/admin/actions";
import { AdminShell } from "@/components/admin/admin-shell";
import { CourseStatusForm } from "@/components/admin/course-status-form";
import { requireSession } from "@/lib/auth/session";
import { getCoursesForUser } from "@/lib/db/courses";
import type { CourseStatus } from "@/lib/db/types";

const statusLabels: Record<CourseStatus, string> = {
  draft: "Entwurf",
  pending: "Prüfung",
  published: "Veröffentlicht",
};

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
              <Link href={`/admin/courses/${course.id}`} className="admin-table-main-link">
                <div>
                  {user.role === "admin" ? (
                    <div className="admin-course-badges">
                      <span
                        className={
                          course.coachId === user.id ? "admin-pill admin-pill--own" : "admin-pill"
                        }
                      >
                        {course.coachId === user.id ? "Dein Kurs" : "Coach-Kurs"}
                      </span>
                    </div>
                  ) : null}
                  <strong>
                    {course.emoji} {course.title}
                  </strong>
                  <span>
                    {course.coachName} · {course.location} · {statusLabels[course.status]}
                  </span>
                  <span className="admin-course-meta">
                    {course.registrationCount} Anmeldung
                    {course.registrationCount === 1 ? "" : "en"}
                  </span>
                  <p>{course.subtitle}</p>
                </div>
              </Link>
              <div className="admin-row-actions">
                {user.role === "admin" && <CourseStatusForm course={course} />}
                {user.role === "admin" &&
                  course.coachId !== user.id &&
                  course.status === "published" && (
                    <form action={approveCourseAction} className="admin-inline-form">
                      <input type="hidden" name="courseId" value={course.id} />
                      <input type="hidden" name="status" value="draft" />
                      <button type="submit" className="admin-button-quiet">
                        Deaktivieren
                      </button>
                    </form>
                  )}
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
