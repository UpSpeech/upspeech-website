import { getCampaign } from "@/lib/utm";

/* Sources that are the same network under another name. */
const ALIASES: Record<string, string> = { twitter: "x" };

/**
 * The sample "sent" message follows the link that brought the visitor here:
 * the dictionary holds one line per utm_source, and fallback covers the rest.
 */
export const shareMessage = (
  messages: { fallback: string } & Record<string, string>,
): string => {
  const raw = getCampaign().source?.toLowerCase() ?? "";
  const source = ALIASES[raw] ?? raw;
  return (source !== "fallback" && messages[source]) || messages.fallback;
};
