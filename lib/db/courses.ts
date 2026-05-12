import { getProgrammeBySlug, programmes } from "@/lib/programmes";
import { ensureDatabaseReady } from "./schema";
import { hasDatabase, sql } from "./connection";
import type { Course, CourseRegistration, CourseStatus } from "./types";

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
        u.name AS coach_name
      FROM courses c
      LEFT JOIN admin_users u ON u.id = c.coach_id
      WHERE c.status = 'published'
      ORDER BY c.course_date ASC NULLS LAST, c.created_at ASC
    `;
    const rows = result.rows.map(mapCourseRow);
    if (rows.length === 0 && !strict) {
      return programmeCatalogFromFile();
    }
    return rows;
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
        u.name AS coach_name
      FROM courses c
      LEFT JOIN admin_users u ON u.id = c.coach_id
      WHERE c.slug = ${slug} AND c.status = 'published'
      LIMIT 1
    `;
    const row = result.rows[0];
    if (row) {
      return mapCourseRow(row);
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

export async function getCoursesForUser(userId: string, isAdmin: boolean) {
  await ensureDatabaseReady();

  const result = isAdmin
    ? await sql<CourseRow>`
        SELECT c.*, u.name AS coach_name
        FROM courses c
        JOIN admin_users u ON u.id = c.coach_id
        ORDER BY c.course_date ASC NULLS LAST, c.updated_at DESC
      `
    : await sql<CourseRow>`
        SELECT c.*, u.name AS coach_name
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
    SELECT c.*, u.name AS coach_name
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

function programmeToCourse(programme: (typeof programmes)[number]): Course {
  return {
    id: programme.slug,
    coachId: programme.slug.includes("andreas") ? "andreas-zettel" : "demo",
    coachName: programme.coachName,
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
