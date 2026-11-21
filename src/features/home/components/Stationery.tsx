/** Paper envelope seen partly behind a postcard. Decorative. */
export function Envelope({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`overflow-hidden border border-line bg-[#fbf8f3] shadow-soft ${className}`}>
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="h-full w-full">
        <path d="M0 0 L50 34 L100 0" fill="none" stroke="#e7ded3" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        <path d="M0 60 L38 26 M100 60 L62 26" fill="none" stroke="#efe7dc" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

/** A small perforated postage stamp with a stylised roofline. Decorative. */
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
      <rect x="8" y="8" width="64" height="80" fill="#efd7d2" />
      <circle cx="54" cy="28" r="9" fill="#d7a39c" />
      <path d="M14 60 Q40 68 66 60 L58 52 H22Z" fill="#5e5752" />
      <rect x="24" y="60" width="32" height="12" fill="#f6ede4" />
      <path d="M8 76 H72" stroke="#aabbc7" strokeWidth="6" />
      <text x="40" y="86" textAnchor="middle" fontSize="6" letterSpacing="1.5" fill="#6e645c" fontFamily="var(--font-sans)">
        KOREA
      </text>
    </svg>
  );
}
