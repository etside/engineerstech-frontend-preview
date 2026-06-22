import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import SEO from "@/components/SEO";
import { api } from "@/lib/api";

interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  industry: string;
  client: string;
  summary: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  cover_image: string;
  color: string;
  duration: string;
}

const CaseStudies = () => {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    api
      .caseStudies()
      .then((data: any[]) => {
        const parsed = data.map((s) => ({
          ...s,
          tags: typeof s.tags === "string" ? JSON.parse(s.tags) : s.tags || [],
          metrics: typeof s.metrics === "string" ? JSON.parse(s.metrics) : s.metrics || [],
        }));
        setStudies(parsed);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Build filters with counts
  const filterMap = new Map<string, number>();
  studies.forEach((s) => {
    if (s.industry) filterMap.set(s.industry, (filterMap.get(s.industry) || 0) + 1);
  });
  const filters = [
    { label: "All", count: studies.length },
    ...Array.from(filterMap.entries()).map(([label, count]) => ({ label, count })),
  ];

  const filtered =
    activeFilter === "All"
      ? studies
      : studies.filter((s) => s.industry === activeFilter);

  if (loading) {
    return (
      <div className="pt-32 pb-20 container">
        <div className="flex justify-center">
          <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Case Studies"
        description="Real client results from engineersTech — explore how we've helped fintech, healthcare, e-commerce and more businesses ship software that works."
        path="/case-studies"
      />
      {/* Hero Section */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-[120px]" />

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary mb-4">
              Our Work
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Case Studies
            </h1>
            <p className="text-lg sm:text-xl gradient-text font-semibold mb-4">
              Proof that we deliver!
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We aim to deliver real outcomes through close collaboration, strategy alignment, and scalable product launches. Explore our work below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container pb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {filters.map((f) => (
            <button
              key={f.label}
              onClick={() => setActiveFilter(f.label)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeFilter === f.label
                  ? "gradient-bg text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/30"
              }`}
            >
              {f.label}{" "}
              <span className="opacity-60">({f.count})</span>
            </button>
          ))}
        </motion.div>
      </section>

      {/* Card Grid */}
      <section className="container pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filtered.map((study, i) => (
              <motion.div
                key={study.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Link
                  to={`/case-studies/${study.slug}`}
                  className="group block glass-card rounded-2xl overflow-hidden border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 h-full"
                >
                  {/* Cover Image / Color Bar */}
                  <div className="relative h-48 overflow-hidden">
                    {study.cover_image ? (
                      <img
                        src={study.cover_image}
                        alt={study.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${study.color}20, ${study.color}40)`,
                        }}
                      >
                        <span className="text-4xl font-bold opacity-20" style={{ color: study.color }}>
                          {study.industry?.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}

                    {/* Industry badge overlay */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-sm"
                        style={{
                          backgroundColor: `${study.color}cc`,
                          color: "white",
                        }}
                      >
                        {study.industry}
                      </span>
                    </div>

                    {/* Duration badge */}
                    {study.duration && (
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-medium px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white/80 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {study.duration}
                        </span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Tags */}
                    {study.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {study.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="text-[10px] text-muted-foreground/60 bg-secondary/50 px-2 py-0.5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {study.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-muted-foreground/70 leading-relaxed mb-4 line-clamp-2">
                      {study.summary}
                    </p>

                    {/* Metrics */}
                    {study.metrics?.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {study.metrics.map((m: any, j: number) => (
                          <div
                            key={j}
                            className="text-center p-1.5 rounded-lg bg-white/[0.02] border border-border/20"
                          >
                            <div className="text-xs font-bold gradient-text">{m.value}</div>
                            <div className="text-[9px] text-muted-foreground/50 mt-0.5">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary/60 group-hover:text-primary transition-colors">
                      Read case study{" "}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No case studies found for this industry.
          </p>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="pb-20">
        <div className="container">
          <div className="glass-card rounded-2xl p-8 sm:p-12 text-center border border-border/30">
            <h2 className="text-2xl font-bold mb-3">Ready to Scale Your Team?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-6">
              Resource augmentation and AI-powered development can accelerate your project delivery. Let's talk.
            </p>
            <Link to="/contact">
              <span className="gradient-bg text-primary-foreground px-8 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2">
                Schedule a Call <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;
