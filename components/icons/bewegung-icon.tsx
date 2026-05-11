export function BewegungGlyph() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden
      style={{ display: "block", margin: "0 auto 1.5rem" }}
    >
      <circle
        cx="22"
        cy="22"
        r="19"
        stroke="rgba(201,168,76,0.5)"
        strokeWidth="1.2"
      />
      <ellipse
        cx="22"
        cy="22"
        rx="10"
        ry="19"
        stroke="rgba(201,168,76,0.3)"
        strokeWidth="0.8"
      />
      <line
        x1="3"
        y1="22"
        x2="41"
        y2="22"
        stroke="rgba(201,168,76,0.3)"
        strokeWidth="0.8"
      />
      <line
        x1="3"
        y1="14"
        x2="41"
        y2="14"
        stroke="rgba(201,168,76,0.2)"
        strokeWidth="0.6"
      />
      <line
        x1="3"
        y1="30"
        x2="41"
        y2="30"
        stroke="rgba(201,168,76,0.2)"
        strokeWidth="0.6"
      />
    </svg>
  );
}

export function BewegungRings() {
  return (
    <svg
      className="bcirc"
      viewBox="0 0 1200 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <circle cx="920" cy="300" r="260" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
      <circle cx="920" cy="300" r="180" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
      <circle cx="920" cy="300" r="100" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
    </svg>
  );
}
