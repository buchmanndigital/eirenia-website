import { programmes } from "@/lib/programmes";
import crypto from "node:crypto";
import { hashPassword } from "@/lib/auth/password";
import { hasDatabase, sql } from "./connection";

const donationText =
  "Diese Begegnung findet auf Spendenbasis statt. Du gibst, was sich für dich stimmig anfühlt – aus deinem Herzen heraus, ohne Verpflichtung, ohne Erwartung. Jeder ist willkommen, ganz gleich, was er mitbringt. Was zählt, ist deine Anwesenheit und dein offenes Herz.";

export async function ensureDatabaseReady() {
  if (!hasDatabase) {
    return;
  }

  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin', 'coach')),
      status TEXT NOT NULL CHECK (status IN ('pending', 'active', 'blocked')),
      phone TEXT,
      bio TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      coach_id TEXT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      emoji TEXT NOT NULL DEFAULT '✨',
      category TEXT NOT NULL,
      category_color TEXT,
      subtitle TEXT NOT NULL,
      about TEXT NOT NULL,
      duration TEXT NOT NULL,
      location TEXT NOT NULL,
      expectations JSONB NOT NULL DEFAULT '[]'::jsonb,
      donation_text TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('draft', 'pending', 'published')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS course_registrations (
      id TEXT PRIMARY KEY,
      course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT,
      accepted_terms BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await seedAndreas();
}

async function seedAndreas() {
  const andreasId = "andreas-zettel";
  const email = "andreas@eirenia.de";
  const password =
    process.env.ANDREAS_ADMIN_PASSWORD ||
    (process.env.NODE_ENV === "production"
      ? crypto.randomUUID()
      : "Eirenia-Andreas-Dev-2026!");
  const existing = await sql<{ id: string }>`
    SELECT id FROM admin_users WHERE email = ${email} LIMIT 1
  `;

  if (existing.rowCount === 0) {
    await sql`
      INSERT INTO admin_users (
        id, name, email, password_hash, role, status, phone, bio
      ) VALUES (
        ${andreasId},
        'Andreas Zettel',
        ${email},
        ${await hashPassword(password)},
        'admin',
        'active',
        NULL,
        'Friedensträger. Begleiter. Mensch.'
      )
    `;
  }

  const andreasCourses = programmes.filter(
    (programme) => programme.coachName === "Andreas Zettel",
  );

  for (const course of andreasCourses) {
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
        expectations,
        donation_text,
        status
      ) VALUES (
        ${course.slug},
        ${andreasId},
        ${course.name},
        ${course.slug},
        ${course.emoji},
        ${course.tag},
        ${course.tagColor || null},
        ${course.description},
        ${course.about},
        ${course.duration},
        ${course.location},
        ${JSON.stringify(course.expectations)}::jsonb,
        ${donationText},
        'published'
      )
      ON CONFLICT (slug) DO NOTHING
    `;
  }
}
