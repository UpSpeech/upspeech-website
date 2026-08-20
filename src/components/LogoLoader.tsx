import type { CSSProperties } from "react";

/**
 * The UpSpeech mark, animated, for loading and empty states.
 *
 * The mark is a person: the dark drop is her head, the rounded block below it
 * is her shoulders, and the purple circle is a speech bubble. So the loop is
 * just her speaking. The bubble rises from where her mouth would be, settles,
 * and clears, while she breathes underneath it.
 *
 * Drawn as SVG rather than generated video on purpose. Diffusion models
 * reliably turn a flat vector mark into an approximation of itself, and a
 * loading state has to be crisp at 24px and at 240px, loop with no seam, weigh
 * almost nothing, and stop moving when the reader has asked for less motion.
 * None of that is what video is good at.
 */

const CYCLE_MS = 2400;

type Props = {
  /** Rendered width in pixels. Height follows the mark's ratio. */
  size?: number;
  className?: string;
  /** Announced to screen readers. Pass the state, not the word "loading". */
  label?: string;
};

const LogoLoader = ({ size = 64, className = "", label }: Props) => {
  const style = {
    "--upspeech-loader-cycle": `${CYCLE_MS}ms`,
    width: size,
  } as CSSProperties;

  return (
    <span
      className={`upspeech-loader inline-block ${className}`}
      style={style}
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg viewBox="100 85 175 205" fill="none" className="block w-full h-auto">
        {/* Head and shoulders share one group so the breath moves all of her,
            anchored at the base so she does not float. */}
        <g className="upspeech-loader__figure">
          <path
            d="M106.667 158C106.667 132.816 127.082 112.4 152.266 112.4H153.466C177.988 112.4 197.867 132.279 197.867 156.8C197.867 181.322 177.988 201.2 153.466 201.2H106.667V158Z"
            fill="currentColor"
          />
          <path
            d="M106.667 210.8H185.866C199.121 210.8 209.867 221.545 209.867 234.8V258.8C209.867 272.055 199.121 282.8 185.867 282.8H130.667C117.412 282.8 106.667 272.055 106.667 258.8V210.8Z"
            fill="currentColor"
          />
        </g>
        <circle
          className="upspeech-loader__bubble"
          cx="238.066"
          cy="122.6"
          r="33"
          fill="#958AF0"
        />
      </svg>
    </span>
  );
};

export default LogoLoader;
