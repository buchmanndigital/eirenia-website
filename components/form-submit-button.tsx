"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { SendIcon } from "./icons/send-icon";

type Variant = "gold" | "ocean" | "goldAfter";

const sentStyles: Record<Variant, { bg: string; label: string }> = {
  gold: {
    bg: "#2A3E4F",
    label: "✓ Gesendet – wir freuen uns auf die Begegnung!",
  },
  ocean: {
    bg: "#2A3E4F",
    label: "✓ Gesendet – wir melden uns bei dir!",
  },
  goldAfter: {
    bg: "#C9A84C",
    label: "✓ Anfrage gesendet – Andreas meldet sich bei dir!",
  },
};

type FormSubmitButtonProps = {
  variant: Variant;
  children: ReactNode;
  className?: string;
  idleStyle?: CSSProperties;
};

export function FormSubmitButton({
  variant,
  children,
  className = "bform",
  idleStyle,
}: FormSubmitButtonProps) {
  const [sent, setSent] = useState(false);

  return (
    <button
      type="button"
      className={className}
      disabled={sent}
      style={
        sent
          ? { background: sentStyles[variant].bg }
          : idleStyle
      }
      onClick={() => setSent(true)}
    >
      {!sent && <SendIcon />}
      {sent ? sentStyles[variant].label : children}
    </button>
  );
}
