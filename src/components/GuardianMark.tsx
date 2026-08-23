/**
 * The UpSpeech mark, small and decorative, sitting beside the eyebrow on the
 * beats where a child and an adult are on screen together.
 *
 * Four places carry it and nothing else does: the 11:30 session band and the
 * family photograph on the homepage, the practising-with-a-parent band on
 * /for-patients, and the family band on /for-slps. Applied to every one of
 * those and to none of the adult-only beats, it reads as a rule. Applied to
 * one or two it would read as an accident.
 *
 * Purely decorative, so it is aria-hidden and carries no title. The eyebrow it
 * sits next to already says what the section is.
 *
 * It is the mark rather than a character on purpose. The companion decision of
 * 2026-08-21 gives characters to sections inside the product and leaves the
 * platform speaking with the mark, and a marketing page is the platform
 * speaking. Geometry is lifted from public/images/logo.svg unchanged: the two
 * lobes take currentColor so the caller sets them per ground, and the accent
 * dot stays #958AF0, which is a surface here rather than text.
 */

type Props = {
  /** Tailwind classes, including the colour the two lobes inherit. */
  className?: string;
};

const GuardianMark = ({ className = "" }: Props) => (
  <svg
    viewBox="104 101 108 184"
    aria-hidden="true"
    focusable="false"
    className={`inline-block h-[1.35em] w-auto shrink-0 align-middle ${className}`}
  >
    <path
      d="M106.667 158C106.667 132.816 127.082 112.4 152.266 112.4H153.466C177.988 112.4 197.867 132.279 197.867 156.8C197.867 181.322 177.988 201.2 153.466 201.2H106.667V158Z"
      fill="currentColor"
    />
    <path
      d="M106.667 210.8H185.866C199.121 210.8 209.867 221.545 209.867 234.8V258.8C209.867 272.055 199.121 282.8 185.867 282.8H130.667C117.412 282.8 106.667 272.055 106.667 258.8V210.8Z"
      fill="currentColor"
    />
    <circle
      transform="translate(-42.238, 25.987) scale(0.8647293978035985)"
      cx="238.066"
      cy="122.6"
      r="33"
      fill="#958AF0"
    />
  </svg>
);

export default GuardianMark;
