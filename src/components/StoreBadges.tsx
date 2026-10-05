import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/storeLinks";
import { useLocale, useT } from "@/i18n";

// Both badges are drawn 40px tall with a quarter-height clear space, which
// each store's guidelines ask for. The Google PNGs are cropped to the badge edge.
export default function StoreBadges({
  className = "",
}: {
  className?: string;
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
            width={120}
            height={40}
            className="h-10 w-auto"
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
            width={135}
            height={40}
            className="h-10 w-auto"
            loading="lazy"
          />
        </a>
      )}
    </div>
  );
}
