"use client";

import { FormEvent, useState } from "react";
import { SendIcon } from "./icons/send-icon";

export function SternstundeForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const msg = String(fd.get("message") || "").trim();
    if (!name || !email || !phone || msg.length < 3) {
      setError(true);
      return;
    }
    setError(false);
    setSent(true);
  }

  return (
    <form className="sfw" onSubmit={onSubmit} noValidate>
      {error ? (
        <p className="form-inline-error" role="alert">
          Bitte Name, E-Mail und Telefon angeben und eine kurze Nachricht schreiben.
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
      <button
        type="submit"
        className="bform"
        disabled={sent}
        style={sent ? { background: "#2A3E4F" } : undefined}
      >
        {!sent && <SendIcon />}
        {sent
          ? "✓ Gesendet – wir freuen uns auf die Begegnung!"
          : "🌾 Buche deine Sternstunde – Dein erster Schritt zu dir"}
      </button>
    </form>
  );
}
