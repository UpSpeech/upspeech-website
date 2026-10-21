import { getCampaign } from "@/lib/utm";

type Messages = { websummit: string; linkedin: string; fallback: string };

/** The sample "sent" message follows the link that brought the visitor here. */
export const shareMessage = (messages: Messages): string => {
  const source = getCampaign().source?.toLowerCase();
  return source === "websummit" || source === "linkedin"
    ? messages[source]
    : messages.fallback;
};
