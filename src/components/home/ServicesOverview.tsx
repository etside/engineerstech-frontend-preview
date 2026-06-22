import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Monitor, Smartphone, Palette, LineChart, Code2, type LucideIcon } from "lucide-react";
import { api } from "@/lib/api";
import { useState, useEffect } from "react";

const iconMap: Record<string, LucideIcon> = {
  Monitor, Smartphone, Palette, LineChart, Code2,
};

const fallback = [
  { title: "Enterprise & SaaS Solutions", description: "CRM, HRM, ERP and every type of large-scale customized software built for your business operations.", icon: "Monitor" },
  { title: "Web & Mobile Apps", description: "Cross-platform Android & iOS applications alongside responsive web apps that perform flawlessly.", icon: "Smartphone" },
  { title: "UI/UX, Graphics & Motion", description: "Pixel-perfect interfaces, brand identity design, and engaging motion graphics that captivate users.", icon: "Palette" },
  { title: "Consultation & Strategy", description: "Technical consulting, product roadmapping, and strategic planning to accelerate your digital transformation.", icon: "LineChart" },
];

const ServicesOverview = () => {
  const [services, setServices] = useState(fallback);

  useEffect(() => {
    api
      .services({ featured: true })
      .then((data: any[]) => {
        if (data && data.length > 0) {
          setServices(
            data.map((s) => ({
              title: s.title,
              description: s.description,
              icon: s.icon || "Monitor",
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-bold mb-4">
            What We <span className="gradient-text">Deliver</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            End-to-end engineering solutions that transform ideas into scalable products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Monitor;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-5">
                  <Icon size={22} className="text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
