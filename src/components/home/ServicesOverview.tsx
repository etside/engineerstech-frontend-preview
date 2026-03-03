import { motion } from "framer-motion";
import { Monitor, Smartphone, Palette, LineChart } from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Enterprise & SaaS Solutions",
    desc: "CRM, HRM, ERP and every type of large-scale customized software built for your business operations.",
  },
  {
    icon: Smartphone,
    title: "Web & Mobile Apps",
    desc: "Cross-platform Android & iOS applications alongside responsive web apps that perform flawlessly.",
  },
  {
    icon: Palette,
    title: "UI/UX, Graphics & Motion",
    desc: "Pixel-perfect interfaces, brand identity design, and engaging motion graphics that captivate users.",
  },
  {
    icon: LineChart,
    title: "Consultation & Strategy",
    desc: "Technical consulting, product roadmapping, and strategic planning to accelerate your digital transformation.",
  },
];

const ServicesOverview = () => {
  return (
    <section className="py-24 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What We <span className="gradient-text">Deliver</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            End-to-end engineering solutions that transform ideas into scalable products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-5">
                <service.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
