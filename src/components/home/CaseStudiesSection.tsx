import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import { api } from "@/lib/api";

interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  tags: string[];
  summary: string;
  metrics: { label: string; value: string }[];
  color: string;
}

const defaultCaseStudies: CaseStudy[] = [
  {
    id: "fintech-wallet",
    title: "Digital Wallet Platform for a Leading Bank",
    industry: "Fintech",
    tags: ["React Native", "Node.js", "PostgreSQL"],
    summary:
      "Built a secure digital wallet with P2P transfers, QR payments, and merchant integration — processing 50K+ daily transactions.",
    metrics: [
      { label: "Daily Transactions", value: "50K+" },
      { label: "Uptime", value: "99.99%" },
      { label: "Time to Market", value: "12 weeks" },
    ],
    image: "",
    color: "#10B981",
  },
  {
    id: "ecommerce-platform",
    title: "Multi-Vendor E-Commerce Marketplace",
    industry: "E-Commerce",
    tags: ["Next.js", "Laravel", "AWS"],
    summary:
      "Developed a scalable marketplace supporting 200+ vendors with real-time inventory, payment gateway, and admin analytics.",
    metrics: [
      { label: "Active Vendors", value: "200+" },
      { label: "Monthly Orders", value: "15K+" },
      { label: "Load Time", value: "<2s" },
    ],
    image: "",
    color: "#F59E0B",
  },
  {
    id: "healthcare-telemedicine",
    title: "Telemedicine App for Rural Healthcare",
    industry: "Healthcare",
    tags: ["Flutter", "Firebase", "WebRTC"],
    summary:
      "Created a video consultation platform connecting 10K+ patients with doctors, featuring e-prescriptions and health records.",
    metrics: [
      { label: "Patients Served", value: "10K+" },
      { label: "Consultations", value: "5K+" },
      { label: "Avg Rating", value: "4.8★" },
    ],
    image: "",
    color: "#EF4444",
  },
  {
    id: "edtech-lms",
    title: "Enterprise LMS for Corporate Training",
    industry: "Education",
    tags: ["React", "Python", "Moodle"],
    summary:
      "Deployed a learning management system with live classes, assessments, and certification for 5,000+ employees.",
    metrics: [
      { label: "Active Learners", value: "5K+" },
      { label: "Course Completion", value: "87%" },
      { label: "Cost Reduction", value: "40%" },
    ],
    image: "",
    color: "#8B5CF6",
  },
];

const CaseStudiesSection = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(defaultCaseStudies);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    api
      .caseStudies()
      .then((data: any[]) => {
        if (data && data.length > 0) {
          const parsed = data.map((s) => ({
            ...s,
            tags: typeof s.tags === "string" ? JSON.parse(s.tags) : s.tags || [],
            metrics: typeof s.metrics === "string" ? JSON.parse(s.metrics) : s.metrics || [],
          }));
          setCaseStudies(parsed);
        }
      })
      .catch(() => {});
  }, []);

  const industries = ["All", ...new Set(caseStudies.map((c) => c.industry))];

  const filtered =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((c: CaseStudy) => c.industry === activeFilter);

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[180px]" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary mb-4">
            Case Studies
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Innovative Solutions That{" "}
            <span className="gradient-text">Transformed Businesses</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Real projects, real results — see how we've helped companies scale and innovate.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setActiveFilter(ind)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                activeFilter === ind
                  ? "gradient-bg text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {ind}
            </button>
          ))}
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  to={item.slug ? `/case-studies/${item.slug}` : "#"}
                  className="group block glass-card rounded-2xl overflow-hidden border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full"
                >
                  {/* Top accent bar */}
                  <div
                    className="h-1 w-full"
                    style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}66)` }}
                  />

                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                        style={{
                          backgroundColor: `${item.color}15`,
                          color: item.color,
                        }}
                      >
                        {item.industry}
                      </span>
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-muted-foreground/50 bg-secondary/50 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-muted-foreground/70 leading-relaxed mb-5">
                      {item.summary}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {item.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="text-center p-2 rounded-lg bg-white/[0.02] border border-border/20"
                        >
                          <div className="text-sm sm:text-base font-bold gradient-text">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-muted-foreground/50 mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary/60 group-hover:text-primary transition-colors">
                      Read full case study{" "}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/case-studies">
            <Button
              variant="outline"
              size="lg"
              className="border-border/50 hover:bg-secondary px-8 h-12 text-sm"
            >
              See all Case Studies <ArrowUpRight size={16} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
