/**
 * A framed photograph for the light secondary pages.
 *
 * The homepage carries all the human imagery and every other page was Header,
 * text, MedicalDisclaimer, Footer. Going Home to For patients dropped a visitor
 * off a cliff, and /for-patients in particular opened with the right half of the
 * fold empty. This is the piece that closes that gap.
 *
 * The treatment is deliberately the one WeekInPhotos already uses on a light
 * ground: rounded-xl over a faint charcoal tint, cropped to 3/4, no ring and no
 * drop shadow. These pages sit one click from the homepage, so a second
 * photographic language would read as a different site.
 *
 * Every source is 900x1132, which covers a DPR 3 phone at the 300px rendered
 * width and a DPR 2 desktop at 450px. The narrower files exist because these
 * are full-frame photographs rather than alpha cut-outs, so the bytes matter
 * less per pixel but the page carries two of them.
 */

/**
 * Tailwind scans source for literal class names, so these have to be written
 * out here rather than built from the prop. A template literal produces a class
 * that is never generated and the crop silently falls back to the intrinsic
 * ratio.
 */
const ASPECT = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-[1/1]",
  "4/3": "aspect-[4/3]",
} as const;

type Props = {
  /** Basename under /images/people, without the width suffix or extension. */
  name: string;
  alt: string;
  /**
   * Above the fold. Skips lazy-loading and asks for high priority, because a
   * contained photograph like this one is a real LCP candidate. (A photograph
   * that covers the viewport is not: Chrome reads that as page background.)
   */
  priority?: boolean;
  /**
   * Rendered width, as a sizes attribute. Required because these appear at two
   * different scales: 450px for a hero beside the headline, ~300px for the
   * supporting bands. Left at the hero value, a 300px image still pulls the
   * 900w file on a DPR 2 screen.
   */
  sizes: string;
  /**
   * Crop. Defaults to the 3/4 the homepage grid uses. A hero beside a short
   * headline wants something squarer, or the text column floats in a void that
   * is taller than the copy in it.
   */
  aspect?: keyof typeof ASPECT;
  /** Intrinsic height of the 900w source, so the box reserves the right space. */
  height?: number;
  className?: string;
};

const PagePortrait = ({
  name,
  alt,
  priority = false,
  sizes,
  aspect = "3/4",
  height = 1132,
  className = "",
}: Props) => (
  <div className={`overflow-hidden rounded-xl bg-calm-charcoal/5 ${className}`}>
    <img
      src={`/images/people/${name}.webp`}
      srcSet={
        `/images/people/${name}-480.webp 480w, ` +
        `/images/people/${name}-688.webp 688w, ` +
        `/images/people/${name}.webp 900w`
      }
      sizes={sizes}
      alt={alt}
      width={900}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`block w-full object-cover ${ASPECT[aspect]}`}
    />
  </div>
);

export default PagePortrait;
