export function PortraitPlaceholder() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden
      style={{ opacity: 0.3, position: "absolute" }}
    >
      <circle cx="40" cy="28" r="17" stroke="#C9A84C" strokeWidth="0.8" />
      <path
        d="M8 75 Q40 52 72 75"
        stroke="#C9A84C"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  );
}

export function PortraitBadge() {
  return (
    <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem" }}>
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden>
        <circle
          cx="27"
          cy="27"
          r="24"
          stroke="#C9A84C"
          strokeWidth="0.6"
          opacity="0.5"
        />
        <circle cx="27" cy="33" r="2.8" fill="#C9A84C" opacity="0.45" />
      </svg>
    </div>
  );
}
