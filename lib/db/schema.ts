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
      first_name TEXT,
      last_name TEXT,
      phone TEXT,
      bio TEXT,
      photo_url TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS first_name TEXT`;
  await sql`ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS last_name TEXT`;
  await sql`ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS photo_url TEXT`;
  await sql`
    UPDATE admin_users
    SET
      first_name = COALESCE(first_name, NULLIF(split_part(name, ' ', 1), '')),
      last_name = COALESCE(
        last_name,
        NULLIF(regexp_replace(name, '^\\S+\\s*', ''), '')
      )
    WHERE first_name IS NULL OR last_name IS NULL
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
      address TEXT,
      course_date TIMESTAMPTZ,
      expectations JSONB NOT NULL DEFAULT '[]'::jsonb,
      donation_text TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('draft', 'pending', 'published')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`ALTER TABLE courses ADD COLUMN IF NOT EXISTS address TEXT`;
  await sql`ALTER TABLE courses ADD COLUMN IF NOT EXISTS course_date TIMESTAMPTZ`;
  await sql`UPDATE courses SET address = location WHERE address IS NULL OR address = ''`;

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

  await seedProgrammeCatalog();
}

/** Feste Coach-Zuordnung für Beispiel-Katalog (Passwörter außer Andreas nur für DB-FK, nicht zum Login gedacht). */
const SEED_COACH_META: Record<
  string,
  { id: string; email: string; role: "admin" | "coach" }
> = {
  "Andreas Zettel": {
    id: "andreas-zettel",
    email: "andreas@eirenia.de",
    role: "admin",
  },
  Julia: {
    id: "coach-julia",
    email: "seed.julia@eirenia.invalid",
    role: "coach",
  },
  Michael: {
    id: "coach-michael",
    email: "seed.michael@eirenia.invalid",
    role: "coach",
  },
  Tobi: {
    id: "coach-tobi",
    email: "seed.tobi@eirenia.invalid",
    role: "coach",
  },
  Ela: {
    id: "coach-ela",
    email: "seed.ela@eirenia.invalid",
    role: "coach",
  },
  Axel: {
    id: "coach-axel",
    email: "seed.axel@eirenia.invalid",
    role: "coach",
  },
  Nina: {
    id: "coach-nina",
    email: "seed.nina@eirenia.invalid",
    role: "coach",
  },
  "EIRENIA Team": {
    id: "coach-eirenia-team",
    email: "seed.team@eirenia.invalid",
    role: "coach",
  },
};

async function seedProgrammeCatalog() {
  const andreasProdEmail = "andreas@eirenia.de";
  const andreasPassword =
    process.env.ANDREAS_ADMIN_PASSWORD ||
    (process.env.NODE_ENV === "production"
      ? crypto.randomUUID()
      : "Eirenia-Andreas-Dev-2026!");

  const existingAndreas = await sql<{ id: string }>`
    SELECT id FROM admin_users
    WHERE id = ${SEED_COACH_META["Andreas Zettel"]!.id} OR email = ${andreasProdEmail}
    LIMIT 1
  `;

  if (existingAndreas.rowCount === 0) {
    const meta = SEED_COACH_META["Andreas Zettel"]!;
    await sql`
      INSERT INTO admin_users (
        id, name, email, password_hash, role, status, first_name, last_name, phone, bio, photo_url
      ) VALUES (
        ${meta.id},
        'Andreas Zettel',
        ${andreasProdEmail},
        ${await hashPassword(andreasPassword)},
        'admin',
        'active',
        'Andreas',
        'Zettel',
        NULL,
        'Friedensträger. Begleiter. Mensch.',
        '/andreas-zettel.jpeg'
      )
      ON CONFLICT (id) DO NOTHING
    `;
  } else {
    await sql`
      UPDATE admin_users
      SET
        first_name = COALESCE(first_name, 'Andreas'),
        last_name = COALESCE(last_name, 'Zettel'),
        bio = COALESCE(bio, 'Friedensträger. Begleiter. Mensch.'),
        photo_url = COALESCE(photo_url, '/andreas-zettel.jpeg')
      WHERE id = ${existingAndreas.rows[0]!.id}
    `;
  }

  for (const [coachName, meta] of Object.entries(SEED_COACH_META)) {
    if (coachName === "Andreas Zettel") {
      continue;
    }

    const existing = await sql<{ id: string }>`
      SELECT id FROM admin_users
      WHERE id = ${meta.id} OR email = ${meta.email}
      LIMIT 1
    `;

    if (existing.rowCount === 0) {
      await sql`
        INSERT INTO admin_users (
          id, name, email, password_hash, role, status, first_name, last_name, phone, bio, photo_url
        ) VALUES (
          ${meta.id},
          ${coachName},
          ${meta.email},
          ${await hashPassword(crypto.randomUUID())},
          ${meta.role},
          'active',
          ${coachName.split(" ")[0] || coachName},
          ${coachName.split(" ").slice(1).join(" ") || null},
          NULL,
          NULL,
          NULL
        )
        ON CONFLICT (id) DO NOTHING
      `;
    }
  }

  const andreasCoachRow = await sql<{ id: string }>`
    SELECT id FROM admin_users WHERE email = ${andreasProdEmail} LIMIT 1
  `;
  const andreasCoachId =
    andreasCoachRow.rows[0]?.id ?? SEED_COACH_META["Andreas Zettel"]!.id;

  for (const course of programmes) {
    const meta = SEED_COACH_META[course.coachName];
    if (!meta) {
      continue;
    }

    const coachId =
      course.coachName === "Andreas Zettel" ? andreasCoachId : meta.id;

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
        ${course.slug},
        ${coachId},
        ${course.name},
        ${course.slug},
        ${course.emoji},
        ${course.tag},
        ${course.tagColor || null},
        ${course.description},
        ${course.about},
        ${course.duration},
        ${course.location},
        ${course.address},
        ${course.courseDate},
        ${JSON.stringify(course.expectations)}::jsonb,
        ${donationText},
        'published'
      )
      ON CONFLICT (slug) DO UPDATE SET
        coach_id = EXCLUDED.coach_id,
        address = COALESCE(NULLIF(TRIM(courses.address), ''), EXCLUDED.address),
        course_date = COALESCE(courses.course_date, EXCLUDED.course_date),
        location = COALESCE(NULLIF(TRIM(courses.location), ''), EXCLUDED.location)
    `;
  }
}
