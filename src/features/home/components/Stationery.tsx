/** A small perforated postage stamp in the postcard palette. Decorative. */
export function StampMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 96" aria-hidden="true" className={`drop-shadow-sm ${className}`}>
      <defs>
        <mask id="perf">
          <rect width="80" height="96" fill="white" />
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i}>
              <circle cx={4 + i * 9} cy="0" r="2.6" fill="black" />
              <circle cx={4 + i * 9} cy="96" r="2.6" fill="black" />
            </g>
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <g key={`v${i}`}>
              <circle cx="0" cy={4 + i * 9} r="2.6" fill="black" />
              <circle cx="80" cy={4 + i * 9} r="2.6" fill="black" />
            </g>
          ))}
        </mask>
      </defs>
      <rect width="80" height="96" fill="#fff" mask="url(#perf)" />
      <rect x="8" y="8" width="64" height="80" fill="#e7b89c" />
      <circle cx="52" cy="30" r="10" fill="#f3db95" />
      <path d="M8 66 C24 56 44 58 72 64 V88 H8Z" fill="#697190" />
      <path d="M16 62 Q40 70 64 62 L56 54 H24Z" fill="#1d2335" />
      <rect x="25" y="62" width="30" height="10" fill="#fff5f0" />
      <text x="40" y="84" textAnchor="middle" fontSize="6.5" fontWeight="700" letterSpacing="1.5" fill="#fff" fontFamily="var(--font-sans)">
        KOREA
      </text>
    </svg>
  );
}
