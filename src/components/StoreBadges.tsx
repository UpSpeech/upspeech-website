import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/storeLinks";
import { useLocale, useT } from "@/i18n";

// Both badges are drawn 40px tall with a quarter-height clear space, which
// each store's guidelines ask for. The Google PNGs are cropped to the badge edge.
export default function StoreBadges({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "md" | "lg";
}) {
  const locale = useLocale();
  const t = useT().footer;
  if (!APP_STORE_URL && !PLAY_STORE_URL) return null;
  return (
    <div className={`flex flex-wrap items-center gap-x-1 ${className}`}>
      {APP_STORE_URL && (
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.appStoreAriaLabel}
          className="p-2.5"
        >
          <img
            src={`/images/store/app-store-${locale}.svg`}
            alt={t.appStoreAlt}
            width={size === "lg" ? 144 : 120}
            height={size === "lg" ? 48 : 40}
            className={size === "lg" ? "h-12 w-auto" : "h-10 w-auto"}
            loading="lazy"
          />
        </a>
      )}
      {PLAY_STORE_URL && (
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.playStoreAriaLabel}
          className="p-2.5"
        >
          <img
            src={`/images/store/google-play-${locale}.png`}
            alt={t.playStoreAlt}
            width={size === "lg" ? 162 : 135}
            height={size === "lg" ? 48 : 40}
            className={size === "lg" ? "h-12 w-auto" : "h-10 w-auto"}
            loading="lazy"
          />
        </a>
      )}
    </div>
  );
}
