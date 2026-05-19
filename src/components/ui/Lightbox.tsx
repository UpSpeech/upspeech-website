import { useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
};

const Lightbox = ({ src, alt, open, onClose }: Props) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  // Portal to body so ancestor transforms/filters can't create a containing
  // block that would constrain `fixed inset-0`.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-calm-charcoal/90 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out animate-fade-in"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </svg>
      </button>
      <img
        src={src}
        alt={alt}
        className="max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-6rem)] max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl cursor-default"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body,
  );
};

export default Lightbox;
