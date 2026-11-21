/**
 * Placeholder artwork: simple original pastel illustrations drawn in SVG, used until the
 * owner's own postcard artwork and photographs are added (docs/TODO.md → Artwork).
 *
 * To swap in a real image, pass `src` (a file in public/images/) — the frame keeps its ratio,
 * so layout does not change. Never use images whose rights are not established.
 */

export type Scene = "palace" | "street" | "seasons" | "culture" | "postcards";

const sceneLabels: Record<Scene, string> = {
  palace: "Illustration of a Korean palace gate with curved tiled roofs, a pine tree and soft blue mountains behind",
  street: "Illustration of a quiet hanok alley with tiled roof walls and a paper lantern",
  seasons: "Illustration of a cherry blossom branch and falling maple leaves",
  culture: "Illustration of a cup of tea on a wooden tray beside a traditional lattice window",
  postcards: "Illustration of postcards, a stamp and a postmark on an envelope",
};

type Props = {
  scene: Scene;
  /** Optional real image (e.g. "/images/palace-postcard.jpg"); replaces the illustration. */
  src?: string;
  alt?: string;
  className?: string;
  /** Load eagerly (hero image only). */
  priority?: boolean;
};

export function Artwork({ scene, src, alt, className = "", priority = false }: Props) {
  const label = alt ?? sceneLabels[scene];
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized files
      <img
        src={src}
        alt={label}
        className={`h-full w-full object-cover ${className}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }
  const Svg = scenes[scene];
  return <Svg label={label} className={`h-full w-full ${className}`} />;
}

type SvgProps = { label: string; className: string };

const scenes: Record<Scene, (p: SvgProps) => React.ReactElement> = {
  palace: Palace,
  street: Street,
  seasons: Seasons,
  culture: Culture,
  postcards: Postcards,
};

function Palace({ label, className }: SvgProps) {
  return (
    <svg viewBox="0 0 600 420" role="img" aria-label={label} className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="600" height="420" fill="#F6ECE3" />
      <circle cx="468" cy="92" r="40" fill="#EECBC3" />
      <path d="M0 236 C70 196 130 176 210 204 C280 150 370 120 452 168 C512 146 560 160 600 178 V420 H0Z" fill="#CBD6DE" />
      <path d="M0 270 C90 236 170 232 250 252 C330 226 430 222 600 248 V420 H0Z" fill="#B4C4CF" />
      <rect y="330" width="600" height="90" fill="#EDE2D4" />
      <path d="M0 336 H600" stroke="#E0D2C0" strokeWidth="2" />
      {/* stone base with three arches */}
      <rect x="150" y="292" width="300" height="44" fill="#E4D8C8" />
      <path d="M190 336 V314 a18 18 0 0 1 36 0 V336Z M282 336 V308 a18 18 0 0 1 36 0 V336Z M374 336 V314 a18 18 0 0 1 36 0 V336Z" fill="#BCAA98" />
      {/* lower storey */}
      <rect x="166" y="244" width="268" height="48" fill="#EFE4D6" />
      {[178, 226, 274, 322, 370, 418].map((x) => (
        <rect key={x} x={x - 4} y="244" width="8" height="48" fill="#B87567" />
      ))}
      <rect x="160" y="236" width="280" height="10" fill="#9DB3AE" />
      <path d="M104 226 Q200 250 300 250 Q400 250 496 226 L452 200 H148Z" fill="#5E5752" />
      <path d="M104 226 Q200 250 300 250 Q400 250 496 226" fill="none" stroke="#45403C" strokeWidth="3" strokeLinecap="round" />
      {/* upper storey */}
      <rect x="200" y="170" width="200" height="32" fill="#EFE4D6" />
      {[214, 262, 300, 338, 386].map((x) => (
        <rect key={x} x={x - 3} y="170" width="6" height="32" fill="#B87567" />
      ))}
      <rect x="194" y="164" width="212" height="8" fill="#9DB3AE" />
      <path d="M140 160 Q220 182 300 182 Q380 182 460 160 L410 128 H190Z" fill="#5E5752" />
      <path d="M140 160 Q220 182 300 182 Q380 182 460 160" fill="none" stroke="#45403C" strokeWidth="3" strokeLinecap="round" />
      <path d="M182 128 Q300 120 418 128" stroke="#45403C" strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* pine */}
      <path d="M72 336 C76 300 70 270 80 240" stroke="#8C7564" strokeWidth="7" fill="none" strokeLinecap="round" />
      <ellipse cx="62" cy="252" rx="34" ry="13" fill="#8FA596" />
      <ellipse cx="96" cy="230" rx="30" ry="11" fill="#9DB2A3" />
      <ellipse cx="70" cy="212" rx="24" ry="9" fill="#8FA596" />
      {/* drifting petals */}
      {[
        [520, 250],
        [548, 292],
        [500, 312],
        [120, 150],
        [150, 120],
        [560, 214],
      ].map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="5" ry="3" fill="#E3B1A9" transform={`rotate(-30 ${x} ${y})`} />
      ))}
    </svg>
  );
}

function Street({ label, className }: SvgProps) {
  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={label} className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="500" fill="#F3EBE2" />
      <path d="M0 140 C90 110 170 120 230 140 C300 110 360 116 400 126 V500 H0Z" fill="#DCE4EA" />
      {/* path */}
      <path d="M150 500 L188 250 H212 L250 500Z" fill="#E8DCCC" />
      {/* left wall + roofs, receding */}
      <path d="M0 230 L188 250 V330 L0 380Z" fill="#EDE3D7" />
      <path d="M0 214 Q100 222 188 244 L188 252 Q100 236 0 232Z" fill="#5E5752" />
      <path d="M0 380 L188 330 V350 L0 410Z" fill="#CBB9A6" />
      {/* right wall + roofs */}
      <path d="M400 230 L212 250 V330 L400 380Z" fill="#E6DACB" />
      <path d="M400 214 Q300 222 212 244 L212 252 Q300 236 400 232Z" fill="#5E5752" />
      <path d="M400 380 L212 330 V350 L400 410Z" fill="#C4B19D" />
      {/* doors */}
      <path d="M40 266 L84 260 V336 L40 348Z" fill="#B87567" opacity="0.85" />
      <path d="M360 266 L316 260 V336 L360 348Z" fill="#9DB3AE" />
      {/* lantern */}
      <path d="M300 160 V190" stroke="#8C7564" strokeWidth="2" />
      <rect x="286" y="190" width="28" height="38" rx="12" fill="#E8B4AA" />
      <rect x="292" y="186" width="16" height="6" rx="2" fill="#8C7564" />
      {/* tree */}
      <circle cx="200" cy="186" r="40" fill="#E8C9C1" />
      <circle cx="176" cy="200" r="26" fill="#EED5CE" />
      <path d="M200 250 V210" stroke="#8C7564" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function Seasons({ label, className }: SvgProps) {
  const blossoms: [number, number][] = [
    [120, 150],
    [170, 120],
    [230, 168],
    [282, 132],
    [330, 196],
    [196, 214],
  ];
  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={label} className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="500" fill="#F7EEE8" />
      <circle cx="300" cy="380" r="120" fill="#E9EEF1" />
      <path d="M-10 90 C80 110 160 140 230 170 C290 196 340 230 410 240" stroke="#8C7564" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M150 128 C170 100 190 96 210 92" stroke="#8C7564" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M260 188 C270 160 290 150 312 146" stroke="#8C7564" strokeWidth="4" fill="none" strokeLinecap="round" />
      {blossoms.map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-11" rx="8" ry="11" fill="#EBC1B9" transform={`rotate(${a})`} />
          ))}
          <circle r="4" fill="#C98378" />
        </g>
      ))}
      {/* maple leaves drifting */}
      {[
        [90, 350, -20, "#D69A6E"],
        [170, 420, 25, "#C98378"],
        [70, 450, 60, "#DDB07F"],
      ].map(([x, y, r, c]) => (
        <path
          key={`${x}`}
          d="M0 -18 L5 -6 L16 -9 L10 2 L18 8 L5 8 L0 20 L-5 8 L-18 8 L-10 2 L-16 -9 L-5 -6Z"
          fill={c as string}
          transform={`translate(${x} ${y}) rotate(${r})`}
        />
      ))}
      {[
        [250, 300],
        [320, 270],
        [210, 380],
      ].map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="6" ry="3.5" fill="#E7BDB5" transform={`rotate(25 ${x} ${y})`} />
      ))}
    </svg>
  );
}

function Culture({ label, className }: SvgProps) {
  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={label} className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="500" fill="#F4ECE3" />
      {/* lattice window */}
      <rect x="60" y="50" width="280" height="230" fill="#FBF6EF" stroke="#C9B49E" strokeWidth="8" />
      {[130, 200, 270].map((x) => (
        <path key={x} d={`M${x} 54 V276`} stroke="#C9B49E" strokeWidth="4" />
      ))}
      {[108, 165, 222].map((y) => (
        <path key={y} d={`M64 ${y} H336`} stroke="#C9B49E" strokeWidth="4" />
      ))}
      <circle cx="270" cy="130" r="26" fill="#DCE4EA" opacity="0.8" />
      {/* table + tray */}
      <rect y="330" width="400" height="170" fill="#E6D6C3" />
      <ellipse cx="200" cy="392" rx="140" ry="30" fill="#B9957A" />
      <ellipse cx="200" cy="386" rx="132" ry="25" fill="#C9A78B" />
      {/* cup */}
      <path d="M160 330 H240 Q236 384 200 386 Q164 384 160 330Z" fill="#FFFFFF" stroke="#D8CABB" strokeWidth="2" />
      <ellipse cx="200" cy="330" rx="40" ry="8" fill="#D9B98E" />
      <path d="M182 300 C172 286 192 278 182 262 M206 304 C196 290 216 282 206 266" stroke="#C9B49E" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* small sweets */}
      <circle cx="286" cy="382" r="11" fill="#EBC1B9" />
      <circle cx="306" cy="390" r="10" fill="#B8CBB7" />
    </svg>
  );
}

function Postcards({ label, className }: SvgProps) {
  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={label} className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="500" fill="#F2EAE0" />
      {/* envelope */}
      <g transform="rotate(-6 200 300)">
        <rect x="50" y="200" width="300" height="200" fill="#FBF7F1" stroke="#E2D6C7" strokeWidth="2" />
        <path d="M50 200 L200 300 L350 200" fill="none" stroke="#E2D6C7" strokeWidth="2" />
      </g>
      {/* postcard */}
      <g transform="rotate(5 210 190)">
        <rect x="80" y="90" width="250" height="175" fill="#FFFFFF" />
        <rect x="92" y="102" width="226" height="151" fill="#DCE4EA" />
        <path d="M92 210 C140 180 200 186 240 200 C270 186 300 190 318 196 V253 H92Z" fill="#B4C4CF" />
        <path d="M130 200 Q205 214 280 200 L262 186 H148Z" fill="#5E5752" />
        <rect x="150" y="200" width="110" height="26" fill="#EFE4D6" />
        <rect x="92" y="226" width="226" height="27" fill="#EDE2D4" />
      </g>
      {/* stamp */}
      <g transform="rotate(8 300 330)">
        <rect x="262" y="290" width="76" height="92" fill="#FFFFFF" stroke="#E2D6C7" strokeDasharray="4 4" strokeWidth="2" />
        <rect x="272" y="300" width="56" height="62" fill="#EFD7D2" />
        <circle cx="300" cy="326" r="14" fill="#D7A39C" />
      </g>
      {/* postmark */}
      <g stroke="#9A8F86" strokeWidth="2" fill="none" opacity="0.7">
        <circle cx="210" cy="360" r="32" />
        <circle cx="210" cy="360" r="25" />
        <path d="M250 346 C270 340 290 352 310 346 M250 360 C270 354 290 366 310 360 M250 374 C270 368 290 380 310 374" />
      </g>
    </svg>
  );
}
