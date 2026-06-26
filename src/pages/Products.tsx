import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, Rocket, CheckCircle2, Sparkles, Star,
  Quote, X, Check, Minus,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { api } from "@/lib/api";

const stats = [
  { value: "7+", label: "Products Live" },
  { value: "50K+", label: "Daily Transactions Powered" },
  { value: "100%", label: "Source Code Ownership" },
  { value: "24/7", label: "Support & Maintenance" },
];

const comparison = [
  { label: "Time to launch", us: "Weeks, not months", diy: "6-12 months", generic: "Days, but rigid" },
  { label: "Source code ownership", us: true, diy: true, generic: false },
  { label: "Custom branding & features", us: true, diy: true, generic: false },
  { label: "Ongoing engineering support", us: true, diy: false, generic: "Limited" },
  { label: "Upfront cost", us: "Moderate", diy: "High", generic: "Low" },
];

const ComparisonCell = ({ value }: { value: boolean | string }) => {
  if (value === true) return <Check className="h-4 w-4 text-green-400 mx-auto" />;
  if (value === false) return <X className="h-4 w-4 text-destructive/60 mx-auto" />;
  return <span className="text-xs text-muted-foreground">{value}</span>;
};

const colorPalette = [
  { gradient: "from-pink-500/20 to-purple-500/20", border: "group-hover:border-pink-500/30" },
  { gradient: "from-orange-500/20 to-red-500/20", border: "group-hover:border-orange-500/30" },
  { gradient: "from-sky-500/20 to-blue-500/20", border: "group-hover:border-sky-500/30" },
  { gradient: "from-green-500/20 to-emerald-500/20", border: "group-hover:border-green-500/30" },
  { gradient: "from-amber-500/20 to-yellow-500/20", border: "group-hover:border-amber-500/30" },
  { gradient: "from-violet-500/20 to-indigo-500/20", border: "group-hover:border-violet-500/30" },
  { gradient: "from-teal-500/20 to-cyan-500/20", border: "group-hover:border-teal-500/30" },
];

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.products().catch(() => []),
      api.testimonials().catch(() => []),
    ]).then(([prods, tests]) => {
      setProducts(prods || []);
      setTestimonials((tests || []).slice(0, 3));
      setLoading(false);
    });
  }, []);

  const spotlight = products[0];
  const restProducts = products.slice(1);

  return (
    <>
      <SEO
        title="Products"
        description="Ready-to-deploy SaaS products from engineersTech — GlowUp, Restaurant POS, HRM Suite, CRM Platform and more, with full source code ownership and 24/7 support."
        path="/products"
      />
      {/* Hero */}
      <section className="relative pt-16 md:pt-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.08]" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-[120px]" />

        <div className="container relative z-10 pt-10 sm:pt-12 pb-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs font-medium text-primary mb-6">
              <Rocket size={12} /> Our Products
            </span>
            <h1 className="font-bold leading-tight mb-6">
              Ready-to-Deploy{" "}
              <span className="gradient-text">SaaS Products</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Production-ready software products built by our engineers — customizable and scalable for your specific business needs.
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 mb-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Spotlight product */}
          {spotlight && (
            <section className="container py-12">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden glass-card border border-primary/20">
                <div className="grid lg:grid-cols-2">
                  {spotlight.image_url && (
                    <div className="h-56 lg:h-auto order-1 lg:order-none">
                      <img loading="lazy" decoding="async" src={spotlight.image_url} alt={spotlight.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-8 sm:p-10 flex flex-col justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                      <Star className="h-3 w-3" /> Flagship Product
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3">{spotlight.name}</h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">{spotlight.description}</p>
                    {spotlight.features?.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {spotlight.features.slice(0, 4).map((f: string) => (
                          <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 size={12} className="text-primary shrink-0" /> {f}
                          </div>
                        ))}
                      </div>
                    )}
                    <Link to={`/products/${spotlight.slug}`}>
                      <Button className="gradient-bg border-0 text-primary-foreground hover:opacity-90 w-fit px-6">
                        Explore {spotlight.name} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </section>
          )}

          {/* Products Grid */}
          <section>
            <div className="container">
              <h2 className="text-xl font-bold mb-6">More Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {restProducts.map((product, i) => {
                const c = colorPalette[i % colorPalette.length];
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/0 to-accent/0 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-500 blur-[1px]" />

                    <Link
                      to={`/products/${product.slug}`}
                      className={`relative block glass-card rounded-2xl overflow-hidden ${c.border} transition-all duration-300`}
                    >
                      {product.image_url && (
                        <div className="h-40 overflow-hidden">
                          <img loading="lazy" decoding="async" src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:via-primary transition-all duration-500" />

                      <div className="p-6 sm:p-8">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              <Sparkles size={20} className="text-foreground" />
                            </div>
                            <div>
                              <h3 className="font-bold group-hover:text-primary transition-colors">{product.name}</h3>
                              {product.category && <p className="text-xs text-muted-foreground">{product.category}</p>}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                          {product.description}
                        </p>

                        {/* Features */}
                        {product.features?.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 mb-6">
                            {product.features.map((feature: string) => (
                              <div key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <CheckCircle2 size={12} className="text-primary shrink-0" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Action */}
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary group-hover:underline">
                          View Details <ArrowUpRight size={12} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
              </div>
            </div>
          </section>

          {/* Comparison: Us vs DIY vs Generic SaaS */}
          <section className="container py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Why Build With Us?</h2>
              <p className="text-sm text-muted-foreground">Compared to building in-house or settling for generic SaaS.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="glass-card rounded-2xl border border-border/30 overflow-hidden max-w-3xl mx-auto">
              <div className="grid grid-cols-4 text-xs sm:text-sm font-semibold border-b border-border/30 bg-white/[0.02]">
                <div className="p-3 sm:p-4"></div>
                <div className="p-3 sm:p-4 text-center text-primary">engineersTech</div>
                <div className="p-3 sm:p-4 text-center text-muted-foreground">In-House</div>
                <div className="p-3 sm:p-4 text-center text-muted-foreground">Generic SaaS</div>
              </div>
              {comparison.map((row, i) => (
                <div key={row.label} className={`grid grid-cols-4 text-xs sm:text-sm ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}>
                  <div className="p-3 sm:p-4 text-muted-foreground">{row.label}</div>
                  <div className="p-3 sm:p-4 text-center"><ComparisonCell value={row.us} /></div>
                  <div className="p-3 sm:p-4 text-center"><ComparisonCell value={row.diy} /></div>
                  <div className="p-3 sm:p-4 text-center"><ComparisonCell value={row.generic} /></div>
                </div>
              ))}
            </motion.div>
          </section>

          {/* Social proof */}
          {testimonials.length > 0 && (
            <section className="container py-12">
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-10">What Clients Say</h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {testimonials.map((t, i) => (
                  <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="glass-card rounded-xl p-6 border border-border/30">
                    <Quote className="h-5 w-5 text-primary/40 mb-3" />
                    <p className="text-sm text-foreground/80 leading-relaxed mb-4">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      {t.photo_url ? (
                        <img loading="lazy" decoding="async" src={t.photo_url} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {t.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-semibold">{t.name}</p>
                        <p className="text-[10px] text-muted-foreground">{t.role}{t.company ? `, ${t.company}` : ""}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* Bottom CTA */}
      <section>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-bold mb-4">
              Need Something <span className="gradient-text">Custom</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Don't see exactly what you need? We can customize any product or build something entirely new for your business.
            </p>
            <Link to="/contact">
              <Button size="lg" className="gradient-bg border-0 text-primary-foreground hover:opacity-90 px-8 h-12">
                Get Started <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Products;
