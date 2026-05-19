import { getProgrammeBySlug, programmes } from "@/lib/programmes";
import { ensureDatabaseReady } from "./schema";
import { hasDatabase, sql } from "./connection";
import type { Course, CourseRegistration, CourseStatus, CustomerRecord } from "./types";

const donationText =
  "Diese Begegnung findet auf Spendenbasis statt. Du gibst, was sich für dich stimmig anfühlt – aus deinem Herzen heraus, ohne Verpflichtung, ohne Erwartung. Jeder ist willkommen, ganz gleich, was er mitbringt. Was zählt, ist deine Anwesenheit und dein offenes Herz.";

/** Wenn wahr: keine Daten aus `lib/programmes.ts` – leere DB / Fehler bleiben sichtbar. Env: `PROGRAMMES_DB_ONLY=1` oder (Legacy) `PROGRAMMES_DB_STRICT=1`. */
function strictDatabaseCatalog(): boolean {
  return (
    process.env.PROGRAMMES_DB_ONLY === "1" ||
    process.env.PROGRAMMES_DB_STRICT === "1"
  );
}

type CourseRow = {
  id: string;
  coach_id: string;
  coach_name: string | null;
  coach_first_name: string | null;
  coach_last_name: string | null;
  coach_bio: string | null;
  coach_photo_url: string | null;
  title: string;
  slug: string;
  emoji: string;
  category: string;
  category_color: string | null;
  subtitle: string;
  about: string;
  duration: string;
  location: string;
  address: string | null;
  course_date: Date | string | null;
  expectations: string[] | string;
  donation_text: string;
  status: CourseStatus;
  created_at: string;
  updated_at: string;
};

function programmeCatalogFromFile(): Course[] {
  return programmes.map(programmeToCourse);
}

export async function getPublishedCourses(): Promise<Course[]> {
  if (!hasDatabase) {
    return programmeCatalogFromFile();
  }

  const strict = strictDatabaseCatalog();

  try {
    await ensureDatabaseReady();
    const result = await sql<CourseRow>`
      SELECT
        c.*,
        u.name AS coach_name,
        u.first_name AS coach_first_name,
        u.last_name AS coach_last_name,
        u.bio AS coach_bio,
        u.photo_url AS coach_photo_url
      FROM courses c
      INNER JOIN admin_users u ON u.id = c.coach_id
      WHERE c.status = 'published'
        AND u.status != 'blocked'
      ORDER BY c.course_date ASC NULLS LAST, c.created_at ASC
    `;
    const rows = result.rows.map(mapCourseRow);
    if (rows.length > 0) {
      return rows;
    }
    if (strict) {
      return [];
    }
    const publishedExists = await sql<{ x: number }>`
      SELECT 1 AS x FROM courses WHERE status = 'published' LIMIT 1
    `;
    if (publishedExists.rows[0]) {
      return [];
    }
    return programmeCatalogFromFile();
  } catch (err) {
    if (!strict) {
      console.error("[getPublishedCourses] DB-Fehler, statischer Katalog:", err);
      return programmeCatalogFromFile();
    }
    return [];
  }
}

export async function getPublicCourse(slug: string): Promise<Course | null> {
  if (!hasDatabase) {
    const programme = getProgrammeBySlug(slug);
    return programme ? programmeToCourse(programme) : null;
  }

  const strict = strictDatabaseCatalog();

  try {
    await ensureDatabaseReady();
    const result = await sql<CourseRow>`
      SELECT
        c.*,
        u.name AS coach_name,
        u.first_name AS coach_first_name,
        u.last_name AS coach_last_name,
        u.bio AS coach_bio,
        u.photo_url AS coach_photo_url
      FROM courses c
      INNER JOIN admin_users u ON u.id = c.coach_id
      WHERE c.slug = ${slug}
        AND c.status = 'published'
        AND u.status != 'blocked'
      LIMIT 1
    `;
    const row = result.rows[0];
    if (row) {
      return mapCourseRow(row);
    }

    if (!strict) {
      const blockedInDb = await sql<{ slug: string }>`
        SELECT c.slug
        FROM courses c
        INNER JOIN admin_users u ON u.id = c.coach_id
        WHERE c.slug = ${slug}
          AND c.status = 'published'
          AND u.status = 'blocked'
        LIMIT 1
      `;
      if (blockedInDb.rows[0]) {
        return null;
      }
    }
  } catch (err) {
    if (strict) {
      return null;
    }
    console.error("[getPublicCourse] DB-Fehler:", err);
  }

  if (strict) {
    return null;
  }

  const programme = getProgrammeBySlug(slug);
  return programme ? programmeToCourse(programme) : null;
}

/** Nur Kurse, die öffentlich sichtbar und anmeldbar sind (published, Coach nicht blockiert). */
export type PublicCourseRegistrationTarget = {
  id: string;
  title: string;
  slug: string;
  location: string;
  courseDate: string | null;
  coachEmail: string;
  coachName: string;
};

export async function getPublicCourseRegistrationTarget(
  slug: string,
): Promise<PublicCourseRegistrationTarget | null> {
  if (!hasDatabase) {
    return null;
  }

  await ensureDatabaseReady();
  const result = await sql<{
    id: string;
    title: string;
    slug: string;
    location: string;
    course_date: Date | string | null;
    coach_email: string;
    coach_name: string | null;
  }>`
    SELECT
      c.id,
      c.title,
      c.slug,
      c.location,
      c.course_date,
      u.email AS coach_email,
      u.name AS coach_name
    FROM courses c
    INNER JOIN admin_users u ON u.id = c.coach_id
    WHERE c.slug = ${slug}
      AND c.status = 'published'
      AND u.status != 'blocked'
    LIMIT 1
  `;

  const row = result.rows[0];
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    location: row.location,
    courseDate: normalizeDate(row.course_date),
    coachEmail: row.coach_email,
    coachName: row.coach_name ?? "",
  };
}

export async function getCoursesForUser(userId: string, isAdmin: boolean) {
  await ensureDatabaseReady();

  const result = isAdmin
    ? await sql<CourseRow>`
        SELECT
          c.*,
          u.name AS coach_name,
          u.first_name AS coach_first_name,
          u.last_name AS coach_last_name,
          u.bio AS coach_bio,
          u.photo_url AS coach_photo_url
        FROM courses c
        JOIN admin_users u ON u.id = c.coach_id
        ORDER BY c.course_date ASC NULLS LAST, c.updated_at DESC
      `
    : await sql<CourseRow>`
        SELECT
          c.*,
          u.name AS coach_name,
          u.first_name AS coach_first_name,
          u.last_name AS coach_last_name,
          u.bio AS coach_bio,
          u.photo_url AS coach_photo_url
        FROM courses c
        JOIN admin_users u ON u.id = c.coach_id
        WHERE c.coach_id = ${userId}
        ORDER BY c.course_date ASC NULLS LAST, c.updated_at DESC
      `;

  return result.rows.map(mapCourseRow);
}

export async function getCourseForEditing(id: string) {
  await ensureDatabaseReady();
  const result = await sql<CourseRow>`
    SELECT
      c.*,
      u.name AS coach_name,
      u.first_name AS coach_first_name,
      u.last_name AS coach_last_name,
      u.bio AS coach_bio,
      u.photo_url AS coach_photo_url
    FROM courses c
    JOIN admin_users u ON u.id = c.coach_id
    WHERE c.id = ${id}
    LIMIT 1
  `;

  return result.rows[0] ? mapCourseRow(result.rows[0]) : null;
}

export async function getCourseRegistrations(courseId: string) {
  await ensureDatabaseReady();
  const result = await sql<{
    id: string;
    course_id: string;
    course_title: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    message: string | null;
    created_at: string;
  }>`
    SELECT
      r.*,
      c.title AS course_title
    FROM course_registrations r
    JOIN courses c ON c.id = r.course_id
    WHERE r.course_id = ${courseId}
    ORDER BY r.created_at DESC
  `;

  return result.rows.map(
    (row): CourseRegistration => ({
      id: row.id,
      courseId: row.course_id,
      courseTitle: row.course_title,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      phone: row.phone,
      message: row.message,
      createdAt: row.created_at,
    }),
  );
}

export async function getCustomerRecords(): Promise<CustomerRecord[]> {
  if (!hasDatabase) {
    return [];
  }

  await ensureDatabaseReady();
  const result = await sql<{
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    message: string | null;
    created_at: Date | string;
    course_title: string;
  }>`
    SELECT
      r.first_name,
      r.last_name,
      r.email,
      r.phone,
      r.message,
      r.created_at,
      c.title AS course_title
    FROM course_registrations r
    JOIN courses c ON c.id = r.course_id
    ORDER BY r.created_at DESC
  `;

  const byEmail = new Map<string, CustomerRecord>();
  for (const row of result.rows) {
    const key = row.email.toLowerCase();
    const createdAt = normalizeDate(row.created_at) ?? new Date(0).toISOString();
    const existing = byEmail.get(key);
    if (!existing) {
      byEmail.set(key, {
        email: row.email,
        firstName: row.first_name,
        lastName: row.last_name,
        phone: row.phone,
        registrationCount: 1,
        lastRegistrationAt: createdAt,
        courses: [row.course_title],
        latestMessage: row.message,
      });
      continue;
    }

    existing.registrationCount += 1;
    if (!existing.phone && row.phone) {
      existing.phone = row.phone;
    }
    if (!existing.courses.includes(row.course_title)) {
      existing.courses.push(row.course_title);
    }
    if (!existing.latestMessage && row.message) {
      existing.latestMessage = row.message;
    }
  }

  return Array.from(byEmail.values()).sort(
    (a, b) =>
      new Date(b.lastRegistrationAt).getTime() - new Date(a.lastRegistrationAt).getTime(),
  );
}

function programmeToCourse(programme: (typeof programmes)[number]): Course {
  return {
    id: programme.slug,
    coachId: programme.slug.includes("andreas") ? "andreas-zettel" : "demo",
    coachName: programme.coachName,
    coachFirstName: programme.coachName.split(" ")[0] || null,
    coachLastName: programme.coachName.split(" ").slice(1).join(" ") || null,
    coachBio: programme.coachName === "Andreas Zettel" ? "Friedensträger. Begleiter. Mensch." : null,
    coachPhotoUrl: programme.coachName === "Andreas Zettel" ? "/andreas-zettel.jpeg" : null,
    title: programme.name,
    slug: programme.slug,
    emoji: programme.emoji,
    category: programme.tag,
    categoryColor: programme.tagColor || null,
    subtitle: programme.description,
    about: programme.about,
    duration: programme.duration,
    location: programme.location,
    address: programme.address,
    courseDate: programme.courseDate,
    expectations: programme.expectations,
    donationText,
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function mapCourseRow(row: CourseRow): Course {
  const expectations =
    typeof row.expectations === "string"
      ? (JSON.parse(row.expectations) as string[])
      : row.expectations;

  return {
    id: row.id,
    coachId: row.coach_id,
    coachName: row.coach_name ?? "EIRENIA",
    coachFirstName: row.coach_first_name,
    coachLastName: row.coach_last_name,
    coachBio: row.coach_bio,
    coachPhotoUrl: row.coach_photo_url,
    title: row.title,
    slug: row.slug,
    emoji: row.emoji,
    category: row.category,
    categoryColor: row.category_color,
    subtitle: row.subtitle,
    about: row.about,
    duration: row.duration,
    location: row.location,
    address: row.address || row.location,
    courseDate: normalizeDate(row.course_date),
    expectations,
    donationText: row.donation_text,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function normalizeDate(value: Date | string | null) {
  if (!value) {
    return null;
  }

  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}
