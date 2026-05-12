import { AdminShell } from "@/components/admin/admin-shell";
import { CourseForm } from "@/components/admin/course-form";
import { requireSession } from "@/lib/auth/session";
import { getAllCoaches } from "@/lib/db/users";

export default async function NewCoursePage() {
  const user = await requireSession();
  const coaches = user.role === "admin" ? await getAllCoaches() : [user];

  return (
    <AdminShell user={user}>
      <section>
        <div className="admin-section-head">
          <div>
            <span className="admin-eyebrow">Neues Programm</span>
            <h2>Kurs anlegen</h2>
          </div>
        </div>
        <CourseForm user={user} coaches={coaches} />
      </section>
    </AdminShell>
  );
}
