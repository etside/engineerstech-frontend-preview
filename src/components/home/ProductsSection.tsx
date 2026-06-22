import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Sparkles, Cpu, BookOpen, BrainCircuit, Shield, Smartphone,
  BarChart3, Workflow, type LucideIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

const iconMap: Record<string, LucideIcon> = {
  Sparkles, Cpu, BookOpen, BrainCircuit, Shield, Smartphone, BarChart3, Workflow,
};
const colorPalette = ["#6366F1", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#06B6D4", "#EC4899", "#F97316"];

interface Product {
  icon: LucideIcon;
  name: string;
  category: string;
  description: string;
  color: string;
  link: string;
}

const fallback: Product[] = [
  { icon: Sparkles, name: "GlowUp", category: "Digital Transformation", description: "End-to-end digital transformation platform for enterprise modernization.", color: "#6366F1", link: "/products" },
  { icon: Cpu, name: "ERP Solutions", category: "Enterprise", description: "Modular ERP for finance, HR, inventory, and operations management.", color: "#10B981", link: "/products" },
  { icon: BookOpen, name: "LMS Platform", category: "Education", description: "Learning management with live classes, assessments, and certifications.", color: "#F59E0B", link: "/products" },
  { icon: BrainCircuit, name: "AI Tools", category: "Intelligence", description: "Custom AI/ML solutions — chatbots, analytics, prediction models.", color: "#8B5CF6", link: "/products" },
  { icon: Shield, name: "Cyber Security", category: "Security", description: "Penetration testing, compliance audits, and security monitoring.", color: "#EF4444", link: "/products" },
  { icon: Smartphone, name: "Mobile Apps", category: "Development", description: "Cross-platform mobile apps with React Native & Flutter.", color: "#06B6D4", link: "/products" },
  { icon: BarChart3, name: "Data Analytics", category: "Business Intelligence", description: "Dashboards, reporting, and data pipeline solutions.", color: "#EC4899", link: "/products" },
  { icon: Workflow, name: "Automation", category: "Efficiency", description: "Workflow automation, RPA, and process optimization.", color: "#F97316", link: "/products" },
];

const ProductsSection = () => {
  const [products, setProducts] = useState<Product[]>(fallback);

  useEffect(() => {
    api
      .products()
      .then((data: any[]) => {
        if (data && data.length > 0) {
          setProducts(
            data.map((p, i) => ({
              icon: iconMap[p.icon] || Sparkles,
              name: p.name,
              category: p.category || "Solution",
              description: p.description,
              color: colorPalette[i % colorPalette.length],
              link: p.slug ? `/products/${p.slug}` : (p.external_url || "/products"),
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

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
          {products.map((item, i) => {
            const isExternal = item.link.startsWith("http");
            const cardClass = "group block glass-card rounded-xl p-5 border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full";
            const cardContent = (
              <>
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
              </>
            );

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                {isExternal ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className={cardClass}>
                    {cardContent}
                  </a>
                ) : (
                  <Link to={item.link} className={cardClass}>
                    {cardContent}
                  </Link>
                )}
              </motion.div>
            );
          })}
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
