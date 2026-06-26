import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Code2, Cloud, Shield, Cpu, Globe, Layers, Rocket, Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { resolveIcon } from "@/data/navigation";
import SEO from "@/components/SEO";

const fallbackServices = [
  {
    slug: "enterprise-saas-development",
    icon: "Building2",
    title: "Enterprise & SaaS Solutions",
    description: "We architect and build large-scale, mission-critical software systems — CRM, HRM, ERP, inventory management, and custom enterprise platforms tailored to your unique workflows.",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Docker", "Kubernetes"],
    features: [
      "Custom ERP & CRM development",
      "Multi-tenant SaaS architecture",
      "Legacy system modernization",
      "API integration & middleware",
    ],
  },
  {
    slug: "web-mobile-applications",
    icon: "Smartphone",
    title: "Web & Mobile Applications",
    description: "Cross-platform mobile apps for Android & iOS alongside high-performance responsive web applications — built with modern frameworks for speed, reliability, and beautiful UX.",
    technologies: ["React Native", "Flutter", "Next.js", "TypeScript", "Firebase", "GraphQL"],
    features: [
      "Native & cross-platform mobile apps",
      "Progressive Web Apps (PWA)",
      "Real-time features & push notifications",
      "App Store optimization & deployment",
    ],
  },
  {
    slug: "uiux-motion-design",
    icon: "Palette",
    title: "UI/UX, Graphics & Motion",
    description: "Pixel-perfect interfaces, brand identity systems, and motion graphics that captivate users. We combine design thinking with engineering precision to create memorable digital experiences.",
    technologies: ["Figma", "After Effects", "Framer", "Lottie", "Tailwind CSS", "GSAP"],
    features: [
      "User research & wireframing",
      "Design system creation",
      "Brand identity & logo design",
      "Motion graphics & micro-interactions",
    ],
  },
  {
    slug: "technical-consultation",
    icon: "Lightbulb",
    title: "Consultation & Strategy",
    description: "Technical consulting, product roadmapping, and strategic planning to accelerate your digital transformation. We help you make the right technology decisions from day one.",
    technologies: ["Jira", "Notion", "Miro", "Analytics", "CI/CD", "Agile"],
    features: [
      "Technical architecture consulting",
      "Product roadmap planning",
      "Technology stack evaluation",
      "Team augmentation & training",
    ],
  },
];

const techIcons = [
  { icon: Code2, label: "Clean Code" },
  { icon: Cloud, label: "Cloud Native" },
  { icon: Shield, label: "Secure" },
  { icon: Cpu, label: "AI-Powered" },
  { icon: Globe, label: "Scalable" },
  { icon: Layers, label: "Modular" },
];

const Services = () => {
  const [serviceCategories, setServiceCategories] = useState(fallbackServices);

  useEffect(() => {
    api
      .services()
      .then((data: any[]) => {
        if (data && data.length > 0) {
          setServiceCategories(
            data.map((s) => ({
              slug: s.slug,
              icon: s.icon || "Code2",
              title: s.title,
              description: s.long_description || s.description || "",
              technologies: s.technologies || [],
              features: s.features || [],
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <SEO
        title="Our Services"
        description="Enterprise & SaaS development, web & mobile apps, staff augmentation, AI/ML, cloud & DevOps, and more — explore engineersTech's full service catalog."
        path="/services"
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
              <Rocket size={12} /> Our Expertise
            </span>
            <h1 className="font-bold leading-tight mb-6">
              Engineering Solutions{" "}
              <span className="gradient-text">That Scale</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              From enterprise platforms to mobile apps — we deliver end-to-end software solutions with clean architecture, AI-driven efficiency, and affordable pricing.
            </p>
          </motion.div>

          {/* Tech badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-3 mt-10"
          >
            {techIcons.map((t, i) => (
              <div
                key={t.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted-foreground"
              >
                <t.icon size={14} className="text-primary" />
                {t.label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      <section>
        <div className="container">
          <div className="space-y-10">
            {serviceCategories.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative group"
              >
                {/* Outer glow on hover */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/40 group-hover:via-accent/30 group-hover:to-primary/40 transition-all duration-500 blur-[1px]" />
                
                <div className="relative glass-card rounded-2xl overflow-hidden">
                  {/* Top accent bar */}
                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent group-hover:via-primary transition-all duration-500" />
                  
                  <div className="p-6 sm:p-8 md:p-10">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Left content */}
                      <div className="flex-1">
                        <div className="flex items-start gap-5 mb-6">
                          {/* Animated icon container */}
                          <div className="relative shrink-0">
                            <div className="absolute inset-0 rounded-xl gradient-bg blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
                            <div className="relative w-14 h-14 rounded-xl gradient-bg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              {(() => {
                                const Icon = resolveIcon(service.icon) || Code2;
                                return <Icon size={24} className="text-primary-foreground" />;
                              })()}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                              {service.title}
                            </h3>
                            <div className="h-[2px] w-0 group-hover:w-16 bg-primary/50 transition-all duration-500 rounded-full" />
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {service.description}
                        </p>

                        {/* Tech stack pills with subtle hover effect */}
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech, ti) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.08 + ti * 0.05 }}
                              className="px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-default"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>

                        {service.slug && (
                          <Link
                            to={`/services/${service.slug}`}
                            className="inline-flex items-center gap-1 mt-5 text-sm font-medium text-primary hover:underline"
                          >
                            Learn more <ArrowRight size={14} />
                          </Link>
                        )}
                      </div>

                      {/* Right: capabilities card */}
                      <div className="lg:w-80 shrink-0">
                        <div className="relative h-full rounded-xl overflow-hidden">
                          {/* Subtle gradient background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04]" />
                          <div className="absolute inset-0 border border-primary/10 rounded-xl" />
                          
                          <div className="relative p-6">
                            <h4 className="text-xs font-semibold text-primary mb-5 flex items-center gap-2 uppercase tracking-wider">
                              <div className="w-5 h-5 rounded-md gradient-bg flex items-center justify-center">
                                <Zap size={10} className="text-primary-foreground" />
                              </div>
                              Key Capabilities
                            </h4>
                            <ul className="space-y-4">
                              {service.features.map((feature, fi) => (
                                <motion.li
                                  key={feature}
                                  initial={{ opacity: 0, x: 10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: i * 0.08 + fi * 0.08 }}
                                  className="flex items-start gap-3 text-sm text-muted-foreground group/item"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-[7px] shrink-0 group-hover/item:shadow-[0_0_6px_hsl(214,100%,50%)] transition-shadow duration-300" />
                                  <span className="group-hover/item:text-foreground transition-colors duration-300">{feature}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



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
              Need a Custom Solution?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Every business is unique. Let's discuss how we can build the perfect software for yours.
            </p>
            <Link to="/contact">
              <Button size="lg" className="gradient-bg border-0 text-primary-foreground hover:opacity-90 px-8 h-12 text-base">
                Get Started <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
