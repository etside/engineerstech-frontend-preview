import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Wallet, HeartPulse, ShoppingCart, GraduationCap, Radio, Building2, Store, Zap, type LucideIcon } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { api } from "@/lib/api";

const iconMap: Record<string, LucideIcon> = {
  Wallet, HeartPulse, ShoppingCart, GraduationCap, Radio, Building2, Store, Zap,
};

const defaultIndustries = [
  { name: "Fintech", slug: "fintech", description: "Payments, lending, digital banking solutions", icon: "Wallet", color: "#10B981" },
  { name: "Healthcare", slug: "healthcare", description: "Telemedicine, health records, compliance", icon: "HeartPulse", color: "#EF4444" },
  { name: "E-Commerce", slug: "e-commerce", description: "Custom stores, marketplace, payment integration", icon: "ShoppingCart", color: "#F59E0B" },
  { name: "Education", slug: "education", description: "LMS, edtech platforms, assessments", icon: "GraduationCap", color: "#8B5CF6" },
  { name: "Telecom", slug: "telecom", description: "Enterprise-grade telecom solutions", icon: "Radio", color: "#06B6D4" },
  { name: "Real Estate", slug: "real-estate", description: "Property management, CRM systems", icon: "Building2", color: "#EC4899" },
  { name: "Retail", slug: "retail", description: "Inventory, omnichannel, POS systems", icon: "Store", color: "#F97316" },
  { name: "Startups", slug: "startups", description: "MVPs, product-market fit, scaling", icon: "Zap", color: "#6366F1" },
];

const IndustriesSection = () => {
  const [raw, setRaw] = useState<any[]>(defaultIndustries);

  useEffect(() => {
    api
      .industries()
      .then((data: any[]) => {
        if (data && data.length > 0) setRaw(data);
      })
      .catch(() => {});
  }, []);

  const industries = useMemo(() =>
    raw.map((item: any) => ({
      ...item,
      Icon: iconMap[item.icon] || Zap,
    })),
    [raw]
  );

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary mb-4">
            Industries
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Industries We Power <span className="gradient-text">with Innovation</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Deep domain expertise across {industries.length}+ industries — we understand your business, not just your code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((item: any, i: number) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                to={item.slug ? `/industries/${item.slug}` : "#"}
                className="group block glass-card rounded-xl p-5 border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.Icon className="h-5 w-5" style={{ color: item.color }} />
                </div>
                <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-muted-foreground/70 leading-relaxed mb-3">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary/60 group-hover:text-primary transition-colors">
                  Learn more <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-muted-foreground">
            Don't see your industry?{" "}
            <Link to="/contact" className="text-primary font-medium hover:underline">
              Let's talk →
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;
