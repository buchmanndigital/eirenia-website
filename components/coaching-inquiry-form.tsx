"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitPublicInquiryAction } from "@/app/contact-actions";
import { SendIcon } from "./icons/send-icon";

const initialState = { ok: false, error: null };

function CoachingSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bform"
      disabled={pending}
      style={
        pending
          ? { background: "#C9A84C" }
          : { background: "var(--ocean)", border: "none" }
      }
    >
      {!pending && <SendIcon />}
      {pending ? "Wird gesendet …" : "1:1 Coaching anfragen"}
    </button>
  );
}

export function CoachingInquiryForm() {
  const [state, formAction] = useActionState(submitPublicInquiryAction, initialState);

  return (
    <form className="kcard" action={formAction} noValidate>
      <input type="hidden" name="source" value="coaching" />
      {state.error ? (
        <p className="form-inline-error" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="form-inline-success" role="status">
          Danke, deine Anfrage wurde gesendet. Andreas meldet sich bei dir.
        </p>
      ) : null}
      <div className="fr">
        <div className="fg">
          <label htmlFor="c-first">
            Vorname{" "}
            <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>
          </label>
          <input id="c-first" name="firstName" type="text" placeholder="Dein Vorname" />
        </div>
        <div className="fg">
          <label htmlFor="c-last">
            Nachname{" "}
            <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>
          </label>
          <input id="c-last" name="lastName" type="text" placeholder="Dein Nachname" />
        </div>
      </div>
      <div className="fr">
        <div className="fg">
          <label htmlFor="c-email">
            E-Mail{" "}
            <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>
          </label>
          <input id="c-email" name="email" type="email" placeholder="deine@email.de" />
        </div>
        <div className="fg">
          <label htmlFor="c-phone">
            Telefon{" "}
            <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>{" "}
            <span style={{ color: "var(--ts)", fontWeight: 300, fontSize: "0.78rem" }}>
              – damit Andreas dich direkt erreicht
            </span>
          </label>
          <input
            id="c-phone"
            name="phone"
            type="tel"
            placeholder="z.B. +49 151 23456789"
            style={{ borderColor: "rgba(201,168,76,0.5)" }}
          />
        </div>
      </div>
      <div className="fg">
        <label htmlFor="c-msg">
          Deine Nachricht{" "}
          <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>*</span>
        </label>
        <textarea
          id="c-msg"
          name="message"
          style={{ height: 160 }}
          placeholder="Was bewegt dich? Was erhoffst du dir vom Coaching?"
        />
      </div>
      <CoachingSubmitButton />
    </form>
  );
}
