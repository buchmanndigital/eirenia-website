import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { CourseForm } from "@/components/admin/course-form";
import { RegistrationDeleteForm } from "@/components/admin/registration-delete-form";
import { requireSession } from "@/lib/auth/session";
import { getCourseForEditing, getCourseRegistrations } from "@/lib/db/courses";
import { getAllCoaches } from "@/lib/db/users";

type EditCoursePageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; regdeleted?: string; error?: string }>;
};

export default async function EditCoursePage({ params, searchParams }: EditCoursePageProps) {
  const user = await requireSession();
  const { id } = await params;
  const query = await searchParams;
  const course = await getCourseForEditing(id);

  if (!course || (user.role !== "admin" && course.coachId !== user.id)) {
    notFound();
  }

  const [coaches, registrations] = await Promise.all([
    user.role === "admin" ? getAllCoaches() : Promise.resolve([user]),
    getCourseRegistrations(course.id),
  ]);

  return (
    <AdminShell user={user}>
      <section>
        <div className="admin-section-head">
          <div>
            <span className="admin-eyebrow">Kurs bearbeiten</span>
            <h2>{course.title}</h2>
          </div>
        </div>
        <CourseForm user={user} coaches={coaches} course={course} />
      </section>

      <section className="admin-card" style={{ marginTop: "1.5rem" }}>
        <div className="admin-section-head">
          <div>
            <span className="admin-eyebrow">Anmeldungen</span>
            <h2>Teilnehmer:innen</h2>
          </div>
        </div>
        {query.regdeleted ? (
          <p className="admin-success" style={{ marginBottom: "1rem" }}>
            Anmeldung wurde entfernt.
          </p>
        ) : null}
        {query.error === "regdel" ? (
          <p className="admin-alert" style={{ marginBottom: "1rem" }} role="alert">
            Die Anmeldung konnte nicht gelöscht werden (evtl. bereits entfernt).
          </p>
        ) : null}
        <div className="admin-table">
          {registrations.map((registration) => (
            <div key={registration.id} className="admin-table-row">
              <div>
                <strong>
                  {registration.firstName} {registration.lastName}
                </strong>
                <span>
                  {registration.email}
                  {registration.phone ? ` · ${registration.phone}` : ""}
                </span>
                {registration.message && <p>{registration.message}</p>}
              </div>
              <div className="admin-row-actions">
                <span className="admin-pill">
                  {new Date(registration.createdAt).toLocaleDateString("de-DE")}
                </span>
                {user.role === "admin" ? (
                  <RegistrationDeleteForm
                    courseId={course.id}
                    registrationId={registration.id}
                    participantLabel={`${registration.firstName} ${registration.lastName}`}
                  />
                ) : null}
              </div>
            </div>
          ))}
          {registrations.length === 0 && (
            <p className="admin-muted">Noch keine Anmeldungen für diesen Kurs.</p>
          )}
        </div>
      </section>
    </AdminShell>
  );
}
