import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/storeLinks";
import { useLocale, useT } from "@/i18n";

// Apple's badge is 40px tall with a quarter-height clear space. Google's PNG
// carries its own clear space, so it is drawn at 60px to match 40px of badge.
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
        >
          <img
            src={`/images/store/google-play-${locale}.png`}
            alt={t.playStoreAlt}
            width={155}
            height={60}
            className="h-[60px] w-auto"
            loading="lazy"
          />
        </a>
      )}
    </div>
  );
}
