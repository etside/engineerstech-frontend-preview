import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  FileText, Download, ArrowRight, BookOpen, Briefcase, Sparkles,
  CheckCircle2, Mail, Loader2, ShieldCheck, Leaf, Newspaper, UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";
import { api } from "@/lib/api";

const recognitions = [
  { label: "Enterprise-Grade Security", description: "ISO certified & compliant infrastructure, encrypted data handling across every project.", icon: ShieldCheck, color: "#10B981", to: "/about" },
  { label: "Sustainability", description: "Remote-first delivery model, optimized cloud usage — our commitment to a lighter footprint.", icon: Leaf, color: "#22C55E", to: "/about" },
  { label: "Media", description: "Press releases, feature coverage, and announcements from engineersTech.", icon: Newspaper, color: "#3B82F6", to: "/blog" },
  { label: "Join as Partner", description: "Technology & business partnerships — let's build something together.", icon: UserPlus, color: "#8B5CF6", to: "/contact" },
];

const typeIcons: Record<string, any> = {
  whitepaper: FileText,
  guide: BookOpen,
  ebook: Sparkles,
  template: Briefcase,
};

const ResourceCard = ({ resource, i }: { resource: any; i: number }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const Icon = typeIcons[resource.type] || FileText;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    try {
      const res = await api.requestResource(resource.id, { name, email });
      setDone(true);
      if (res.file_url && res.file_url !== "#") {
        window.open(res.file_url, "_blank", "noopener,noreferrer");
      }
    } catch {
      // silent — keep UI showing form
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07, duration: 0.4 }}
      className="glass-card rounded-2xl overflow-hidden border border-border/30 hover:border-primary/30 transition-all duration-300 group"
    >
      {resource.cover_image && (
        <div className="h-40 overflow-hidden relative">
          <img loading="lazy" decoding="async" src={resource.cover_image} alt={resource.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
          <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-wider">
            <Icon className="h-3 w-3" /> {resource.type}
          </span>
        </div>
      )}

      <div className="p-6">
        <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">{resource.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{resource.description}</p>

        {!open && !done && (
          <Button size="sm" onClick={() => setOpen(true)} className="gradient-bg border-0 text-primary-foreground hover:opacity-90 w-full">
            <Download className="mr-1.5 h-3.5 w-3.5" /> Get Free Access
          </Button>
        )}

        {open && !done && (
          <form onSubmit={handleSubmit} className="space-y-2">
            <Input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 text-sm"
            />
            <Input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9 text-sm"
            />
            <Button type="submit" size="sm" disabled={submitting} className="gradient-bg border-0 text-primary-foreground hover:opacity-90 w-full">
              {submitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <><Mail className="mr-1.5 h-3.5 w-3.5" /> Send Me This</>}
            </Button>
          </form>
        )}

        {done && (
          <div className="flex items-center gap-2 text-sm text-green-400 font-medium py-2">
            <CheckCircle2 className="h-4 w-4" /> Sent! Check your new tab / inbox.
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Resources = () => {
  const location = useLocation();
  const [resources, setResources] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.resources().catch(() => []),
      api.blog().catch(() => []),
      api.caseStudies().catch(() => []),
    ]).then(([res, blog, cases]) => {
      setResources(res || []);
      setBlogPosts((blog || []).slice(0, 3));
      setCaseStudies((cases || []).slice(0, 3));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading && location.hash) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [loading, location.hash]);

  return (
    <div className="pt-28 pb-20">
      <SEO
        title="Resources"
        description="Whitepapers, guides, case studies and blog round-ups from engineersTech — practical insights on enterprise software, SaaS, and digital transformation."
        path="/resources"
      />
      {/* Hero */}
      <section className="container relative overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] -z-10" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary mb-4">
            <Sparkles className="h-3 w-3" /> Resource Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Insights & Tools to <span className="gradient-text">Build Smarter</span>
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Free whitepapers, guides, and real engineering case studies — everything we've learned shipping production software, shared.
          </p>
        </motion.div>
      </section>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Whitepapers / guides */}
          {resources.length > 0 && (
            <section className="container mb-20">
              <h2 className="text-xl font-bold mb-6">Whitepapers & Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {resources.map((r, i) => (
                  <ResourceCard key={r.id} resource={r} i={i} />
                ))}
              </div>
            </section>
          )}

          {/* Case study round-up */}
          {caseStudies.length > 0 && (
            <section className="container mb-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Real Engineering Case Studies</h2>
                <Link to="/case-studies" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View all <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {caseStudies.map((cs, i) => (
                  <motion.div key={cs.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <Link to={`/case-studies/${cs.slug}`} className="glass-card rounded-xl p-5 border border-border/30 hover:border-primary/30 transition-all block h-full">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md" style={{ backgroundColor: `${cs.color || "#6366F1"}20`, color: cs.color || "#6366F1" }}>
                        {cs.industry}
                      </span>
                      <h3 className="font-semibold mt-3 mb-2">{cs.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-3">{cs.summary}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Blog round-up */}
          {blogPosts.length > 0 && (
            <section className="container mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">From the Blog</h2>
                <Link to="/blog" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View all <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {blogPosts.map((post, i) => (
                  <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <Link to={`/blog/${post.slug}`} className="glass-card rounded-xl overflow-hidden border border-border/30 hover:border-primary/30 transition-all block h-full">
                      {post.cover_image && (
                        <div className="h-32 overflow-hidden">
                          <img loading="lazy" decoding="async" src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="p-4">
                        {post.category && <span className="text-[10px] text-primary font-medium uppercase tracking-wider">{post.category}</span>}
                        <h3 className="font-semibold mt-1 text-sm">{post.title}</h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Company & Trust */}
          <section id="recognitions" className="container mb-16">
            <h2 className="text-xl font-bold mb-6">Company & Recognitions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {recognitions.map((r, i) => (
                <motion.div key={r.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <Link to={r.to} className="glass-card rounded-xl p-5 border border-border/30 hover:border-primary/30 transition-all block h-full">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${r.color}15` }}>
                      <r.icon className="h-5 w-5" style={{ color: r.color }} />
                    </div>
                    <h3 className="text-sm font-semibold mb-1.5">{r.label}</h3>
                    <p className="text-xs text-muted-foreground/70 leading-relaxed">{r.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 sm:p-12 text-center border border-border/30">
          <h3 className="text-2xl font-bold mb-3">Need Hands-On Help, Not Just Reading?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Let's talk about your project — we'll bring the engineering, you bring the vision.
          </p>
          <Link to="/contact">
            <Button className="gradient-bg border-0 text-primary-foreground hover:opacity-90 px-8">
              Talk to Our Team <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Resources;
