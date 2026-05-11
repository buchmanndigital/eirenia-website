export function NavLogo({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 42 42" fill="none" aria-hidden>
      <circle cx="21" cy="21" r="19" stroke="#C9A84C" strokeWidth="0.9" />
      <circle cx="21" cy="27" r="2.8" fill="#2A3E4F" />
    </svg>
  );
}
