export function HeroCircle() {
  const ringLength = 2 * Math.PI * 60;

  return (
    <svg
      className="hero-logo-svg"
      width="130"
      height="130"
      viewBox="0 0 130 130"
      fill="none"
      aria-hidden
    >
      <circle
        className="hero-logo-ring"
        cx="65"
        cy="65"
        r="60"
        stroke="#C9A84C"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray={ringLength}
        strokeDashoffset={ringLength}
        transform="rotate(-90 65 65)"
      />
      <g className="hero-logo-dot-wrap">
        <circle className="hero-logo-dot" cx="65" cy="79" r="5.5" fill="#2A3E4F" />
      </g>
    </svg>
  );
}
