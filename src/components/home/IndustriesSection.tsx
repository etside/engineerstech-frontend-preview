import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Wallet, HeartPulse, ShoppingCart, GraduationCap, Radio, Building2, Store, Zap } from "lucide-react";

const industries = [
  {
    icon: Wallet,
    name: "Fintech",
    description: "Payments, lending, digital banking solutions",
    color: "#10B981",
  },
  {
    icon: HeartPulse,
    name: "Healthcare",
    description: "Telemedicine, health records, compliance",
    color: "#EF4444",
  },
  {
    icon: ShoppingCart,
    name: "E-Commerce",
    description: "Custom stores, marketplace, payment integration",
    color: "#F59E0B",
  },
  {
    icon: GraduationCap,
    name: "Education",
    description: "LMS, edtech platforms, assessments",
    color: "#8B5CF6",
  },
  {
    icon: Radio,
    name: "Telecom",
    description: "Enterprise-grade telecom solutions",
    color: "#06B6D4",
  },
  {
    icon: Building2,
    name: "Real Estate",
    description: "Property management, CRM systems",
    color: "#EC4899",
  },
  {
    icon: Store,
    name: "Retail",
    description: "Inventory, omnichannel, POS systems",
    color: "#F97316",
  },
  {
    icon: Zap,
    name: "Startups",
    description: "MVPs, product-market fit, scaling",
    color: "#6366F1",
  },
];

const IndustriesSection = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="container relative z-10">
        {/* Header */}
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
            Deep domain expertise across 8+ industries — we understand your business, not just your code.
          </p>
        </motion.div>

        {/* Industry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                to="#"
                className="group block glass-card rounded-xl p-5 border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="h-5 w-5" style={{ color: item.color }} />
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

        {/* Bottom CTA */}
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
