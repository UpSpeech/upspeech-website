// Frameit's screen rectangle inside the 1470 × 3000 device frame.
const PHONE_SCREEN = {
  insetBlockStart: "2.2%",
  insetInlineStart: "5.1%",
  inlineSize: "89.8%",
  blockSize: "95.6%",
  borderRadius: "12% / 5.4%",
};

const PHONE_FRAME = "/screenshots/mobile/iphone-frame.webp";

export default function PhoneShot({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden={alt ? undefined : true}
      role={alt ? "img" : undefined}
      aria-label={alt}
      className={`pointer-events-none relative ${className}`}
      style={{ aspectRatio: "1470 / 3000" }}
    >
      <img
        src={src}
        alt=""
        width={1206}
        height={2622}
        loading="lazy"
        decoding="async"
        className="absolute object-cover"
        style={PHONE_SCREEN}
      />
      <img
        src={PHONE_FRAME}
        alt=""
        width={1470}
        height={3000}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full drop-shadow-[0_24px_44px_-24px_rgba(41,53,135,0.45)]"
      />
    </div>
  );
}
