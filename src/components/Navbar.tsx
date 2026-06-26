import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { defaultNavigation, parseNavigation, type NavItem } from "@/data/navigation";
import { useSettings } from "@/hooks/useSettings";
import { MegaMenuDesktop, MegaMenuMobile } from "@/components/MegaMenu";
import { cn } from "@/lib/utils";
import logoDark from "@/assets/logo-dark-bg.svg";

const Navbar = () => {
  const { getSetting } = useSettings();
  const scheduleUrl = getSetting("schedule_call_url", "https://calendar.app.google/EPrxGuqYSGBhL4WN7");
  const navData = getSetting("navigation", null);
  const navigation: NavItem[] = useMemo(
    () => (navData ? parseNavigation(navData) : defaultNavigation),
    [navData]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Track scroll for enhanced border/shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenMobileMenu(null);
  }, [location.pathname]);

  const isParentActive = (item: (typeof navigation)[number]) => {
    if (item.to) return location.pathname === item.to;
    if (item.megaMenu) {
      return item.megaMenu.some((group) =>
        group.items.some((sub) => sub.to !== "#" && location.pathname === sub.to)
      );
    }
    return false;
  };

  return (
    <>
      <nav
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-300",
          "bg-background/70 backdrop-blur-2xl",
          scrolled ? "border-b border-border/60 shadow-lg shadow-black/10" : "border-b border-border/30"
        )}
        style={{ top: "var(--announcement-height, 0px)" }}
      >
        <div className="container flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logoDark} alt="engineersTech" className="h-5 sm:h-6 md:h-7" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div key={item.label} className="px-3">
                <MegaMenuDesktop
                  item={item}
                  isActive={isParentActive(item)}
                />
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+8801314443311"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">+88 01314 44 33 11</span>
            </a>
            <a href={scheduleUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="gradient-bg border-0 text-primary-foreground hover:opacity-90 font-medium px-5 gap-2"
              >
                <CalendarDays className="h-3.5 w-3.5" />
                Schedule a Call
              </Button>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Slide-in panel */}
        <div
          className={cn(
            "absolute top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-background border-l border-border/50 transition-transform duration-300 ease-out overflow-y-auto",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Spacer for navbar height */}
          <div className="h-16" style={{ marginTop: "var(--announcement-height, 0px)" }} />

          <div className="px-6 py-6">
            {/* Nav items */}
            <div className="space-y-1">
              {navigation.map((item) => (
                <MegaMenuMobile
                  key={item.label}
                  item={item}
                  isOpen={openMobileMenu === item.label}
                  onToggle={() =>
                    setOpenMobileMenu(
                      openMobileMenu === item.label ? null : item.label
                    )
                  }
                  onClose={() => setIsOpen(false)}
                  isActive={isParentActive(item)}
                />
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-8 space-y-3">
              <a href={scheduleUrl} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="gradient-bg border-0 w-full text-primary-foreground font-medium gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Schedule a Call
                </Button>
              </a>
              <a
                href="tel:+8801314443311"
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                +88 01314 44 33 11
              </a>
            </div>

            {/* Brand tag */}
            <p className="mt-8 text-center text-xs text-muted-foreground/40">
              #drivenByEngineers
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
