import Link from "next/link";
import { notFound } from "next/navigation";
import { OsmMap } from "@/components/osm-map";
import { getPublicCourse } from "@/lib/db/courses";
import { formatCourseDate } from "@/lib/date-format";
import { registerForCourseAction } from "./actions";

export const dynamic = "force-dynamic";

type ProgrammeDetailPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sent?: string; error?: string }>;
};

export default async function ProgrammeDetailPage({
  params,
  searchParams,
}: ProgrammeDetailPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const course = await getPublicCourse(slug);

  if (!course) {
    notFound();
  }

  const courseMapPlaces = Array.from(
    new Set(
      [course.address, course.location]
        .map((s) => (typeof s === "string" ? s.trim() : ""))
        .filter((s) => s.length >= 2),
    ),
  );

  return (
    <main className="course-page">
      <Link href="/#programme" className="course-back">
        ← Zurück zu Kurse & Programme
      </Link>
      <section className="course-hero">
        <span className="course-emoji">{course.emoji}</span>
        <h1>{course.title}</h1>
        <p>{course.subtitle}</p>
      </section>

      <section className="course-detail-grid">
        <div className="course-detail-left">
          <article className="course-card">
            <h2>Über dieses Programm</h2>
            <p>{course.about}</p>
          </article>

          <article className="course-card">
            <h2>Was dich erwartet</h2>
            <ul className="course-list">
              {course.expectations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <div className="course-facts">
            <div className="course-fact">
              <span>✧</span>
              <div>
                <strong>Termin</strong>
                <p>{formatCourseDate(course.courseDate)}</p>
              </div>
            </div>
            <div className="course-fact">
              <span>◷</span>
              <div>
                <strong>Dauer</strong>
                <p>{course.duration}</p>
              </div>
            </div>
            <div className="course-fact">
              <span>⌂</span>
              <div>
                <strong>Ort</strong>
                <p>{course.location}</p>
                <small>{course.address}</small>
              </div>
            </div>
            <div className="course-fact">
              <span>♙</span>
              <div>
                <strong>Begleitung</strong>
                <p>{course.coachName}</p>
              </div>
            </div>
          </div>

          <article className="course-donation">
            <span>♡</span>
            <div>
              <strong>🌿 Herzensöffnung mit Freude</strong>
              <p>{course.donationText}</p>
            </div>
          </article>

          <article className="course-map-card">
            <div>
              <span className="admin-eyebrow">Anreise</span>
              <h2>Hier findet dein Kreis statt</h2>
              <p>{course.address}</p>
            </div>
            {courseMapPlaces.length > 0 ? (
              <OsmMap
                places={courseMapPlaces}
                title={`Karte ${course.title}`}
                className="osm-map--detail"
              />
            ) : null}
          </article>
        </div>

        <aside className="course-register-card">
          <div className="course-register-head">
            <span>{course.emoji}</span>
            <h2>Ich möchte dabei sein</h2>
            <p>Melde dich jetzt für dieses Programm an</p>
          </div>
          {query.error === "missing" ? (
            <div className="admin-alert" role="alert">
              Dieses Programm ist gerade nicht verfügbar oder die Anmeldung wurde geschlossen. Bitte
              kehre zu den{" "}
              <Link href="/#programme" className="admin-link">
                Kursen & Programmen
              </Link>{" "}
              zurück.
            </div>
          ) : query.sent ? (
            <div className="admin-success">
              Danke für deine Anmeldung. Wir melden uns zeitnah bei dir.
            </div>
          ) : (
            <form action={registerForCourseAction} className="course-form">
              <input type="hidden" name="slug" value={course.slug} />
              <div className="course-form-row">
                <label>
                  Vorname *
                  <input name="firstName" placeholder="Dein Vorname" required />
                </label>
                <label>
                  Nachname *
                  <input name="lastName" placeholder="Dein Nachname" required />
                </label>
              </div>
              <label>
                E-Mail *
                <input name="email" type="email" placeholder="deine@email.de" required />
              </label>
              <label>
                Telefon <span>(optional)</span>
                <input name="phone" type="tel" placeholder="Deine Telefonnummer" />
              </label>
              <label>
                Deine Nachricht
                <textarea name="message" placeholder="Was möchtest du mitteilen oder fragen?" />
              </label>
              <label className="course-check">
                <input name="terms" type="checkbox" required />
                <span>
                  Ich habe die Allgemeinen Geschäftsbedingungen gelesen und stimme
                  ihnen zu. *
                </span>
              </label>
              <button type="submit" className="course-submit">
                ✧ Jetzt anmelden
              </button>
            </form>
          )}
        </aside>
      </section>
    </main>
  );
}
