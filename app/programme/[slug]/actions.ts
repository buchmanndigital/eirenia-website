"use server";

import crypto from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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
  const course = await sql<{ id: string }>`
    SELECT id FROM courses WHERE slug = ${slug} AND status = 'published' LIMIT 1
  `;
  const courseId = course.rows[0]?.id;

  if (!courseId) {
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
      ${courseId},
      ${value(formData, "firstName")},
      ${value(formData, "lastName")},
      ${value(formData, "email")},
      ${value(formData, "phone") || null},
      ${value(formData, "message") || null},
      ${formData.get("terms") === "on"}
    )
  `;

  revalidatePath(`/programme/${slug}`);
  redirect(`/programme/${slug}?sent=1`);
}
