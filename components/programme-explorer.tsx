"use client";

import { useMemo, useRef, useState } from "react";
import type { Course } from "@/lib/db/types";
import { formatCourseDate, formatDateKeyChip } from "@/lib/date-format";
import { OsmMap } from "@/components/osm-map";

type ProgrammeExplorerProps = {
  courses: Course[];
};

export function ProgrammeExplorer({ courses }: ProgrammeExplorerProps) {
  const [selectedDate, setSelectedDate] = useState("all");
  const [locationQuery, setLocationQuery] = useState("");
  const mapSectionRef = useRef<HTMLDivElement>(null);

  const mapNeedle = locationQuery.trim();
  const mapActive = mapNeedle.length >= 2;

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
    if (mapNeedle.length >= 2) {
      next.add(mapNeedle);
    }
    for (const course of visibleCourses) {
      const line = (course.address || course.location || "").trim();
      if (line) {
        next.add(line);
      }
    }
    return Array.from(next);
  }, [mapNeedle, visibleCourses]);

  function scrollMapIntoView() {
    mapSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function resetLocation() {
    setLocationQuery("");
  }

  return (
    <>
      <div className="programme-tools programme-tools--minimal">
        <div className="programme-calendar">
          <div className="programme-tool-head programme-tool-head--minimal">
            <span>Kalender</span>
          </div>
          <div className="calendar-strip calendar-strip--dates" role="group" aria-label="Termin filtern">
            <button
              type="button"
              className={selectedDate === "all" ? "active" : undefined}
              onClick={() => setSelectedDate("all")}
              aria-label="Alle Termine anzeigen"
              title="Alle Termine"
            >
              <span className="calendar-chip__all-top">Alle</span>
              <span className="calendar-chip__all-sub">Termine</span>
            </button>
            {dateOptions.map(({ key, course }) => {
              const { weekday, dayMonth } = formatDateKeyChip(key);
              return (
                <button
                  type="button"
                  key={key}
                  className={selectedDate === key ? "active" : undefined}
                  onClick={() => setSelectedDate(key)}
                  aria-label={`Termin ${formatCourseDate(course.courseDate)}`}
                  title={formatCourseDate(course.courseDate)}
                >
                  <span className="calendar-chip__wd">{weekday}</span>
                  <span className="calendar-chip__dm">{dayMonth}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="programme-radar">
          <div className="programme-tool-head programme-tool-head--minimal">
            <span>Ortssuche</span>
          </div>
          <div
            className={`location-search location-search--compact${locationQuery.trim().length === 0 ? " location-search--no-reset" : ""}`.trim()}
          >
            <input
              value={locationQuery}
              onChange={(event) => setLocationQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  if (locationQuery.trim().length >= 2) {
                    scrollMapIntoView();
                  }
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
              onClick={() => {
                if (locationQuery.trim().length >= 2) {
                  scrollMapIntoView();
                }
              }}
              disabled={locationQuery.trim().length < 2}
              aria-label="Zur Karte springen"
            >
              ◎
            </button>
            {(locationQuery.trim().length > 0) && (
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
                  className={locationQuery.trim() === address ? "active" : undefined}
                  onClick={() => {
                    setLocationQuery(address);
                    requestAnimationFrame(() => scrollMapIntoView());
                  }}
                  aria-label={address}
                  title={address}
                />
              ))}
            </div>
          )}
          {mapActive && mapPlaces.length > 0 && (
            <div ref={mapSectionRef} className="map-frame map-frame--revealed">
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
