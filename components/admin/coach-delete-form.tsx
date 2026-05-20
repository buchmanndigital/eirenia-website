"use client";

import { deleteCoachAction } from "@/app/admin/actions";

type CoachDeleteFormProps = {
  coachId: string;
  coachName: string;
};

export function CoachDeleteForm({ coachId, coachName }: CoachDeleteFormProps) {
  return (
    <form
      action={deleteCoachAction}
      className="admin-danger-zone"
      onSubmit={(event) => {
        const confirmed = confirm(
          `Coach "${coachName}" wirklich komplett löschen? Zugeordnete Kurse und Anmeldungen werden ebenfalls gelöscht.`,
        );
        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="coachId" value={coachId} />
      <div>
        <strong>Coach komplett löschen</strong>
        <p>
          Entfernt den Coach dauerhaft inklusive aller zugeordneten Kurse und
          Kursanmeldungen.
        </p>
      </div>
      <button type="submit" className="admin-button-danger">
        Coach löschen
      </button>
    </form>
  );
}
