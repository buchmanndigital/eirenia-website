"use server";

import crypto from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getPublicCourseRegistrationTarget } from "@/lib/db/courses";
import { sendRegistrationEmails, smtpEnvSummary } from "@/lib/email/registration-mail";
import { hasDatabase, sql } from "@/lib/db/connection";
import { ensureDatabaseReady } from "@/lib/db/schema";

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export async function registerForCourseAction(formData: FormData) {
  const slug = value(formData, "slug");
  const firstName = value(formData, "firstName");
  const lastName = value(formData, "lastName");
  const email = value(formData, "email");
  const phone = value(formData, "phone");
  const message = value(formData, "message");

  if (!firstName || !lastName || !email || !phone || formData.get("terms") !== "on") {
    redirect(`/programme/${encodeURIComponent(slug)}?error=pflicht`);
  }

  if (!message || message.length < 3) {
    redirect(`/programme/${encodeURIComponent(slug)}?error=pflicht`);
  }

  const phoneValue = phone || null;
  const messageValue = message || null;

  if (!hasDatabase) {
    console.error("[registerForCourseAction] Keine Datenbank-Env geladen.");
    redirect(`/programme/${encodeURIComponent(slug)}?error=missing`);
  }

  await ensureDatabaseReady();
  const target = await getPublicCourseRegistrationTarget(slug);

  if (!target) {
    redirect(`/programme/${slug}?error=missing`);
  }

  await sql`
    INSERT INTO course_registrations (
      id,
      course_id,
      first_name,
      last_name,
      email,
      phone,
      message,
      accepted_terms
    ) VALUES (
      ${crypto.randomUUID()},
      ${target.id},
      ${firstName},
      ${lastName},
      ${email},
      ${phoneValue},
      ${messageValue},
      ${true}
    )
  `;

  try {
    await sendRegistrationEmails({
      participantEmail: email,
      participantFirstName: firstName,
      participantLastName: lastName,
      participantPhone: phoneValue,
      participantMessage: messageValue,
      courseTitle: target.title,
      courseSlug: target.slug,
      courseDateIso: target.courseDate,
      courseLocation: target.location,
      coachEmail: target.coachEmail,
      coachName: target.coachName,
    });
  } catch (err) {
    console.error(
      "[registerForCourseAction] E-Mail fehlgeschlagen (Anmeldung ist gespeichert). SMTP-Check:",
      JSON.stringify(smtpEnvSummary()),
      err,
    );
  }

  revalidatePath(`/programme/${slug}`);
  redirect(`/programme/${slug}?sent=1`);
}
