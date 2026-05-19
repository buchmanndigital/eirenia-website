import { approveCourseAction } from "@/app/admin/actions";
import type { Course } from "@/lib/db/types";

type CourseStatusFormProps = {
  course: Course;
};

export function CourseStatusForm({ course }: CourseStatusFormProps) {
  const options = [
    { value: "draft", label: "Entwurf" },
    { value: "pending", label: "Prüfung" },
    { value: "published", label: "Veröffentlicht" },
  ] as const;

  return (
    <form action={approveCourseAction} className="admin-status-segments" aria-label="Kursstatus">
      <input type="hidden" name="courseId" value={course.id} />
      {options.map((option) => (
        <button
          key={option.value}
          type="submit"
          name="status"
          value={option.value}
          className={course.status === option.value ? "is-active" : undefined}
          aria-pressed={course.status === option.value}
        >
          {option.label}
        </button>
      ))}
    </form>
  );
}
