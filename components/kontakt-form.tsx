"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitPublicInquiryAction } from "@/app/contact-actions";
import { SendIcon } from "./icons/send-icon";

const initialState = { ok: false, error: null };

function KontaktSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bform"
      disabled={pending}
      style={pending ? { background: "#2A3E4F" } : undefined}
    >
      {!pending && <SendIcon />}
      {pending ? "Wird gesendet …" : "Jetzt Verbindung spüren"}
    </button>
  );
}

export function KontaktForm() {
  const [state, formAction] = useActionState(submitPublicInquiryAction, initialState);

  return (
    <form className="kcard" action={formAction} noValidate>
      <input type="hidden" name="source" value="kontakt" />
      {state.error ? (
        <p className="form-inline-error" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="form-inline-success" role="status">
          Danke, deine Nachricht wurde gesendet. Wir melden uns bei dir.
        </p>
      ) : null}
      <div className="fr">
        <div className="fg">
          <label htmlFor="k-name">
            Dein Name{" "}
            <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>
          </label>
          <input id="k-name" name="name" type="text" placeholder="Wie heißt du?" />
        </div>
        <div className="fg">
          <label htmlFor="k-email">
            E-Mail{" "}
            <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>
          </label>
          <input id="k-email" name="email" type="email" placeholder="deine@email.de" />
        </div>
      </div>
      <div className="fg">
        <label htmlFor="k-phone">
          Telefon{" "}
          <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>{" "}
          <span style={{ color: "var(--ts)", fontWeight: 300, fontSize: "0.78rem" }}>
            – für Rückfragen
          </span>
        </label>
        <input
          id="k-phone"
          name="phone"
          type="tel"
          placeholder="z. B. +49 151 23456789"
        />
      </div>
      <div className="fg">
        <label htmlFor="k-msg">
          Deine Nachricht{" "}
          <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>
        </label>
        <textarea
          id="k-msg"
          name="message"
          style={{ height: 140 }}
          placeholder="Was möchtest du mit uns teilen?"
        />
      </div>
      <KontaktSubmitButton />
    </form>
  );
}
