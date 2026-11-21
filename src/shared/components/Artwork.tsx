import { useId } from "react";

/**
 * Placeholder artwork: original pastel illustrations drawn in SVG in the palace-postcard palette
 * (peach/pink sunset sky, golden sun, slate-blue mountains, navy roofs). Used until the owner's own
 * postcard artwork and photographs are added (docs/TODO.md → Artwork).
 *
 * To swap in a real image, pass `src` (a file in public/images/) — the frame keeps its ratio,
 * so layout does not change. Never use images whose rights are not established.
 */

export type Scene = "palace" | "street" | "seasons" | "culture" | "postcards";

const sceneLabels: Record<Scene, string> = {
  palace: "Illustration of a Korean palace gate with navy tiled roofs under a peach sunset sky and blue mountains",
  street: "Illustration of a quiet hanok alley at sunset with tiled roof walls and a glowing lantern",
  seasons: "Illustration of a cherry blossom branch against a soft sunset, with falling petals",
  culture: "Illustration of a cup of tea beside a traditional lattice window at golden hour",
  postcards: "Illustration of illustrated postcards and a stamp from Korea",
};

/** Palette taken from the palace postcard reference. */
const c = {
  navy: "#1D2335",
  navy2: "#2B3149",
  slate: "#697190",
  slateMid: "#8D94AE",
  slateLight: "#B7BCD0",
  peach: "#E7B89C",
  peachDeep: "#D98F74",
  pink: "#D3B2AD",
  blush: "#F6DCD3",
  skyTop: "#FBEAE4",
  sun: "#F3DB95",
  white: "#FFFFFF",
  wall: "#FFF5F0",
  ground: "#F4E2D9",
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

/** Sunset sky gradient, unique per instance. */
function Sky({ id, h }: { id: string; h: number }) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.skyTop} />
          <stop offset="0.6" stopColor={c.blush} />
          <stop offset="1" stopColor={c.peach} />
        </linearGradient>
      </defs>
      <rect width="100%" height={h} fill={`url(#${id})`} />
    </>
  );
}

function Petals({ points, fill = c.pink }: { points: number[][]; fill?: string }) {
  return (
    <>
      {points.map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="5" ry="3" fill={fill} transform={`rotate(-30 ${x} ${y})`} />
      ))}
    </>
  );
}

function Palace({ label, className }: SvgProps) {
  const sky = useId();
  return (
    <svg viewBox="0 0 600 420" role="img" aria-label={label} className={className} preserveAspectRatio="xMidYMid slice">
      <Sky id={sky} h={340} />
      <circle cx="456" cy="128" r="46" fill={c.sun} />
      <circle cx="456" cy="128" r="64" fill={c.sun} opacity="0.25" />
      <path d="M0 236 C70 192 130 172 210 200 C280 146 370 118 452 166 C512 144 560 156 600 172 V420 H0Z" fill={c.slateLight} />
      <path d="M0 272 C90 236 170 230 250 250 C330 222 430 218 600 244 V420 H0Z" fill={c.slateMid} />
      <path d="M0 300 C120 280 220 290 300 300 C400 286 500 284 600 296 V420 H0Z" fill={c.slate} opacity="0.55" />
      <rect y="330" width="600" height="90" fill={c.ground} />
      {/* stone base with three arches */}
      <rect x="150" y="292" width="300" height="44" fill={c.white} />
      <path d="M190 336 V314 a18 18 0 0 1 36 0 V336Z M282 336 V308 a18 18 0 0 1 36 0 V336Z M374 336 V314 a18 18 0 0 1 36 0 V336Z" fill={c.slate} />
      {/* lower storey */}
      <rect x="166" y="244" width="268" height="48" fill={c.wall} />
      {[178, 226, 274, 322, 370, 418].map((x) => (
        <rect key={x} x={x - 4} y="244" width="8" height="48" fill={c.peachDeep} />
      ))}
      <rect x="160" y="236" width="280" height="10" fill={c.slate} />
      {[180, 220, 260, 300, 340, 380, 420].map((x) => (
        <circle key={x} cx={x} cy="241" r="2.2" fill={c.sun} />
      ))}
      <path d="M104 226 Q200 250 300 250 Q400 250 496 226 L452 200 H148Z" fill={c.navy2} />
      <path d="M104 226 Q200 250 300 250 Q400 250 496 226" fill="none" stroke={c.navy} strokeWidth="3" strokeLinecap="round" />
      {/* upper storey */}
      <rect x="200" y="170" width="200" height="32" fill={c.wall} />
      {[214, 262, 300, 338, 386].map((x) => (
        <rect key={x} x={x - 3} y="170" width="6" height="32" fill={c.peachDeep} />
      ))}
      <rect x="194" y="164" width="212" height="8" fill={c.slate} />
      <path d="M140 160 Q220 182 300 182 Q380 182 460 160 L410 128 H190Z" fill={c.navy2} />
      <path d="M140 160 Q220 182 300 182 Q380 182 460 160" fill="none" stroke={c.navy} strokeWidth="3" strokeLinecap="round" />
      <path d="M182 128 Q300 120 418 128" stroke={c.navy} strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* pine */}
      <path d="M72 336 C76 300 70 270 80 240" stroke={c.navy2} strokeWidth="6" fill="none" strokeLinecap="round" />
      <ellipse cx="62" cy="252" rx="34" ry="12" fill={c.slate} />
      <ellipse cx="96" cy="230" rx="30" ry="10" fill={c.slateMid} />
      <ellipse cx="70" cy="212" rx="24" ry="8" fill={c.slate} />
      <Petals points={[[520, 260], [548, 300], [500, 318], [120, 150], [150, 118], [560, 220]]} />
    </svg>
  );
}

function Street({ label, className }: SvgProps) {
  const sky = useId();
  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={label} className={className} preserveAspectRatio="xMidYMid slice">
      <Sky id={sky} h={300} />
      <circle cx="200" cy="200" r="44" fill={c.sun} />
      <path d="M0 200 C90 170 170 180 230 196 C300 170 360 176 400 184 V500 H0Z" fill={c.slateLight} />
      <rect y="300" width="400" height="200" fill={c.ground} />
      <path d="M150 500 L188 250 H212 L250 500Z" fill={c.blush} />
      {/* left wall + roof */}
      <path d="M0 230 L188 250 V330 L0 380Z" fill={c.white} />
      <path d="M0 214 Q100 222 188 244 L188 252 Q100 236 0 232Z" fill={c.navy2} />
      <path d="M0 380 L188 330 V350 L0 410Z" fill={c.slateMid} />
      {/* right wall + roof */}
      <path d="M400 230 L212 250 V330 L400 380Z" fill={c.wall} />
      <path d="M400 214 Q300 222 212 244 L212 252 Q300 236 400 232Z" fill={c.navy2} />
      <path d="M400 380 L212 330 V350 L400 410Z" fill={c.slate} />
      {/* doors */}
      <path d="M40 266 L84 260 V336 L40 348Z" fill={c.peachDeep} />
      <path d="M360 266 L316 260 V336 L360 348Z" fill={c.slate} />
      {/* lantern */}
      <path d="M300 150 V184" stroke={c.navy} strokeWidth="2" />
      <rect x="286" y="184" width="28" height="38" rx="12" fill={c.peach} />
      <rect x="286" y="184" width="28" height="38" rx="12" fill={c.sun} opacity="0.5" />
      <rect x="292" y="180" width="16" height="6" rx="2" fill={c.navy} />
      <Petals points={[[90, 150], [320, 120], [140, 110]]} />
    </svg>
  );
}

function Seasons({ label, className }: SvgProps) {
  const sky = useId();
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
      <Sky id={sky} h={500} />
      <circle cx="290" cy="360" r="70" fill={c.sun} />
      <path d="M0 420 C100 380 200 390 280 410 C330 396 370 396 400 402 V500 H0Z" fill={c.slateMid} />
      <path d="M0 450 C120 430 260 440 400 450 V500 H0Z" fill={c.slate} />
      <path d="M-10 90 C80 110 160 140 230 170 C290 196 340 230 410 240" stroke={c.navy2} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M150 128 C170 100 190 96 210 92" stroke={c.navy2} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M260 188 C270 160 290 150 312 146" stroke={c.navy2} strokeWidth="4" fill="none" strokeLinecap="round" />
      {blossoms.map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-11" rx="8" ry="11" fill={c.white} transform={`rotate(${a})`} />
          ))}
          {[36, 108, 180, 252, 324].map((a) => (
            <ellipse key={a} cx="0" cy="-8" rx="4" ry="7" fill={c.pink} transform={`rotate(${a})`} />
          ))}
          <circle r="3.5" fill={c.peachDeep} />
        </g>
      ))}
      <Petals points={[[250, 300], [320, 270], [210, 340], [90, 330], [140, 260]]} fill={c.white} />
    </svg>
  );
}

function Culture({ label, className }: SvgProps) {
  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={label} className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="500" fill={c.blush} />
      {/* lattice window with sunset behind */}
      <rect x="60" y="50" width="280" height="230" fill={c.peach} />
      <circle cx="260" cy="190" r="50" fill={c.sun} />
      <path d="M60 230 C140 200 220 210 340 220 V280 H60Z" fill={c.slateMid} />
      <rect x="60" y="50" width="280" height="230" fill="none" stroke={c.navy2} strokeWidth="8" />
      {[130, 200, 270].map((x) => (
        <path key={x} d={`M${x} 54 V276`} stroke={c.navy2} strokeWidth="4" />
      ))}
      {[108, 165, 222].map((y) => (
        <path key={y} d={`M64 ${y} H336`} stroke={c.navy2} strokeWidth="4" />
      ))}
      {/* table + tray */}
      <rect y="330" width="400" height="170" fill={c.slate} />
      <ellipse cx="200" cy="392" rx="140" ry="30" fill={c.navy2} />
      <ellipse cx="200" cy="386" rx="132" ry="25" fill={c.navy} />
      {/* cup */}
      <path d="M160 330 H240 Q236 384 200 386 Q164 384 160 330Z" fill={c.white} />
      <ellipse cx="200" cy="330" rx="40" ry="8" fill={c.sun} />
      <path d="M182 300 C172 286 192 278 182 262 M206 304 C196 290 216 282 206 266" stroke={c.white} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="286" cy="382" r="11" fill={c.pink} />
      <circle cx="306" cy="390" r="10" fill={c.sun} />
    </svg>
  );
}

function Postcards({ label, className }: SvgProps) {
  const sky = useId();
  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={label} className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="500" fill={c.slateLight} />
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.skyTop} />
          <stop offset="1" stopColor={c.peach} />
        </linearGradient>
      </defs>
      {/* back card */}
      <g transform="rotate(-8 200 320)">
        <rect x="70" y="230" width="260" height="180" fill={c.white} />
        <rect x="82" y="242" width="236" height="156" fill={c.sun} />
        <path d="M82 340 C150 300 230 310 318 330 V398 H82Z" fill={c.slate} />
      </g>
      {/* front card */}
      <g transform="rotate(5 210 180)">
        <rect x="80" y="80" width="250" height="175" fill={c.white} />
        <rect x="92" y="92" width="226" height="151" fill={`url(#${sky})`} />
        <circle cx="270" cy="130" r="18" fill={c.sun} />
        <path d="M92 200 C140 170 200 176 240 190 C270 176 300 180 318 186 V243 H92Z" fill={c.slateMid} />
        <path d="M130 194 Q205 208 280 194 L262 178 H148Z" fill={c.navy2} />
        <rect x="150" y="194" width="110" height="24" fill={c.wall} />
        <rect x="92" y="218" width="226" height="25" fill={c.ground} />
      </g>
      {/* stamp */}
      <g transform="rotate(8 300 380)">
        <rect x="262" y="340" width="76" height="92" fill={c.white} />
        <rect x="270" y="348" width="60" height="76" fill={c.pink} />
        <circle cx="300" cy="374" r="14" fill={c.sun} />
        <path d="M276 412 Q300 400 324 412" stroke={c.navy} strokeWidth="5" fill="none" />
      </g>
    </svg>
  );
}
