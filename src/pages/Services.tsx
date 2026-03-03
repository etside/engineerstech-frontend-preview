import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Monitor, Smartphone, Palette, LineChart, ArrowRight,
  Database, ShoppingCart, Plane, Users, Hotel, BarChart3, MapPin, Sparkles,
  Code2, Cloud, Shield, Cpu, Globe, Layers, Rocket, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

const serviceCategories = [
  {
    icon: Monitor,
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
    icon: Smartphone,
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
    icon: Palette,
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
    icon: LineChart,
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

const saasProducts = [
  {
    icon: Sparkles,
    name: "GlowUp",
    description: "All-in-one beauty & wellness business management platform with booking, POS, and client management.",
    color: "from-pink-500/20 to-purple-500/20",
    link: "#",
  },
  {
    icon: ShoppingCart,
    name: "Restaurant POS",
    description: "Complete point-of-sale system for restaurants with order management, kitchen display, and analytics.",
    color: "from-orange-500/20 to-red-500/20",
    link: "#",
  },
  {
    icon: Plane,
    name: "Tour Booking",
    description: "End-to-end tour and travel booking platform with itinerary builder, payments, and customer portal.",
    color: "from-sky-500/20 to-blue-500/20",
    link: "#",
  },
  {
    icon: Users,
    name: "HRM System",
    description: "Human resource management with attendance, payroll, leave management, and performance tracking.",
    color: "from-green-500/20 to-emerald-500/20",
    link: "#",
  },
  {
    icon: Hotel,
    name: "Hotel Booking",
    description: "Hotel reservation and property management system with channel manager and revenue optimization.",
    color: "from-amber-500/20 to-yellow-500/20",
    link: "#",
  },
  {
    icon: BarChart3,
    name: "CRM Platform",
    description: "Customer relationship management with sales pipeline, lead tracking, and automated follow-ups.",
    color: "from-violet-500/20 to-indigo-500/20",
    link: "#",
  },
  {
    icon: MapPin,
    name: "Staff Tracking",
    description: "Field staff tracking and task management with GPS, geofencing, and real-time reporting.",
    color: "from-teal-500/20 to-cyan-500/20",
    link: "#",
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
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.08]" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 rounded-full bg-accent/10 blur-[120px]" />

        <div className="container relative z-10">
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
      <section className="py-20">
        <div className="container">
          <div className="space-y-8">
            {serviceCategories.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-8 md:p-10 hover:border-primary/30 transition-all group"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-6">
                      <service.icon size={26} className="text-primary-foreground" />
                    </div>
                    <h3 className="font-bold mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground border border-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:w-80 shrink-0">
                    <div className="bg-secondary/50 rounded-xl p-6 h-full">
                      <h4 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
                        <Zap size={14} /> Key Capabilities
                      </h4>
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SaaS Products */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-bold mb-4">
              Our <span className="gradient-text">SaaS Products</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ready-to-deploy software products built by our engineers — customizable for your specific business needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {saasProducts.map((product, i) => (
              <motion.a
                key={product.name}
                href={product.link}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all group block"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <product.icon size={22} className="text-foreground" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
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
                Let's Talk <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
