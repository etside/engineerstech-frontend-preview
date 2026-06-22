import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem, NavMegaGroup, NavSubItem } from "@/data/navigation";

/* ───── Desktop Mega Menu ───── */

interface MegaMenuDesktopProps {
  item: NavItem;
  isActive: boolean;
}

export const MegaMenuDesktop = ({ item, isActive }: MegaMenuDesktopProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  // Simple link (no dropdown)
  if (!item.megaMenu) {
    return (
      <Link
        to={item.to!}
        className={cn(
          "relative text-sm font-medium transition-colors hover:text-primary py-2",
          isActive ? "text-primary" : "text-muted-foreground"
        )}
      >
        {item.label}
        {isActive && (
          <span className="absolute -bottom-[1.5px] left-0 right-0 h-[2px] gradient-bg rounded-full" />
        )}
      </Link>
    );
  }

  const indexLinkMap: Record<string, string> = {
    Services: "/services",
    Products: "/products",
    Resources: "/resources",
  };
  const indexLink = indexLinkMap[item.label];

  return (
    <div ref={ref} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "relative flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary py-2",
          isActive || open ? "text-primary" : "text-muted-foreground"
        )}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
        {(isActive || open) && (
          <span className="absolute -bottom-[1.5px] left-0 right-0 h-[2px] gradient-bg rounded-full" />
        )}
      </button>

      {/* Full-width dropdown panel */}
      <div
        className={cn(
          "fixed left-0 right-0 z-40",
          "transition-all duration-300 ease-out",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
        style={{ top: "calc(var(--announcement-height, 0px) + 72px)" }}
      >
        {/* Backdrop blur layer */}
        <div className="absolute inset-0 bg-background/90 backdrop-blur-2xl border-b border-border/50" />

        <div className="container relative py-8">
          <div
            className={cn(
              "grid gap-10",
              item.megaMenu.length === 1
                ? "grid-cols-1 max-w-3xl mx-auto"
                : "grid-cols-2"
            )}
          >
            {item.megaMenu.map((group) => (
              <MegaMenuColumn key={group.title} group={group} onLinkClick={() => setOpen(false)} />
            ))}
          </div>

          {/* Bottom CTA bar */}
          <div className="mt-8 pt-6 border-t border-border/30 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Need help choosing?{" "}
              <Link to="/contact" onClick={() => setOpen(false)} className="text-primary hover:underline font-medium">
                Talk to our experts
              </Link>
            </p>
            {indexLink && (
              <Link
                to={indexLink}
                onClick={() => setOpen(false)}
                className="text-xs text-primary hover:underline font-medium flex items-center gap-1"
              >
                View all {item.label.toLowerCase()} <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───── Desktop Column ───── */

const MegaMenuColumn = ({
  group,
  onLinkClick,
}: {
  group: NavMegaGroup;
  onLinkClick: () => void;
}) => (
  <div>
    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-4 px-1">
      {group.title}
    </p>
    <div className="grid gap-0.5">
      {group.items.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          onClick={onLinkClick}
          className="group/item flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-white/[0.04] transition-all duration-200"
        >
          {item.icon && (
            <div className="mt-0.5 p-1.5 rounded-md bg-primary/10 text-primary group-hover/item:bg-primary/20 transition-colors">
              <item.icon className="h-4 w-4" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground/90 group-hover/item:text-primary transition-colors">
              {item.label}
            </p>
            {item.description && (
              <p className="text-xs text-muted-foreground/70 mt-0.5 leading-relaxed truncate">
                {item.description}
              </p>
            )}
          </div>
          <ArrowRight className="h-3.5 w-3.5 mt-1.5 text-muted-foreground/0 group-hover/item:text-primary/60 transition-all duration-200 -translate-x-1 group-hover/item:translate-x-0" />
        </Link>
      ))}
    </div>
  </div>
);

/* ───── Mobile Menu ───── */

interface MegaMenuMobileProps {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  isActive: boolean;
}

export const MegaMenuMobile = ({
  item,
  isOpen,
  onToggle,
  onClose,
  isActive,
}: MegaMenuMobileProps) => {
  const location = useLocation();

  if (!item.megaMenu) {
    return (
      <Link
        to={item.to!}
        onClick={onClose}
        className={cn(
          "flex items-center justify-between text-sm font-medium py-3 px-1 border-b border-border/20 transition-colors",
          location.pathname === item.to
            ? "text-primary border-primary/30"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-border/20">
      <button
        onClick={onToggle}
        className={cn(
          "flex items-center justify-between w-full text-sm font-medium py-3 px-1 transition-colors",
          isActive || isOpen ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
      >
        <span>{item.label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            isOpen && "rotate-180 text-primary"
          )}
        />
      </button>

      {/* Expandable content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="pb-4 pl-2 space-y-5">
          {item.megaMenu.map((group) => (
            <div key={group.title}>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-2 px-2">
                {group.title}
              </p>
              <div className="space-y-0.5">
                {group.items.map((subItem) => (
                  <Link
                    key={subItem.label}
                    to={subItem.to}
                    onClick={onClose}
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    {subItem.icon && (
                      <div className="p-1 rounded bg-primary/10 text-primary">
                        <subItem.icon className="h-3.5 w-3.5" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-foreground/80 hover:text-primary transition-colors">
                        {subItem.label}
                      </span>
                      {subItem.description && (
                        <span className="block text-[11px] text-muted-foreground/60 truncate">
                          {subItem.description}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
