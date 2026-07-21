import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";

// Registered under their real family names ("Outfit", "Plus Jakarta Sans"),
// so the project's font-heading / font-body Tailwind classes resolve to them.
loadOutfit("normal", {
  weights: ["500", "600", "700", "800"],
  subsets: ["latin"],
});
loadJakarta("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
