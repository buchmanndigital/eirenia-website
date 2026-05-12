"use server";

import crypto from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getPublicCourseRegistrationTarget } from "@/lib/db/courses";
import { sendRegistrationEmails } from "@/lib/email/registration-mail";
import { hasDatabase, sql } from "@/lib/db/connection";
import { ensureDatabaseReady } from "@/lib/db/schema";

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

export async function registerForCourseAction(formData: FormData) {
  const slug = value(formData, "slug");

  if (!hasDatabase) {
    redirect(`/programme/${slug}?sent=1`);
  }

  await ensureDatabaseReady();
  const target = await getPublicCourseRegistrationTarget(slug);

  if (!target) {
    redirect(`/programme/${slug}?error=missing`);
  }

  const firstName = value(formData, "firstName");
  const lastName = value(formData, "lastName");
  const email = value(formData, "email");
  const phone = value(formData, "phone") || null;
  const message = value(formData, "message") || null;

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
      ${phone},
      ${message},
      ${formData.get("terms") === "on"}
    )
  `;

  try {
    await sendRegistrationEmails({
      participantEmail: email,
      participantFirstName: firstName,
      participantLastName: lastName,
      participantPhone: phone,
      participantMessage: message,
      courseTitle: target.title,
      courseSlug: target.slug,
      courseDateIso: target.courseDate,
      courseLocation: target.location,
      coachEmail: target.coachEmail,
      coachName: target.coachName,
    });
  } catch (err) {
    console.error("[registerForCourseAction] E-Mail fehlgeschlagen:", err);
  }

  revalidatePath(`/programme/${slug}`);
  redirect(`/programme/${slug}?sent=1`);
}
