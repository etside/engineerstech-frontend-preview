import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { resolveIcon } from "@/data/navigation";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1600&auto=format&fit=crop";

const IndustryDetail = () => {
  const { lang } = useLanguage();
  const { slug } = useParams();
  const [industry, setIndustry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api
      .industry(slug, lang)
      .then((data: any) => setIndustry(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug, lang]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 container">
        <div className="flex justify-center">
          <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !industry) {
    return (
      <div className="pt-32 pb-20 container text-center">
        <h1 className="text-2xl font-bold mb-4">Industry Not Found</h1>
        <Link to="/">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Button>
        </Link>
      </div>
    );
  }

  const Icon = resolveIcon(industry.icon);
  const features: string[] = industry.features || [];
  const color = industry.color || "#6366F1";
  const bgImage = industry.image_url || FALLBACK_IMAGE;

  return (
    <>
      <SEO
        title={`${industry.name} Solutions`}
        description={industry.description || `How engineersTech serves the ${industry.name} industry.`}
        path={`/industries/${industry.slug}`}
        lang={lang}
        image={bgImage}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Industry",
            name: industry.name,
            description: industry.description,
            url: `https://engineerstechbd.com/industries/${industry.slug}`,
            image: bgImage || undefined,
            provider: { "@type": "Organization", name: "engineersTech", url: "https://engineerstechbd.com" },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: industry.name, path: `/industries/${industry.slug}` },
          ]),
        ]}
      />
      {/* Full-bleed image hero with color-tinted overlay */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        <img loading="lazy" decoding="async" src={bgImage} alt={industry.name} className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${color}30 0%, transparent 50%, hsl(var(--background)) 95%)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />

        <div className="container relative z-10 pb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-5">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
              style={{ backgroundColor: `${color}30`, color }}
            >
              {Icon && <Icon className="h-3.5 w-3.5" />} Industry
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-white">{industry.name}</h1>
            <p className="text-base sm:text-lg text-white/70 max-w-xl">{industry.description}</p>
          </motion.div>
        </div>
      </section>

      <div className="container max-w-4xl py-16">
        {/* Long description (rich text) */}
        {industry.long_description && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rich-content text-center max-w-2xl mx-auto mb-14 text-base sm:text-lg text-foreground/80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: industry.long_description }}
          />
        )}

        {/* Gallery */}
        {industry.gallery?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <div className="grid sm:grid-cols-3 gap-3">
              {industry.gallery.map((img: string, i: number) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-[4/3] border border-border/20">
                  <img loading="lazy" decoding="async" src={img} alt={`${industry.name} ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Features as colored grid */}
        {features.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <h2 className="text-xl font-bold mb-6 text-center">What We Build</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 rounded-xl p-5 border"
                  style={{ borderColor: `${color}25`, backgroundColor: `${color}08` }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}25` }}>
                    <CheckCircle2 className="h-4 w-4" style={{ color }} />
                  </div>
                  <span className="text-sm text-foreground/85 pt-0.5">{f}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden text-center p-10 sm:p-14"
          style={{ background: `linear-gradient(135deg, ${color}20, transparent)` }}
        >
          <div className="absolute inset-0 border rounded-2xl" style={{ borderColor: `${color}30` }} />
          <div className="relative">
            <h3 className="text-2xl font-bold mb-3">Building for {industry.name}?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Let's talk about your project and how our domain expertise can help.
            </p>
            <Link to="/contact">
              <Button className="gradient-bg border-0 text-primary-foreground hover:opacity-90 px-8">
                Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <style>{`
        .rich-content p { margin: 0.5rem 0; }
        .rich-content h2 { font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; }
        .rich-content ul, .rich-content ol { padding-left: 1.5rem; margin: 0.5rem 0; text-align: left; }
        .rich-content a { color: hsl(var(--primary)); text-decoration: underline; }
        .rich-content img { max-width: 100%; border-radius: 8px; margin: 0.75rem auto; display: block; }
      `}</style>
    </>
  );
};

export default IndustryDetail;
