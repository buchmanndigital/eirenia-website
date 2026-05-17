"use client";

import { FormEvent, useState } from "react";
import { SendIcon } from "./icons/send-icon";

export function KontaktForm() {
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
    <form className="kcard" onSubmit={onSubmit} noValidate>
      {error ? (
        <p className="form-inline-error" role="alert">
          Bitte fülle alle Pflichtfelder aus und schreibe mindestens ein paar Worte in
          der Nachricht.
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
      <button
        type="submit"
        className="bform"
        disabled={sent}
        style={sent ? { background: "#2A3E4F" } : undefined}
      >
        {!sent && <SendIcon />}
        {sent ? "✓ Gesendet – wir melden uns bei dir!" : "Jetzt Verbindung spüren"}
      </button>
    </form>
  );
}
