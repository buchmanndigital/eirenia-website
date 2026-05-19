"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitPublicInquiryAction } from "@/app/contact-actions";
import { SendIcon } from "./icons/send-icon";

const initialState = { ok: false, error: null };

function SternstundeSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bform"
      disabled={pending}
      style={pending ? { background: "#2A3E4F" } : undefined}
    >
      {!pending && <SendIcon />}
      {pending
        ? "Wird gesendet …"
        : "🌾 Buche deine Sternstunde – Dein erster Schritt zu dir"}
    </button>
  );
}

export function SternstundeForm() {
  const [state, formAction] = useActionState(submitPublicInquiryAction, initialState);

  return (
    <form className="sfw" action={formAction} noValidate>
      <input type="hidden" name="source" value="sternstunde" />
      {state.error ? (
        <p className="form-inline-error" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="form-inline-success" role="status">
          Danke, deine Anfrage wurde gesendet. Wir melden uns bei dir.
        </p>
      ) : null}
      <div className="fr">
        <div className="fg">
          <label htmlFor="ss-name">
            Dein Name <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>
          </label>
          <input id="ss-name" name="name" type="text" placeholder="Wie heißt du?" />
        </div>
        <div className="fg">
          <label htmlFor="ss-email">
            E-Mail <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>
          </label>
          <input id="ss-email" name="email" type="email" placeholder="deine@email.de" />
        </div>
      </div>
      <div className="fg">
        <label htmlFor="ss-phone">
          Telefon <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>
        </label>
        <input id="ss-phone" name="phone" type="tel" placeholder="Deine Telefonnummer" />
      </div>
      <div className="fg">
        <label htmlFor="ss-msg">
          Deine Nachricht <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>
        </label>
        <textarea
          id="ss-msg"
          name="message"
          placeholder="Was bewegt dich? Was suchst du?"
        />
      </div>
      <SternstundeSubmitButton />
    </form>
  );
}
