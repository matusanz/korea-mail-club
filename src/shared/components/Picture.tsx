/**
 * Responsive image for the owner's artwork (static export: pre-sized files in public/images/,
 * picked by the browser through srcset). Every JPEG has a WebP twin (`npm run images`), served first;
 * the JPEG is the fallback. Width/height keep the layout stable while loading.
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
  const srcSet = (ext: string) => image.srcs.map((s) => `${s.src.replace(/\.jpg$/, ext)} ${s.w}w`).join(", ");
  return (
    <picture>
      <source type="image/webp" srcSet={srcSet(".webp")} sizes={sizes} />
      <img
        src={largest.src}
        srcSet={srcSet(".jpg")}
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
    </picture>
  );
}
