import type { AdminUser, Course } from "@/lib/db/types";
import { upsertCourseAction } from "@/app/admin/actions";
import { toDateTimeLocal } from "@/lib/date-format";

const defaultDonationText =
  "Diese Begegnung findet auf Spendenbasis statt. Du gibst, was sich für dich stimmig anfühlt – aus deinem Herzen heraus, ohne Verpflichtung, ohne Erwartung. Jeder ist willkommen, ganz gleich, was er mitbringt. Was zählt, ist deine Anwesenheit und dein offenes Herz.";

type CourseFormProps = {
  user: AdminUser;
  coaches: AdminUser[];
  course?: Course | null;
};

export function CourseForm({ user, coaches, course }: CourseFormProps) {
  const isAdmin = user.role === "admin";

  return (
    <form action={upsertCourseAction} className="admin-card admin-form">
      {course && <input type="hidden" name="courseId" value={course.id} />}

      {isAdmin && (
        <label>
          Coach
          <select name="coachId" defaultValue={course?.coachId || user.id}>
            {coaches
              .filter((coach) => coach.status === "active")
              .map((coach) => (
                <option key={coach.id} value={coach.id}>
                  {coach.name} ({coach.email})
                </option>
              ))}
          </select>
        </label>
      )}

      <div className="admin-grid-2">
        <label>
          Kurstitel
          <input name="title" defaultValue={course?.title} required />
        </label>
        <label>
          URL-Slug
          <input name="slug" defaultValue={course?.slug} placeholder="automatisch aus Titel" />
        </label>
      </div>

      <div className="admin-grid-3">
        <label>
          Icon
          <input name="emoji" defaultValue={course?.emoji || "✨"} />
        </label>
        <label>
          Kategorie
          <input name="category" defaultValue={course?.category} required />
        </label>
        <label>
          Kategorie-Farbe
          <input name="categoryColor" defaultValue={course?.categoryColor || ""} placeholder="#C9A84C" />
        </label>
      </div>

      <label>
        Untertitel
        <input name="subtitle" defaultValue={course?.subtitle} required />
      </label>

      <label>
        Über dieses Programm
        <textarea name="about" defaultValue={course?.about} required rows={5} />
      </label>

      <div className="admin-grid-2">
        <label>
          Datum & Uhrzeit
          <input
            name="courseDate"
            type="datetime-local"
            defaultValue={toDateTimeLocal(course?.courseDate)}
            required
          />
        </label>
        <label>
          Dauer
          <input name="duration" defaultValue={course?.duration} required />
        </label>
      </div>

      <div className="admin-grid-2">
        <label>
          Ort / Raumname
          <input name="location" defaultValue={course?.location} required />
        </label>
        <label>
          Genaue Adresse
          <input
            name="address"
            defaultValue={course?.address}
            placeholder="Straße Hausnummer, PLZ Ort"
            required
          />
        </label>
      </div>

      <label>
        Was dich erwartet (eine Zeile pro Punkt)
        <textarea
          name="expectations"
          defaultValue={course?.expectations.join("\n")}
          required
          rows={5}
        />
      </label>

      <label>
        Spenden-/Teilnahmehinweis
        <textarea
          name="donationText"
          defaultValue={course?.donationText || defaultDonationText}
          required
          rows={5}
        />
      </label>

      <label>
        Status
        <select name="status" defaultValue={course?.status || (isAdmin ? "published" : "pending")}>
          <option value="draft">Entwurf</option>
          <option value="pending">Zur Freigabe</option>
          {isAdmin && <option value="published">Veröffentlicht</option>}
        </select>
      </label>

      <button className="admin-primary" type="submit">
        Kurs speichern
      </button>
      {!isAdmin && (
        <p className="admin-muted">
          Neue oder geänderte Kurse werden zur Freigabe an den Admin gesendet.
        </p>
      )}
    </form>
  );
}
