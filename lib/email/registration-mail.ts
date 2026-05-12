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

function createSmtpTransport() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number.parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !user || !pass || Number.isNaN(port)) {
    return null;
  }

  const secure =
    process.env.SMTP_SECURE === "1" || process.env.SMTP_SECURE === "true" || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 25_000,
    greetingTimeout: 25_000,
    socketTimeout: 25_000,
  });
}

function fromAddress() {
  return process.env.EMAIL_FROM?.trim() || process.env.SMTP_USER || "noreply@localhost";
}

export async function sendRegistrationEmails(payload: RegistrationMailPayload) {
  const transport = createSmtpTransport();
  if (!transport) {
    const missing = [
      !process.env.SMTP_HOST?.trim() && "SMTP_HOST",
      !process.env.SMTP_USER?.trim() && "SMTP_USER",
      !process.env.SMTP_PASS?.trim() && "SMTP_PASS",
    ].filter(Boolean);
    console.warn(
      "[registration-mail] SMTP nicht vollständig konfiguriert. Fehlt evtl.:",
      missing.join(", ") || "Port ungültig",
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

  await transport.sendMail({
    from,
    to: payload.participantEmail,
    subject: `Anmeldung: ${payload.courseTitle}`,
    text: participantText,
  });

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

  await transport.sendMail({
    from,
    to: payload.coachEmail,
    subject: `[EIRENIA] Neue Anmeldung: ${payload.courseTitle}`,
    text: coachText,
  });
}
