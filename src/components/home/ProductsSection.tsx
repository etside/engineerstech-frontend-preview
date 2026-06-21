import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Cpu, BookOpen, BrainCircuit, Shield, Smartphone, BarChart3, Workflow } from "lucide-react";

const products = [
  {
    icon: Sparkles,
    name: "GlowUp",
    category: "Digital Transformation",
    description: "End-to-end digital transformation platform for enterprise modernization.",
    color: "#6366F1",
  },
  {
    icon: Cpu,
    name: "ERP Solutions",
    category: "Enterprise",
    description: "Modular ERP for finance, HR, inventory, and operations management.",
    color: "#10B981",
  },
  {
    icon: BookOpen,
    name: "LMS Platform",
    category: "Education",
    description: "Learning management with live classes, assessments, and certifications.",
    color: "#F59E0B",
  },
  {
    icon: BrainCircuit,
    name: "AI Tools",
    category: "Intelligence",
    description: "Custom AI/ML solutions — chatbots, analytics, prediction models.",
    color: "#8B5CF6",
  },
  {
    icon: Shield,
    name: "Cyber Security",
    category: "Security",
    description: "Penetration testing, compliance audits, and security monitoring.",
    color: "#EF4444",
  },
  {
    icon: Smartphone,
    name: "Mobile Apps",
    category: "Development",
    description: "Cross-platform mobile apps with React Native & Flutter.",
    color: "#06B6D4",
  },
  {
    icon: BarChart3,
    name: "Data Analytics",
    category: "Business Intelligence",
    description: "Dashboards, reporting, and data pipeline solutions.",
    color: "#EC4899",
  },
  {
    icon: Workflow,
    name: "Automation",
    category: "Efficiency",
    description: "Workflow automation, RPA, and process optimization.",
    color: "#F97316",
  },
];

const ProductsSection = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-secondary/30 to-transparent">
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
            Products & Solutions
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Accelerating <span className="gradient-text">Digital Transformation</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            From enterprise software to AI-powered tools — products built to scale your business.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((item, i) => (
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
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon className="h-5 w-5" style={{ color: item.color }} />
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-muted-foreground/70 leading-relaxed mb-3">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary/60 group-hover:text-primary transition-colors">
                  Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
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
          <Link to="/products">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              View all products <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
