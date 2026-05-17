"use client";

import { FormEvent, useState } from "react";
import { SendIcon } from "./icons/send-icon";

export function CoachingInquiryForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const first = String(fd.get("firstName") || "").trim();
    const last = String(fd.get("lastName") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const msg = String(fd.get("message") || "").trim();
    if (!first || !last || !email || !phone || msg.length < 3) {
      setError(true);
      return;
    }
    setError(false);
    setSent(true);
  }

  return (
    <form className="kcard" onSubmit={onSubmit} noValidate>
      {error ? (
        <p className="form-inline-error" role="alert">
          Bitte fülle alle Pflichtfelder aus und beschreibe kurz dein Anliegen (mindestens
          ein paar Worte).
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
      <button
        type="submit"
        className="bform"
        disabled={sent}
        style={
          sent
            ? { background: "#C9A84C" }
            : { background: "var(--ocean)", border: "none" }
        }
      >
        {!sent && <SendIcon />}
        {sent
          ? "✓ Anfrage gesendet – Andreas meldet sich bei dir!"
          : "1:1 Coaching anfragen"}
      </button>
    </form>
  );
}
