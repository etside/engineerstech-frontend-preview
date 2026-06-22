import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Users, Globe, Shield, Award, Rocket, Zap, Building2, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useSettings } from "@/hooks/useSettings";

const iconMap: Record<string, LucideIcon> = {
  Sparkles, Users, Globe, Shield, Award, Rocket, Zap, Building2,
};

/* ───── Particle Background ───── */

const HeroParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(60, Math.floor(canvas.offsetWidth / 20));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(214, 100%, 55%, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(214, 100%, 55%, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

/* ───── Slide Data ───── */

interface HeroSlide {
  badge: string;
  badgeIcon: typeof Sparkles;
  headline: string;
  highlight: string;
  subtext: string;
  ctaPrimary: { label: string; to: string };
  ctaSecondary: { label: string; to: string };
  stats: { value: string; label: string; icon: typeof Sparkles }[];
}

const defaultSlidesData = [
  {
    badge: "AI-Driven Software Engineering", badgeIcon: "Sparkles",
    headline: "Build Software", highlight: "That Drives Your Business Forward",
    subtext: "Enterprise-grade software solutions from a lean team of skilled engineers. More value, affordable cost, powered by AI.",
    ctaPrimary: { label: "Get Started", to: "/contact" }, ctaSecondary: { label: "Our Services", to: "/services" },
    stats: [{ value: "50+", label: "Tech Professionals", icon: "Users" }, { value: "10+", label: "Countries Served", icon: "Globe" }, { value: "150+", label: "Projects Delivered", icon: "Award" }],
  },
  {
    badge: "Scale Your Dev Team", badgeIcon: "Users",
    headline: "Top 1% Bangladeshi Talents", highlight: "Ready in 4 Weeks",
    subtext: "Vetted AI & cloud experts, ISO-certified teams. Pay-per-talent flexibility with 90%+ employee retention rate.",
    ctaPrimary: { label: "Hire Your Team Now", to: "#" }, ctaSecondary: { label: "Learn More", to: "#" },
    stats: [{ value: "8+", label: "Years Experience", icon: "Building2" }, { value: "90%+", label: "Team Retention", icon: "Shield" }, { value: "ISO", label: "Certified Teams", icon: "Award" }],
  },
  {
    badge: "Digital Products", badgeIcon: "Rocket",
    headline: "Launch Your Product", highlight: "in 90 Days, Compliant",
    subtext: "From MVP to market-ready — fintech, e-commerce, enterprise SaaS. Full-cycle development with 100% IP protection.",
    ctaPrimary: { label: "Book a Demo", to: "#" }, ctaSecondary: { label: "View Products", to: "/products" },
    stats: [{ value: "90", label: "Days to Launch", icon: "Zap" }, { value: "100%", label: "IP Protection", icon: "Shield" }, { value: "10X", label: "Faster Delivery", icon: "Rocket" }],
  },
];

/* ───── Animated Counter ───── */

const AnimatedValue = ({ value }: { value: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Extract numeric part
    const match = value.match(/^(\d+)/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const target = parseInt(match[1]);
    const suffix = value.slice(match[1].length);

    if (hasAnimated.current) {
      setDisplay(value);
      return;
    }

    hasAnimated.current = true;
    const duration = 1500;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(eased * target) + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return (
    <div ref={ref} className="text-lg sm:text-xl lg:text-2xl font-bold gradient-text">
      {display}
    </div>
  );
};

/* ───── Hero Section ───── */

const HeroSection = () => {
  const { getSetting } = useSettings();
  const rawSlides = getSetting("hero_slides", defaultSlidesData);

  const slides: HeroSlide[] = useMemo(() =>
    rawSlides.map((s: any) => ({
      badge: s.badge,
      badgeIcon: iconMap[s.badgeIcon] || Sparkles,
      headline: s.headline,
      highlight: s.highlight,
      subtext: s.subtext,
      ctaPrimary: s.ctaPrimary,
      ctaSecondary: s.ctaSecondary,
      stats: s.stats.map((st: any) => ({
        value: st.value,
        label: st.label,
        icon: iconMap[st.icon] || Sparkles,
      })),
    })),
    [rawSlides]
  );

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const isPaused = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play
  useEffect(() => {
    if (isPaused.current) return;
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [next, current]);

  const handleMouseEnter = () => {
    isPaused.current = true;
    clearInterval(timerRef.current);
  };

  const handleMouseLeave = () => {
    isPaused.current = false;
  };

  const slide = slides[current];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section
      className="relative pt-16 md:pt-20 overflow-hidden min-h-[600px] md:min-h-[650px] lg:min-h-[700px]"
      style={{ paddingTop: "calc(var(--announcement-height, 0px) + 4rem)" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background */}
      <HeroParticles />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-[120px]" />

      <div className="container relative z-10 pt-10 sm:pt-12 pb-0 h-full">
        <div className="flex flex-col justify-between min-h-[500px] md:min-h-[550px]">
          {/* Content Area */}
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-3xl"
            >
              {/* Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-[10px] sm:text-xs font-medium text-primary">
                  <slide.badgeIcon size={12} />
                  {slide.badge}
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-bold leading-tight mb-4 sm:mb-6">
                {slide.headline}{" "}
                <span className="gradient-text">{slide.highlight}</span>
              </h1>

              {/* Subtext */}
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-6 sm:mb-8 max-w-2xl leading-relaxed">
                {slide.subtext}{" "}
                <span className="text-foreground font-medium">
                  #drivenByEngineers
                </span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={slide.ctaPrimary.to}>
                  <Button
                    size="lg"
                    className="gradient-bg border-0 text-primary-foreground hover:opacity-90 px-6 sm:px-8 h-10 sm:h-12 text-xs sm:text-sm"
                  >
                    {slide.ctaPrimary.label} <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to={slide.ctaSecondary.to}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-10 sm:h-12 text-xs sm:text-sm px-6 sm:px-8 border-border/50 hover:bg-secondary"
                  >
                    {slide.ctaSecondary.label}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Bar: Stats + Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-8">
            {/* Stats */}
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={`stats-${current}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="flex gap-6 sm:gap-10"
              >
                {slide.stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                      <stat.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <AnimatedValue value={stat.value} />
                      <div className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Slide Controls */}
            <div className="flex items-center gap-3">
              {/* Prev/Next */}
              <button
                onClick={prev}
                className="p-2 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-8 gradient-bg"
                        : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-2 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
