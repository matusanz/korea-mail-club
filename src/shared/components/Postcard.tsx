import { Artwork, type Scene } from "./Artwork";

type Props = {
  scene: Scene;
  src?: string;
  alt?: string;
  /** Tilt in degrees, for stacked compositions. */
  tilt?: number;
  priority?: boolean;
  className?: string;
};

/** A postcard: artwork inside a clean white border with a subtle shadow. */
export function Postcard({ scene, src, alt, tilt = 0, priority, className = "" }: Props) {
  return (
    <figure
      className={`rounded-[3px] bg-white p-[3.5%] shadow-card transition-transform duration-500 ${className}`}
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
    >
      <div className="aspect-[10/7] overflow-hidden bg-mist">
        <Artwork scene={scene} src={src} alt={alt} priority={priority} />
      </div>
    </figure>
  );
}
