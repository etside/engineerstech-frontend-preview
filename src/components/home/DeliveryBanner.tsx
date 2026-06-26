import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { Zap, ShieldCheck, Users, ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";

const iconMap: Record<string, LucideIcon> = { Zap, ShieldCheck, Users };

const defaultStats = [
  { value: 2500, suffix: "+", label: "Projects Delivered", icon: "Zap" },
  { value: 100, suffix: "%", label: "IP Protection", icon: "ShieldCheck" },
  { value: 1, suffix: "%", label: "Top Talent", icon: "Users", prefix: "Top " },
];

const AnimatedCounter = ({
  target,
  suffix,
  prefix,
}: {
  target: number;
  suffix: string;
  prefix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  const prefixStr = prefix ? (prefix.endsWith(" ") ? prefix : prefix + " ") : "";

  return (
    <span ref={ref} className="text-2xl sm:text-3xl lg:text-4xl font-bold">
      {prefixStr}{count}{suffix}
    </span>
  );
};

const DeliveryBanner = () => {
  const { getSetting } = useSettings();
  const raw = getSetting("delivery_stats", defaultStats);

  const stats = useMemo(() =>
    raw.map((item: any) => ({
      ...item,
      Icon: iconMap[item.icon] || Zap,
    })),
    [raw]
  );

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Main content */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left: Headline */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  10X Faster Delivery
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                AI-Leveraged Solutions{" "}
                <span className="gradient-text">Without Compromising Quality</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-lg">
                We combine AI tools with engineering expertise to deliver enterprise-grade software at startup speed.
              </p>
            </div>

            {/* Right: Stats + CTA */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-8 sm:gap-12">
                {stats.map((stat: any) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <stat.Icon className="h-4 w-4 text-primary" />
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                      />
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link to="/contact">
                <Button className="gradient-bg border-0 text-primary-foreground hover:opacity-90 px-6 h-10 text-sm">
                  Start Your Project <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DeliveryBanner;
