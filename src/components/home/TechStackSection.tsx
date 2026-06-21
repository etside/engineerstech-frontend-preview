import { motion } from "framer-motion";

const techCategories = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "Laravel", "Java", ".NET", "Go"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Flutter", "iOS", "Android", "Ionic"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD", "Terraform"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "Supabase"],
  },
  {
    category: "AI & Data",
    items: ["OpenAI", "TensorFlow", "LangChain", "Python ML", "Power BI"],
  },
];

// Simple SVG logo component for each tech
const TechIcon = ({ name }: { name: string }) => {
  const colors: Record<string, string> = {
    React: "#61DAFB",
    "Next.js": "#FFFFFF",
    "Vue.js": "#42B883",
    Angular: "#DD0031",
    TypeScript: "#3178C6",
    "Tailwind CSS": "#06B6D4",
    "Node.js": "#339933",
    Python: "#3776AB",
    Laravel: "#FF2D20",
    Java: "#ED8B00",
    ".NET": "#512BD4",
    Go: "#00ADD8",
    "React Native": "#61DAFB",
    Flutter: "#02569B",
    iOS: "#FFFFFF",
    Android: "#3DDC84",
    Ionic: "#3880FF",
    AWS: "#FF9900",
    Azure: "#0089D6",
    Docker: "#2496ED",
    Kubernetes: "#326CE5",
    "CI/CD": "#F05032",
    Terraform: "#7B42BC",
    PostgreSQL: "#4169E1",
    MySQL: "#4479A1",
    MongoDB: "#47A248",
    Redis: "#DC382D",
    Firebase: "#FFCA28",
    Supabase: "#3FCF8E",
    OpenAI: "#412991",
    TensorFlow: "#FF6F00",
    LangChain: "#FFFFFF",
    "Python ML": "#3776AB",
    "Power BI": "#F2C811",
  };

  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
      style={{
        backgroundColor: `${colors[name] || "#6366F1"}15`,
        color: colors[name] || "#6366F1",
      }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
};

const TechStackSection = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

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
            Tech Stack
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Yes! We Cover <span className="gradient-text">Your Tech Stack</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Our team has expertise across the full modern technology ecosystem — frontend, backend, mobile, cloud, and AI.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.08, duration: 0.4 }}
              className="glass-card rounded-2xl p-5 border border-border/30 hover:border-primary/20 transition-all duration-300"
            >
              <h3 className="text-sm font-semibold text-primary mb-4">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-border/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-default"
                  >
                    <TechIcon name={tech} />
                    <span className="text-xs font-medium text-foreground/80">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
