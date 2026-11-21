/** Decorative postmark: two rings with curved text and wavy cancellation lines. */
export function Postmark({ className = "", text = "SEOUL · KOREA MAIL CLUB ·" }: { className?: string; text?: string }) {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className={className}>
      <defs>
        <path id="pm-ring" d="M60 60 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
      </defs>
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="60" cy="60" r="48" />
        <circle cx="60" cy="60" r="29" />
        <path d="M116 42 C132 36 148 48 164 42 S192 36 198 40 M116 60 C132 54 148 66 164 60 S192 54 198 58 M116 78 C132 72 148 84 164 78 S192 72 198 76" />
      </g>
      <text fontSize="9.5" letterSpacing="2.6" fill="currentColor" fontFamily="var(--font-sans)">
        <textPath href="#pm-ring">{text}</textPath>
      </text>
      <text x="60" y="64" textAnchor="middle" fontSize="11" fill="currentColor" fontFamily="var(--font-serif)" fontStyle="italic">
        with love
      </text>
    </svg>
  );
}

/** Thin divider with a small centered mark, for quiet section breaks. */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 text-rose ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-line" />
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="10" cy="5" rx="3" ry="4.5" fill="currentColor" transform={`rotate(${a} 10 10)`} />
        ))}
      </svg>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
