export function formatCourseDate(value: string | null) {
  if (!value) {
    return "Termin folgt";
  }

  return new Intl.DateTimeFormat("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatCourseDay(value: string | null) {
  if (!value) {
    return "Offen";
  }

  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}

/** Chip-Text für Kalenderfilter; `isoKey` ist YYYY-MM-DD wie bei `toISOString().slice(0, 10)`. */
export function formatDateKeyChip(isoKey: string) {
  const parts = isoKey.split("-");
  if (parts.length !== 3) {
    return { weekday: "?", dayMonth: isoKey };
  }

  const y = Number(parts[0]);
  const mo = Number(parts[1]);
  const d = Number(parts[2]);
  if (!y || !mo || !d) {
    return { weekday: "?", dayMonth: isoKey };
  }

  const utc = new Date(Date.UTC(y, mo - 1, d));
  let weekday = new Intl.DateTimeFormat("de-DE", {
    weekday: "short",
    timeZone: "UTC",
  }).format(utc);
  weekday = weekday.replace(/\.$/, "");

  return { weekday, dayMonth: `${d}.${mo}.` };
}

export function toDateTimeLocal(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);

  return local.toISOString().slice(0, 16);
}
