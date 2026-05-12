"use client";

import { deleteCourseRegistrationAction } from "@/app/admin/actions";

type RegistrationDeleteFormProps = {
  courseId: string;
  registrationId: string;
  participantLabel: string;
};

export function RegistrationDeleteForm({
  courseId,
  registrationId,
  participantLabel,
}: RegistrationDeleteFormProps) {
  return (
    <form
      action={deleteCourseRegistrationAction}
      className="admin-inline-form"
      onSubmit={(e) => {
        if (!confirm(`Anmeldung von ${participantLabel} wirklich löschen?`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="courseId" value={courseId} />
      <input type="hidden" name="registrationId" value={registrationId} />
      <button type="submit" className="admin-button-danger">
        Entfernen
      </button>
    </form>
  );
}
