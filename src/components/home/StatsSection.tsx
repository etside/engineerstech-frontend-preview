import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 25, suffix: "+", label: "Team Members" },
  { value: 50, suffix: "+", label: "Clients Served" },
];

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
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
      // easeOutQuart for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
      {count}{suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <CountUp target={stat.value} suffix={stat.suffix} />
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
