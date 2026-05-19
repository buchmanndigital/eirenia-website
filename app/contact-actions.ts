"use server";

import crypto from "node:crypto";
import { revalidatePath } from "next/cache";
import { ensureDatabaseReady } from "@/lib/db/schema";
import { hasDatabase, sql } from "@/lib/db/connection";
import { sendContactInquiryEmail } from "@/lib/email/registration-mail";

type PublicInquirySource = "sternstunde" | "kontakt" | "coaching";

export type PublicInquiryState = {
  ok: boolean;
  error: string | null;
};

const sourceLabels: Record<PublicInquirySource, string> = {
  sternstunde: "Deine Sternstunde",
  kontakt: "Lass uns verbinden",
  coaching: "1:1 Coaching Anfrage",
};

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function parseSource(formData: FormData): PublicInquirySource | null {
  const source = value(formData, "source");
  if (source === "sternstunde" || source === "kontakt" || source === "coaching") {
    return source;
  }
  return null;
}

export async function submitPublicInquiryAction(
  _previousState: PublicInquiryState,
  formData: FormData,
): Promise<PublicInquiryState> {
  const source = parseSource(formData);
  const firstName =
    source === "coaching" ? value(formData, "firstName") : value(formData, "name");
  const lastName = source === "coaching" ? value(formData, "lastName") : "";
  const email = value(formData, "email").toLowerCase();
  const phone = value(formData, "phone");
  const message = value(formData, "message");

  if (!source || !firstName || (source === "coaching" && !lastName) || !email || !phone) {
    return { ok: false, error: "Bitte fülle alle Pflichtfelder aus." };
  }

  if (!email.includes("@") || message.length < 3) {
    return {
      ok: false,
      error: "Bitte prüfe deine E-Mail-Adresse und schreibe eine kurze Nachricht.",
    };
  }

  if (!hasDatabase) {
    console.error("[submitPublicInquiryAction] Keine Datenbank-Env geladen.");
    return {
      ok: false,
      error: "Die Anfrage konnte gerade nicht gespeichert werden. Bitte versuche es später erneut.",
    };
  }

  await ensureDatabaseReady();
  await sql`
    INSERT INTO contact_inquiries (
      id,
      source,
      first_name,
      last_name,
      email,
      phone,
      message
    ) VALUES (
      ${crypto.randomUUID()},
      ${source},
      ${firstName},
      ${lastName || null},
      ${email},
      ${phone},
      ${message}
    )
  `;

  try {
    await sendContactInquiryEmail({
      sourceLabel: sourceLabels[source],
      firstName,
      lastName: lastName || null,
      email,
      phone,
      message,
    });
  } catch (err) {
    console.error("[submitPublicInquiryAction] E-Mail fehlgeschlagen.", err);
    revalidatePath("/admin/crm");
    return {
      ok: false,
      error:
        "Deine Anfrage wurde gespeichert, aber die E-Mail konnte gerade nicht gesendet werden.",
    };
  }

  revalidatePath("/admin/crm");
  return { ok: true, error: null };
}
