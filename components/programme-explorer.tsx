"use client";

import { useMemo, useState } from "react";
import type { Course } from "@/lib/db/types";
import { formatCourseDate, formatCourseDay } from "@/lib/date-format";
import { OsmMap } from "@/components/osm-map";

type ProgrammeExplorerProps = {
  courses: Course[];
};

export function ProgrammeExplorer({ courses }: ProgrammeExplorerProps) {
  const [selectedDate, setSelectedDate] = useState("all");
  const [locationQuery, setLocationQuery] = useState("");
  /** Nur gesetztes, „bestätigtes“ Suchziel lädt die Karte (Enter, Suchen-Klick, Chip). */
  const [committedLocation, setCommittedLocation] = useState("");
  const mapActive = committedLocation.trim().length >= 2;

  const dateOptions = useMemo(() => {
    const seen = new Set<string>();
    return courses
      .filter((course) => course.courseDate)
      .map((course) => {
        const key = new Date(course.courseDate as string).toISOString().slice(0, 10);
        return { key, course };
      })
      .filter(({ key }) => {
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
        return true;
      })
      .slice(0, 6);
  }, [courses]);

  const locationOptions = useMemo(() => {
    const seen = new Set<string>();
    return courses
      .map((course) => course.address)
      .filter((address) => {
        if (!address || seen.has(address)) {
          return false;
        }
        seen.add(address);
        return true;
      });
  }, [courses]);

  const visibleCourses = useMemo(() => {
    const locationNeedle = locationQuery.trim().toLowerCase();

    return courses.filter((course) => {
      const courseDay = course.courseDate
        ? new Date(course.courseDate).toISOString().slice(0, 10)
        : "";
      const matchesDate = selectedDate === "all" || courseDay === selectedDate;
      const haystack = `${course.location ?? ""} ${course.address ?? ""}`
        .toLowerCase()
        .replace(/\s+/g, " ");
      const matchesLocation =
        locationNeedle.length === 0 || haystack.includes(locationNeedle);

      return matchesDate && matchesLocation;
    });
  }, [courses, selectedDate, locationQuery]);

  const mapPlaces = useMemo(() => {
    const next = new Set<string>();
    const committed = committedLocation.trim();
    if (committed.length >= 2) {
      next.add(committed);
    }
    for (const course of visibleCourses) {
      const line = (course.address || course.location || "").trim();
      if (line) {
        next.add(line);
      }
    }
    return Array.from(next);
  }, [committedLocation, visibleCourses]);

  function commitSearch() {
    const q = locationQuery.trim();
    if (q.length >= 2) {
      setCommittedLocation(q);
    }
  }

  function resetLocation() {
    setLocationQuery("");
    setCommittedLocation("");
  }

  return (
    <>
      <div className="programme-tools programme-tools--minimal">
        <div className="programme-calendar">
          <div className="programme-tool-head programme-tool-head--minimal">
            <span>Kalender</span>
          </div>
          <div className="calendar-strip calendar-strip--dots" role="group" aria-label="Termin filtern">
            <button
              type="button"
              className={selectedDate === "all" ? "active" : undefined}
              onClick={() => setSelectedDate("all")}
              aria-label="Alle Termine anzeigen"
              title="Alle Termine"
            />
            {dateOptions.map(({ key, course }) => (
              <button
                type="button"
                key={key}
                className={selectedDate === key ? "active" : undefined}
                onClick={() => setSelectedDate(key)}
                aria-label={`Termin ${formatCourseDay(course.courseDate)}`}
                title={formatCourseDate(course.courseDate)}
              />
            ))}
          </div>
        </div>

        <div className="programme-radar">
          <div className="programme-tool-head programme-tool-head--minimal">
            <span>Ortssuche</span>
          </div>
          <div
            className={`location-search location-search--compact${locationQuery.trim().length === 0 && committedLocation.length === 0 ? " location-search--no-reset" : ""}`.trim()}
          >
            <input
              value={locationQuery}
              onChange={(event) => setLocationQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  commitSearch();
                }
              }}
              placeholder="Ort …"
              aria-label="Ort oder Adresse suchen"
              name="eirenia-programme-ort"
              autoComplete="off"
            />
            <button
              type="button"
              className="location-search-commit"
              onClick={() => commitSearch()}
              disabled={locationQuery.trim().length < 2}
              aria-label="Suche ausführen und Karte anzeigen"
            >
              ◎
            </button>
            {(locationQuery.trim().length > 0 || committedLocation.length > 0) && (
              <button
                type="button"
                className="location-search-reset"
                onClick={() => resetLocation()}
                aria-label="Filter zurücksetzen"
              >
                ×
              </button>
            )}
          </div>
          {locationOptions.length > 0 && (
            <div className="location-chips location-chips--dots" role="group" aria-label="Bekannte Orte">
              {locationOptions.map((address) => (
                <button
                  type="button"
                  key={address}
                  className={committedLocation === address ? "active" : undefined}
                  onClick={() => {
                    setLocationQuery(address);
                    setCommittedLocation(address);
                  }}
                  aria-label={address}
                  title={address}
                />
              ))}
            </div>
          )}
          {mapActive && mapPlaces.length > 0 && (
            <div className="map-frame map-frame--revealed">
              <OsmMap
                places={mapPlaces}
                title="Friedensradar Karte"
                className="osm-map--explorer"
              />
            </div>
          )}
        </div>
      </div>

      <div className="pgrid">
        {visibleCourses.map((course) => (
          <div key={course.slug} className="pc">
            <div className="course-card-topline">
              <div className="pci">{course.emoji}</div>
              <span>{formatCourseDate(course.courseDate)}</span>
            </div>
            <span className="pn">{course.title}</span>
            <span
              className="pt"
              style={course.categoryColor ? { color: course.categoryColor } : undefined}
            >
              {course.category}
            </span>
            <span className="pe">{course.subtitle}</span>
            <span className="course-card-place">{course.location}</span>
            <a href={`/programme/${course.slug}`} className="pl">
              Details ansehen →
            </a>
          </div>
        ))}
        {visibleCourses.length === 0 && (
          <p className="programme-empty">
            Für deine Auswahl gibt es aktuell keine veröffentlichten Kurse.
          </p>
        )}
      </div>
    </>
  );
}
