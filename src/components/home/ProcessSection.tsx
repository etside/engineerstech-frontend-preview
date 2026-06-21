import { motion } from "framer-motion";
import { Search, Users, Code2, Rocket, ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import { useMemo } from "react";

const iconMap: Record<string, LucideIcon> = { Search, Users, Code2, Rocket };

const defaultSteps = [
  { step: "01", icon: "Search", title: "Discovery & Audit", subtitle: "Zero-risk assessment", points: ["Free 60-min strategy session", "AI-powered scoping & estimation", "Tailored roadmap for your goals"] },
  { step: "02", icon: "Users", title: "Team Onboarding", subtitle: "Right talent from day one", points: ["Vetted engineers matched to your stack", "Dedicated project manager", "Sprint planning & dashboard access"] },
  { step: "03", icon: "Code2", title: "Build & Test", subtitle: "Agile, transparent delivery", points: ["AI-assisted development (70% faster)", "Automated QA & code reviews", "Weekly demos & progress reports"] },
  { step: "04", icon: "Rocket", title: "Launch & Scale", subtitle: "Your growth, automated", points: ["CI/CD pipeline & cloud deployment", "90-day post-launch support", "Performance monitoring & scaling"] },
];

const ProcessSection = () => {
  const { getSetting } = useSettings();
  const raw = getSetting("process_steps", defaultSteps);

  const steps = useMemo(() =>
    raw.map((item: any) => ({
      ...item,
      Icon: iconMap[item.icon] || Search,
    })),
    [raw]
  );

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary mb-4">
            Our Process
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            AI-Optimized, <span className="gradient-text">Transparent, Scalable</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            We blend human expertise with AI precision — delivering faster, smarter, and with full transparency at every step.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((item: any, i: number) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative group"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] right-[-40px] h-[1px]">
                  <div className="h-full bg-gradient-to-r from-primary/30 to-transparent" />
                  <ArrowRight className="absolute -right-1 top-1/2 -translate-y-1/2 h-3 w-3 text-primary/30" />
                </div>
              )}

              <div className="relative glass-card rounded-2xl p-6 h-full border border-border/30 hover:border-primary/20 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/5">
                <div className="absolute -top-3 -right-2 text-[64px] font-black text-primary/[0.04] leading-none select-none pointer-events-none">
                  {item.step}
                </div>

                <div className="relative mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>

                <div className="relative">
                  <p className="text-xs font-semibold text-primary/60 uppercase tracking-wider mb-1">
                    Step {item.step}
                  </p>
                  <h3 className="text-base sm:text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{item.subtitle}</p>

                  <ul className="space-y-2">
                    {item.points.map((point: string) => (
                      <li key={point} className="flex items-start gap-2 text-xs text-muted-foreground/80">
                        <span className="mt-1 w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/contact">
            <Button size="lg" className="gradient-bg border-0 text-primary-foreground hover:opacity-90 px-8 h-12 text-sm">
              Start Your Project <ArrowRight size={16} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
