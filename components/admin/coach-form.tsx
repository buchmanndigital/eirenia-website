import type { AdminUser } from "@/lib/db/types";
import { upsertCoachAction } from "@/app/admin/actions";

type CoachFormProps = {
  coach?: AdminUser | null;
};

export function CoachForm({ coach }: CoachFormProps) {
  const isEditing = Boolean(coach);

  return (
    <form action={upsertCoachAction} className="admin-card admin-form">
      {coach && <input type="hidden" name="coachId" value={coach.id} />}

      <div className="admin-grid-2">
        <label>
          Vorname
          <input name="firstName" defaultValue={coach?.firstName || ""} required />
        </label>
        <label>
          Nachname
          <input name="lastName" defaultValue={coach?.lastName || ""} required />
        </label>
      </div>

      <div className="admin-grid-2">
        <label>
          E-Mail
          <input name="email" type="email" defaultValue={coach?.email || ""} required />
        </label>
        <label>
          Telefon
          <input name="phone" type="tel" defaultValue={coach?.phone || ""} />
        </label>
      </div>

      <label>
        Beschreibung
        <textarea
          name="bio"
          defaultValue={coach?.bio || ""}
          rows={5}
          placeholder="Kurzprofil, Arbeitsweise, Schwerpunkte"
        />
      </label>

      <label>
        Foto-URL
        <input
          name="photoUrl"
          type="url"
          defaultValue={coach?.photoUrl || ""}
          placeholder="https://… oder /andreas-zettel.jpeg"
        />
      </label>

      <div className="admin-grid-2">
        <label>
          Status
          <select name="status" defaultValue={coach?.status || "active"}>
            <option value="pending">Wartet</option>
            <option value="active">Aktiv</option>
            <option value="blocked">Blockiert</option>
          </select>
        </label>
        <label>
          Passwort {isEditing ? <span>optional ändern</span> : null}
          <input
            name="password"
            type="password"
            minLength={8}
            required={!isEditing}
            placeholder={isEditing ? "leer lassen, um es nicht zu ändern" : "mind. 8 Zeichen"}
          />
        </label>
      </div>

      <button type="submit" className="admin-primary">
        Coach speichern
      </button>
    </form>
  );
}
