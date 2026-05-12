import nodemailer from "nodemailer";
import { formatCourseDate } from "@/lib/date-format";

export type RegistrationMailPayload = {
  participantEmail: string;
  participantFirstName: string;
  participantLastName: string;
  participantPhone: string | null;
  participantMessage: string | null;
  courseTitle: string;
  courseSlug: string;
  courseDateIso: string | null;
  courseLocation: string;
  coachEmail: string;
  coachName: string;
};

function siteOrigin() {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (base) {
    return base;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "";
}

/** Ohne Geheimnisse – für Logs auf Vercel. */
export function smtpEnvSummary() {
  const host = process.env.SMTP_HOST?.trim();
  const port = process.env.SMTP_PORT?.trim() || "465";
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  return {
    host: host || null,
    port,
    userSet: Boolean(user),
    passSet: Boolean(pass && String(pass).trim().length > 0),
    vercel: Boolean(process.env.VERCEL),
  };
}

function createSmtpTransport() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number.parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !user || !pass || Number.isNaN(port)) {
    return null;
  }

  const explicit = process.env.SMTP_SECURE?.trim().toLowerCase();
  let secure: boolean;
  if (explicit === "0" || explicit === "false") {
    secure = false;
  } else if (explicit === "1" || explicit === "true") {
    secure = true;
  } else {
    secure = port === 465;
  }

  const debug = process.env.SMTP_DEBUG === "1";

  const base = {
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 30_000,
    greetingTimeout: 30_000,
    socketTimeout: 30_000,
    tls: {
      minVersion: "TLSv1.2" as const,
      servername: host,
    },
    debug,
  };

  if (!secure && (port === 587 || port === 2587)) {
    return nodemailer.createTransport({
      ...base,
      requireTLS: true,
    });
  }

  return nodemailer.createTransport(base);
}

function smtpErrorDetails(err: unknown) {
  if (err && typeof err === "object") {
    const o = err as Record<string, unknown>;
    return {
      message: typeof o.message === "string" ? o.message : String(err),
      code: typeof o.code === "string" ? o.code : undefined,
      response: typeof o.response === "string" ? o.response : undefined,
      responseCode:
        typeof o.responseCode === "number" ? o.responseCode : undefined,
    };
  }
  return { message: String(err) };
}

function fromAddress() {
  return process.env.EMAIL_FROM?.trim() || process.env.SMTP_USER || "noreply@localhost";
}

export async function sendRegistrationEmails(payload: RegistrationMailPayload) {
  if (process.env.VERCEL && !process.env.SMTP_HOST?.trim()) {
    console.warn(
      "[registration-mail] Auf Vercel fehlt SMTP_HOST. .env.local wird nicht deployed – bitte in Vercel unter Environment Variables eintragen (Production).",
    );
  }

  const transport = createSmtpTransport();
  if (!transport) {
    const missing = [
      !process.env.SMTP_HOST?.trim() && "SMTP_HOST",
      !process.env.SMTP_USER?.trim() && "SMTP_USER",
      !process.env.SMTP_PASS?.trim() && "SMTP_PASS",
    ].filter(Boolean);
    console.warn(
      "[registration-mail] SMTP nicht vollständig. Fehlt evtl.:",
      missing.join(", ") || "Port ungültig",
      "| Zusammenfassung:",
      JSON.stringify(smtpEnvSummary()),
    );
    return;
  }

  const from = fromAddress();
  const dateLine = formatCourseDate(payload.courseDateIso);
  const origin = siteOrigin();
  const programmeLink = origin ? `${origin}/programme/${payload.courseSlug}` : "";

  const participantText = [
    `Hallo ${payload.participantFirstName},`,
    "",
    `vielen Dank für deine Anmeldung zu „${payload.courseTitle}“.`,
    "",
    `Termin: ${dateLine}`,
    `Ort: ${payload.courseLocation}`,
    programmeLink ? `Programmseite: ${programmeLink}` : "",
    "",
    "Wir melden uns bei dir, sobald es Neuigkeiten gibt.",
    "",
    "Herzliche Grüße",
    "EIRENIA",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await transport.sendMail({
      from,
      to: payload.participantEmail,
      subject: `Anmeldung: ${payload.courseTitle}`,
      text: participantText,
    });
  } catch (err) {
    console.error(
      "[registration-mail] Mail an Teilnehmer fehlgeschlagen:",
      smtpErrorDetails(err),
    );
    throw err;
  }

  const coachLines = [
    `Neue Anmeldung für „${payload.courseTitle}“`,
    "",
    `Teilnehmer:in: ${payload.participantFirstName} ${payload.participantLastName}`,
    `E-Mail: ${payload.participantEmail}`,
    payload.participantPhone ? `Telefon: ${payload.participantPhone}` : "",
    `Termin: ${dateLine}`,
    `Ort: ${payload.courseLocation}`,
    payload.participantMessage ? `Nachricht:\n${payload.participantMessage}` : "",
  ].filter(Boolean);

  const coachText = [...coachLines, "", `Coach zugeordnet: ${payload.coachName || "—"}`].join("\n");

  try {
    await transport.sendMail({
      from,
      to: payload.coachEmail,
      replyTo: payload.participantEmail,
      subject: `[EIRENIA] Neue Anmeldung: ${payload.courseTitle}`,
      text: coachText,
    });
  } catch (err) {
    console.error(
      "[registration-mail] Mail an Coach fehlgeschlagen:",
      smtpErrorDetails(err),
    );
    throw err;
  }

  console.info("[registration-mail] Beide Mails versendet.", JSON.stringify(smtpEnvSummary()));
}
