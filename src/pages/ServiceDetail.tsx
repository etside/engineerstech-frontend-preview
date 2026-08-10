import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { resolveIcon } from "@/data/navigation";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop";

const ServiceDetail = () => {
  const { lang } = useLanguage();
  const { slug } = useParams();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api
      .service(slug, lang)
      .then((data: any) => setService(data))
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

  if (error || !service) {
    return (
      <div className="pt-32 pb-20 container text-center">
        <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
        <Link to="/services">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Services</Button>
        </Link>
      </div>
    );
  }

  const Icon = resolveIcon(service.icon);
  const features: string[] = service.features || [];
  const technologies: string[] = service.technologies || [];
  const heroImage = service.hero_image || FALLBACK_IMAGE;

  return (
    <>
      <SEO
        title={service.title}
        description={service.description || `Learn about engineersTech's ${service.title} service.`}
        path={`/services/${service.slug}`}
        lang={lang}
        image={heroImage}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.long_description || service.description,
            provider: { "@type": "Organization", name: "engineersTech", url: "https://engineerstechbd.com" },
            areaServed: "Worldwide",
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      {/* Split hero: image left, content right */}
      <section className="pt-16 md:pt-20 relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[420px]">
          {/* Image side */}
          <div className="relative h-64 lg:h-auto order-1">
            <img loading="lazy" decoding="async"
              src={heroImage}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background" />
          </div>

          {/* Content side */}
          <div className="order-2 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-10 lg:py-0">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
                <ArrowLeft className="h-4 w-4" /> All Services
              </Link>

              <div className="flex items-center gap-4 mb-4">
                {Icon && (
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                )}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{service.title}</h1>
              </div>
              <p className="text-base text-muted-foreground max-w-lg">{service.description}</p>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/contact">
                  <Button className="gradient-bg border-0 text-primary-foreground hover:opacity-90 px-6">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href="tel:+8801314443311">
                  <Button variant="outline" className="px-6">
                    <Phone className="mr-2 h-4 w-4" /> Talk to Us
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container max-w-5xl py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-10">
            {service.long_description && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-xl font-bold mb-3">Overview</h2>
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">{service.long_description}</p>
              </motion.div>
            )}

            {technologies.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-xl font-bold mb-4">Technologies We Use</h2>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span key={tech} className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar: features + sticky CTA */}
          <div className="space-y-6">
            {features.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="glass-card rounded-xl p-5 border border-border/30">
                <h3 className="text-sm font-bold mb-4 uppercase tracking-wide text-primary">What's Included</h3>
                <ul className="space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="glass-card rounded-xl p-6 border border-primary/20 bg-primary/5 text-center sticky top-24">
              <h3 className="font-bold mb-2">Need this for your business?</h3>
              <p className="text-xs text-muted-foreground mb-4">Let's discuss your project requirements.</p>
              <Link to="/contact">
                <Button className="gradient-bg border-0 text-primary-foreground hover:opacity-90 w-full">
                  Start Your Project
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetail;
