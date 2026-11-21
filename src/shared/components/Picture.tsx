/**
 * Responsive image for the owner's artwork (static export: pre-sized JPEGs in public/images/,
 * picked by the browser through srcset). Width/height keep the layout stable while loading.
 */
export type ArtImage = {
  /** Available widths, smallest first, e.g. [{ w: 640, src: "/images/x-640.jpg" }, …]. */
  srcs: { w: number; src: string }[];
  width: number;
  height: number;
  alt: string;
};

type Props = {
  image: ArtImage;
  /** CSS `sizes` hint, e.g. "(min-width: 1024px) 560px, 100vw". */
  sizes: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  /** Decorative duplicate (e.g. a close-up of an image already described). */
  decorative?: boolean;
};

export function Picture({ image, sizes, className = "", style, priority = false, decorative = false }: Props) {
  const largest = image.srcs[image.srcs.length - 1];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized files
    <img
      src={largest.src}
      srcSet={image.srcs.map((s) => `${s.src} ${s.w}w`).join(", ")}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={decorative ? "" : image.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
      style={style}
    />
  );
}
