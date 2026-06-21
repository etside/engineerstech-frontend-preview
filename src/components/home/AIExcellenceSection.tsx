import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { BrainCircuit, Bug, Gauge, Rocket, type LucideIcon } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const iconMap: Record<string, LucideIcon> = { BrainCircuit, Bug, Gauge, Rocket };

const defaultMetrics = [
  { value: 70, suffix: "%", label: "Faster Development", subtitle: "Intelligent Coding", description: "AI-powered code synthesis, auto-completion, and smart refactoring", icon: "BrainCircuit", color: "#6366F1" },
  { value: 99.9, suffix: "%", label: "Defect-Free Releases", subtitle: "Bulletproof QA", description: "Self-learning test suites, automated bug detection & fixes", icon: "Bug", color: "#10B981" },
  { value: 40, suffix: "%", label: "Higher Efficiency", subtitle: "Peak Performance", description: "ML algorithms optimize resource allocation & sprint planning", icon: "Gauge", color: "#F59E0B" },
  { value: 90, suffix: "%", label: "Faster Deployments", subtitle: "Zero-Downtime DevOps", description: "AI-driven CI/CD pipelines with predictive rollback", icon: "Rocket", color: "#EF4444" },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      // Handle decimal targets like 99.9
      const current = eased * target;
      setCount(target % 1 !== 0 ? parseFloat(current.toFixed(1)) : Math.round(current));

      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text">
      {count}{suffix}
    </div>
  );
};

const AIExcellenceSection = () => {
  const { getSetting } = useSettings();
  const raw = getSetting("ai_metrics", defaultMetrics);

  const metrics = useMemo(() =>
    raw.map((item: any) => ({
      ...item,
      Icon: iconMap[item.icon] || BrainCircuit,
    })),
    [raw]
  );

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-primary/5 blur-[180px]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary mb-4">
            <BrainCircuit className="h-3 w-3" /> AI-Powered
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            AI-Driven <span className="gradient-text">Development Excellence</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            We integrate AI across the entire development lifecycle — delivering 10X faster without compromising quality.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group glass-card rounded-2xl p-6 border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 text-center"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.Icon className="h-6 w-6" style={{ color: item.color }} />
              </div>

              {/* Counter */}
              <AnimatedCounter target={item.value} suffix={item.suffix} />

              {/* Labels */}
              <h3 className="text-sm font-semibold mt-2 mb-1">{item.label}</h3>
              <p className="text-[11px] font-medium text-primary/60 uppercase tracking-wider mb-3">
                {item.subtitle}
              </p>
              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIExcellenceSection;
