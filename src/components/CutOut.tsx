import { CUTOUTS } from "@/lib/cutouts.generated";
import { cutOutWidthAt, sizesFor, type Heights } from "@/lib/cutout-sizes";

/**
 * A person with the background removed, standing on the page rather than
 * sitting in a box.
 *
 * PagePortrait is the other half of the pair and still has a job: a framed
 * photograph is right when the room matters. This is for the beats where the
 * person matters and the room is just wall.
 *
 * Two things make a cut-out sit on a page instead of floating above it. One is
 * the contact shadow below. The other is that its base has to dissolve rather
 * than end on a straight line, and that dissolve is baked into the asset's
 * alpha by tools/subject-lift/build-cutouts.sh. It deliberately is not a CSS
 * mask-image: filter runs before mask, so a masked element still casts the
 * shadow of its unmasked silhouette and you see it through the faded region as
 * a grey rectangle behind every figure.
 *
 * Sizing is by height, not width. Cut-outs are trimmed to their subject, so
 * every one has a different aspect and matching them on width makes a row of
 * people at wildly different scales.
 */

const TONE = {
  /** On white and on the pale bands. */
  light: "drop-shadow(0 20px 22px rgba(31,35,51,0.18))",
  /**
   * On primary-900. Desaturated a little so the subject belongs to the navy
   * instead of sitting on top of it, lifted a little because a mid-key subject
   * goes murky against a dark ground, and a heavier shadow because the ground
   * gives no separation of its own.
   */
  dark: "drop-shadow(0 24px 28px rgba(0,0,0,0.40)) brightness(1.07) saturate(0.9) contrast(1.02)",
} as const;

type Props = {
  /** Basename under /images/people/cut, without width suffix or extension. */
  name: keyof typeof CUTOUTS | string;
  alt: string;
  /**
   * CSS height this is rendered at. The width it actually occupies follows from
   * the subject's own aspect, so a hand-written sizes attribute is always wrong
   * here: pass the height and let the component work the width out. Left to a
   * guess, every cut-out pulls the 900w file even when it paints 137px wide.
   *
   * Pass the breakpoint ladder, not a single number, whenever className carries
   * one. A lone number describes the widest breakpoint and phones inherit it,
   * which is how /for-slps came to declare 337px for a slot it paints at 236px
   * and pull the 900w file on a 2x screen that the 560w one covers.
   */
  renderHeight: number | Heights;
  /** Ground it sits on. Drives the shadow and the desaturation. */
  tone?: keyof typeof TONE;
  /**
   * Which axis the caller is sizing on. Height is right for a row of people at
   * a common scale, where matching on width would put them at wildly different
   * sizes. Width is right for a landscape subject filling a column: sized by
   * height it gets clamped by max-width and object-contain then letterboxes it
   * smaller than asked for.
   */
  sizing?: "height" | "width";
  /** Above the fold. */
  priority?: boolean;
  /** Height classes live here: `h-[250px]`, `lg:h-[400px]` and so on. */
  className?: string;
};

const CutOut = ({
  name,
  alt,
  renderHeight,
  tone = "light",
  sizing = "height",
  priority = false,
  className = "",
}: Props) => {
  const dim = CUTOUTS[name as keyof typeof CUTOUTS];
  const sizes = sizesFor(renderHeight, cutOutWidthAt(name));

  return (
    <img
      src={`/images/people/cut/${name}.webp`}
      srcSet={
        `/images/people/cut/${name}-560.webp 560w, ` +
        `/images/people/cut/${name}.webp 900w`
      }
      sizes={sizes}
      alt={alt}
      width={dim?.w}
      height={dim?.h}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      style={{ filter: TONE[tone] }}
      // object-contain is load-bearing, not decoration. These are sized by
      // height with width:auto, and max-w-full clamps the width on a narrow
      // column while the height stays fixed, which distorts the subject:
      // measured at 15% on day-present, 10% on week-session, 9% on day-notes.
      className={`block object-contain ${
        sizing === "width" ? "h-auto w-full" : "w-auto max-w-full"
      } ${className}`}
    />
  );
};

export default CutOut;
