import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Users, CheckCircle2, Target, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const [study, setStudy] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    api
      .caseStudy(slug)
      .then((data: any) => {
        const parsed = {
          ...data,
          tags: typeof data.tags === "string" ? JSON.parse(data.tags) : data.tags || [],
          metrics: typeof data.metrics === "string" ? JSON.parse(data.metrics) : data.metrics || [],
          tech_stack: typeof data.tech_stack === "string" ? JSON.parse(data.tech_stack) : data.tech_stack || [],
        };
        setStudy(parsed);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 container">
        <div className="flex justify-center">
          <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !study) {
    return (
      <div className="pt-32 pb-20 container text-center">
        <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
        <Link to="/case-studies">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies</Button>
        </Link>
      </div>
    );
  }

  const sections = [
    { title: "The Challenge", content: study.challenge, icon: Target, color: "#EF4444" },
    { title: "Our Solution", content: study.solution, icon: CheckCircle2, color: "#10B981" },
    { title: "The Results", content: study.results, icon: Layers, color: "#8B5CF6" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: `linear-gradient(135deg, ${study.color}40, transparent)` }}
        />
        <div className="container relative z-10 max-w-4xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" /> All Case Studies
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md" style={{ backgroundColor: `${study.color}20`, color: study.color }}>
                {study.industry}
              </span>
              {study.duration && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {study.duration}
                </span>
              )}
              {study.client && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" /> {study.client}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{study.title}</h1>
          </motion.div>
        </div>
      </section>

      <div className="container max-w-4xl pb-20">
        {/* Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 mb-10 border border-border/30">
          <p className="text-base text-foreground/80 leading-relaxed">{study.summary}</p>
        </motion.div>

        {/* Metrics */}
        {study.metrics?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-4 mb-10">
            {study.metrics.map((m: any, i: number) => (
              <div key={i} className="glass-card rounded-xl p-5 text-center border border-border/30 hover:border-primary/20 transition-colors">
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{m.value}</div>
                <div className="text-xs text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Challenge / Solution / Results */}
        {sections.map((section, i) =>
          section.content ? (
            <motion.div key={section.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${section.color}15` }}>
                  <section.icon className="h-5 w-5" style={{ color: section.color }} />
                </div>
                <h2 className="text-xl font-bold">{section.title}</h2>
              </div>
              <div className="glass-card rounded-xl p-6 border border-border/30">
                <div className="text-sm text-foreground/80 leading-relaxed rich-content" dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            </motion.div>
          ) : null
        )}

        {/* Tech Stack */}
        {study.tech_stack?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mb-10">
            <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {study.tech_stack.map((tech: string) => (
                <span key={tech} className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/10">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tags */}
        {study.tags?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mb-12">
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs border border-border/20">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          className="glass-card rounded-2xl p-8 sm:p-12 text-center border border-border/30">
          <h3 className="text-2xl font-bold mb-3">Want similar results?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Let's discuss how we can help transform your business with technology.
          </p>
          <Link to="/contact">
            <Button className="gradient-bg border-0 text-primary-foreground hover:opacity-90 px-8">
              Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Rich content styles */}
      <style>{`
        .rich-content h2 { font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; }
        .rich-content h3 { font-size: 1.1rem; font-weight: 600; margin: 0.75rem 0 0.5rem; }
        .rich-content p { margin: 0.5rem 0; }
        .rich-content ul, .rich-content ol { padding-left: 1.5rem; margin: 0.5rem 0; }
        .rich-content ul { list-style-type: disc; }
        .rich-content ol { list-style-type: decimal; }
        .rich-content li { margin: 0.25rem 0; }
        .rich-content blockquote { border-left: 3px solid hsl(var(--primary)); padding-left: 1rem; margin: 0.75rem 0; color: hsl(var(--muted-foreground)); font-style: italic; }
        .rich-content strong { font-weight: 600; }
        .rich-content a { color: hsl(var(--primary)); text-decoration: underline; }
      `}</style>
    </>
  );
};

export default CaseStudyDetail;
