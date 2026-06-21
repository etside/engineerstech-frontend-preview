import { useState, useEffect } from "react";
import { X, Zap, ArrowRight } from "lucide-react";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--announcement-height",
      visible ? "36px" : "0px"
    );
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] gradient-bg text-primary-foreground overflow-hidden">
      <div className="container flex items-center justify-center gap-3 py-2.5 px-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <Zap className="h-3.5 w-3.5 shrink-0" />
          <span>
            <strong>Limited Offer:</strong> Free 60-min strategy session for new clients{" "}
            <a
              href="#"
              className="underline underline-offset-2 inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              Book now <ArrowRight className="h-3 w-3 hidden sm:inline" />
            </a>
          </span>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
