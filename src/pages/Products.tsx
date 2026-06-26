import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles, ShoppingCart, Plane, Users, Hotel, BarChart3, MapPin,
  ArrowRight, ArrowUpRight, Rocket, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    icon: Sparkles,
    name: "GlowUp",
    tagline: "Beauty & Wellness Platform",
    description: "All-in-one beauty & wellness business management platform with booking, POS, and client management. Discover top-rated salons, stylists, and beauty products.",
    color: "from-pink-500/20 to-purple-500/20",
    borderColor: "group-hover:border-pink-500/30",
    features: ["Salon & stylist booking", "POS & inventory", "Client management", "Event ticketing"],
    link: "https://glowupbd.app/",
    status: "Live",
  },
  {
    icon: ShoppingCart,
    name: "Restaurant POS",
    tagline: "Smart Restaurant Management",
    description: "Complete point-of-sale system for restaurants with order management, kitchen display, table management, and real-time analytics.",
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "group-hover:border-orange-500/30",
    features: ["Order management", "Kitchen display system", "Table reservations", "Sales analytics"],
    link: "#",
    status: "Live",
  },
  {
    icon: Plane,
    name: "Tour Booking",
    tagline: "Travel & Tourism Platform",
    description: "End-to-end tour and travel booking platform with itinerary builder, payments, and customer portal for travel agencies.",
    color: "from-sky-500/20 to-blue-500/20",
    borderColor: "group-hover:border-sky-500/30",
    features: ["Itinerary builder", "Payment gateway", "Customer portal", "Multi-currency"],
    link: "#",
    status: "Live",
  },
  {
    icon: Users,
    name: "HRM System",
    tagline: "Human Resource Management",
    description: "Comprehensive HR management with attendance tracking, payroll processing, leave management, and performance reviews.",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "group-hover:border-green-500/30",
    features: ["Attendance & payroll", "Leave management", "Performance tracking", "Employee self-service"],
    link: "#",
    status: "Live",
  },
  {
    icon: Hotel,
    name: "Hotel Booking",
    tagline: "Property Management System",
    description: "Hotel reservation and property management system with channel manager, revenue optimization, and guest experience tools.",
    color: "from-amber-500/20 to-yellow-500/20",
    borderColor: "group-hover:border-amber-500/30",
    features: ["Room management", "Channel manager", "Revenue optimization", "Guest portal"],
    link: "#",
    status: "Live",
  },
  {
    icon: BarChart3,
    name: "CRM Platform",
    tagline: "Customer Relationship Management",
    description: "Sales pipeline management, lead tracking, automated follow-ups, and detailed reporting to grow your business.",
    color: "from-violet-500/20 to-indigo-500/20",
    borderColor: "group-hover:border-violet-500/30",
    features: ["Sales pipeline", "Lead tracking", "Automated follow-ups", "Custom reporting"],
    link: "#",
    status: "Coming Soon",
  },
  {
    icon: MapPin,
    name: "Staff Tracking",
    tagline: "Field Force Management",
    description: "Field staff tracking and task management with GPS, geofencing, real-time reporting, and route optimization.",
    color: "from-teal-500/20 to-cyan-500/20",
    borderColor: "group-hover:border-teal-500/30",
    features: ["GPS tracking", "Geofencing", "Task assignment", "Route optimization"],
    link: "#",
    status: "Live",
  },
];

const Products = () => {
  return (
    <>
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
        </div>
      </section>

      {/* Products Grid */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className={`relative group`}
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/0 to-accent/0 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-500 blur-[1px]" />
                
                <div className={`relative glass-card rounded-2xl overflow-hidden ${product.borderColor} transition-all duration-300`}>
                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:via-primary transition-all duration-500" />
                  
                  <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br opacity-30 group-hover:opacity-60 blur-lg transition-opacity duration-500" style={{}} />
                          <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <product.icon size={22} className="text-foreground" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold group-hover:text-primary transition-colors">{product.name}</h3>
                          <p className="text-xs text-muted-foreground">{product.tagline}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${
                        product.status === "Live" 
                          ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {product.status}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 size={12} className="text-primary shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Action */}
                    {product.link !== "#" ? (
                      <a href={product.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                        Visit Product <ArrowUpRight size={12} />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        Request Demo <ArrowRight size={12} />
                      </span>
                    )}
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
