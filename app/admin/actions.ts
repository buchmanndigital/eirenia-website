"use server";

import crypto from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSession, destroySession, requireAdmin, requireSession } from "@/lib/auth/session";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { COACH_LOGIN, COACH_REGISTER } from "@/lib/coach-public-paths";
import { hasDatabase, sql } from "@/lib/db/connection";
import { ensureDatabaseReady } from "@/lib/db/schema";
import { getUserByEmail } from "@/lib/db/users";
import { slugify } from "@/lib/slug";
import type { CourseStatus } from "@/lib/db/types";

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function requireDatabase() {
  if (!hasDatabase) {
    throw new Error("Für den Admin-Bereich muss eine Vercel Postgres/Neon-Datenbank verbunden sein.");
  }
}

export async function loginAction(formData: FormData) {
  requireDatabase();
  const email = value(formData, "email");
  const password = value(formData, "password");
  await ensureDatabaseReady();

  const user = await getUserByEmail(email);
  if (!user || user.status !== "active") {
    redirect(`${COACH_LOGIN}?error=invalid`);
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    redirect(`${COACH_LOGIN}?error=invalid`);
  }

  await createSession({
    id: user.id,
    role: user.role,
  });
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect(COACH_LOGIN);
}

export async function registerCoachAction(formData: FormData) {
  requireDatabase();
  const name = value(formData, "name");
  const email = value(formData, "email");
  const phone = value(formData, "phone");
  const bio = value(formData, "bio");
  const password = value(formData, "password");

  if (!name || !email || password.length < 8) {
    redirect(`${COACH_REGISTER}?error=invalid`);
  }

  await ensureDatabaseReady();
  await sql`
    INSERT INTO admin_users (
      id, name, email, password_hash, role, status, phone, bio
    ) VALUES (
      ${crypto.randomUUID()},
      ${name},
      ${email.toLowerCase()},
      ${await hashPassword(password)},
      'coach',
      'pending',
      ${phone || null},
      ${bio || null}
    )
    ON CONFLICT (email) DO NOTHING
  `;

  redirect(`${COACH_REGISTER}?success=1`);
}

export async function updateCoachStatusAction(formData: FormData) {
  requireDatabase();
  await requireAdmin();
  await ensureDatabaseReady();

  const coachId = value(formData, "coachId");
  const status = value(formData, "status");

  if (!coachId || !["pending", "active", "blocked"].includes(status)) {
    redirect("/admin/coaches?error=invalid");
  }

  const result = await sql`
    UPDATE admin_users
    SET status = ${status}
    WHERE id = ${coachId} AND role = 'coach'
  `;

  revalidatePath("/admin/coaches");

  const affected = result.rowCount ?? 0;
  if (affected === 0) {
    redirect("/admin/coaches?error=no-rows");
  }

  redirect("/admin/coaches?saved=1");
}

export async function upsertCourseAction(formData: FormData) {
  const user = await requireSession();
  const courseId = value(formData, "courseId");
  const coachId = user.role === "admin" ? value(formData, "coachId") || user.id : user.id;
  const title = value(formData, "title");
  const courseDate = value(formData, "courseDate");
  const location = value(formData, "location");
  const address = value(formData, "address");
  const rawSlug = value(formData, "slug");
  const slug = rawSlug ? slugify(rawSlug) : slugify(title);
  const expectations = value(formData, "expectations")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const status = value(formData, "status") as CourseStatus;
  const allowedStatus = user.role === "admin" ? status : "pending";

  if (!title || !slug || !coachId || !courseDate || !location || !address) {
    redirect(courseId ? `/admin/courses/${courseId}?error=invalid` : "/admin/courses/new?error=invalid");
  }

  if (courseId) {
    const existing = await sql<{ coach_id: string }>`
      SELECT coach_id FROM courses WHERE id = ${courseId} LIMIT 1
    `;
    const ownerId = existing.rows[0]?.coach_id;
    if (!ownerId || (user.role !== "admin" && ownerId !== user.id)) {
      redirect("/admin/courses");
    }

    await sql`
      UPDATE courses SET
        coach_id = ${coachId},
        title = ${title},
        slug = ${slug},
        emoji = ${value(formData, "emoji") || "✨"},
        category = ${value(formData, "category")},
        category_color = ${value(formData, "categoryColor") || null},
        subtitle = ${value(formData, "subtitle")},
        about = ${value(formData, "about")},
        duration = ${value(formData, "duration")},
        location = ${location},
        address = ${address},
        course_date = ${new Date(courseDate).toISOString()},
        expectations = ${JSON.stringify(expectations)}::jsonb,
        donation_text = ${value(formData, "donationText")},
        status = ${allowedStatus},
        updated_at = NOW()
      WHERE id = ${courseId}
    `;
    revalidatePath("/admin/courses");
    revalidatePath(`/programme/${slug}`);
    revalidatePath("/");
    redirect(`/admin/courses/${courseId}?saved=1`);
  }

  const id = crypto.randomUUID();
  await sql`
    INSERT INTO courses (
      id,
      coach_id,
      title,
      slug,
      emoji,
      category,
      category_color,
      subtitle,
      about,
      duration,
      location,
      address,
      course_date,
      expectations,
      donation_text,
      status
    ) VALUES (
      ${id},
      ${coachId},
      ${title},
      ${slug},
      ${value(formData, "emoji") || "✨"},
      ${value(formData, "category")},
      ${value(formData, "categoryColor") || null},
      ${value(formData, "subtitle")},
      ${value(formData, "about")},
      ${value(formData, "duration")},
      ${location},
      ${address},
      ${new Date(courseDate).toISOString()},
      ${JSON.stringify(expectations)}::jsonb,
      ${value(formData, "donationText")},
      ${allowedStatus}
    )
  `;

  revalidatePath("/admin/courses");
  revalidatePath("/");
  redirect(`/admin/courses/${id}?saved=1`);
}

export async function approveCourseAction(formData: FormData) {
  await requireAdmin();
  const courseId = value(formData, "courseId");
  const status = value(formData, "status") as CourseStatus;
  if (!["draft", "pending", "published"].includes(status)) {
    return;
  }
  await sql`
    UPDATE courses SET status = ${status}, updated_at = NOW() WHERE id = ${courseId}
  `;
  const slugResult = await sql<{ slug: string }>`
    SELECT slug FROM courses WHERE id = ${courseId} LIMIT 1
  `;
  const slug = slugResult.rows[0]?.slug;
  revalidatePath("/admin/courses");
  revalidatePath("/");
  if (slug) {
    revalidatePath(`/programme/${slug}`);
  }
}
