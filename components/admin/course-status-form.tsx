import { approveCourseAction } from "@/app/admin/actions";
import type { Course } from "@/lib/db/types";

type CourseStatusFormProps = {
  course: Course;
};

export function CourseStatusForm({ course }: CourseStatusFormProps) {
  return (
    <form action={approveCourseAction} className="admin-inline-form">
      <input type="hidden" name="courseId" value={course.id} />
      <select name="status" defaultValue={course.status} aria-label="Kursstatus">
        <option value="draft">Entwurf</option>
        <option value="pending">Zur Freigabe</option>
        <option value="published">Veröffentlicht</option>
      </select>
      <button type="submit">Aktualisieren</button>
    </form>
  );
}
