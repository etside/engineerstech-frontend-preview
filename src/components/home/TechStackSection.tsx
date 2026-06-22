import { motion } from "framer-motion";
import { useSettings } from "@/hooks/useSettings";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const defaultTechCategories = [
  {
    category: "Web Development",
    items: [
      { name: "HTML5", logo: `${DEVICON}/html5/html5-original.svg` },
      { name: "CSS3", logo: `${DEVICON}/css3/css3-original.svg` },
      { name: "JavaScript (ES6+)", logo: `${DEVICON}/javascript/javascript-original.svg` },
      { name: "React.js", logo: `${DEVICON}/react/react-original.svg` },
      { name: "Next.js", logo: `${DEVICON}/nextjs/nextjs-original.svg` },
      { name: "Vue.js", logo: `${DEVICON}/vuejs/vuejs-original.svg` },
      { name: "PHP (Laravel)", logo: `${DEVICON}/laravel/laravel-original.svg` },
      { name: "Node.js", logo: `${DEVICON}/nodejs/nodejs-original.svg` },
      { name: "MySQL", logo: `${DEVICON}/mysql/mysql-original.svg` },
      { name: "PostgreSQL", logo: `${DEVICON}/postgresql/postgresql-original.svg` },
      { name: "MongoDB", logo: `${DEVICON}/mongodb/mongodb-original.svg` },
      { name: "REST API" },
      { name: "WordPress", logo: `${DEVICON}/wordpress/wordpress-original.svg` },
    ],
  },
  {
    category: "Mobile App Development",
    items: [
      { name: "Flutter", logo: `${DEVICON}/flutter/flutter-original.svg` },
      { name: "Native Android (Kotlin)", logo: `${DEVICON}/kotlin/kotlin-original.svg` },
      { name: "Native iOS (Swift)", logo: `${DEVICON}/swift/swift-original.svg` },
      { name: "Mobile UI/UX Design" },
      { name: "Firebase", logo: `${DEVICON}/firebase/firebase-plain.svg` },
      { name: "Push Notifications" },
      { name: "Payment Integration" },
    ],
  },
  {
    category: "AI & Automation",
    items: [
      { name: "Python", logo: `${DEVICON}/python/python-original.svg` },
      { name: "OpenAI API" },
      { name: "OCR (Tesseract)" },
      { name: "AWS Textract", logo: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
      { name: "Chatbot Development" },
      { name: "Data Analytics & BI Tools" },
    ],
  },
  {
    category: "Business Software (CRM / ERP)",
    items: [
      { name: "Database Design" },
      { name: "Custom CRM Development" },
      { name: "Accounting Logic" },
      { name: "Reporting Dashboards" },
      { name: "User Role & Permission Systems" },
    ],
  },
  {
    category: "Digital Marketing Technology",
    items: [
      { name: "SEO Tools" },
      { name: "Google Analytics" },
      { name: "Google Ads API" },
      { name: "Email Marketing Systems" },
      { name: "Marketing Automation" },
      { name: "Social Media API Integration" },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", logo: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
      { name: "Microsoft Azure", logo: `${DEVICON}/azure/azure-original.svg` },
      { name: "Google Cloud", logo: `${DEVICON}/googlecloud/googlecloud-original.svg` },
      { name: "Linux Server Administration", logo: `${DEVICON}/linux/linux-original.svg` },
      { name: "Docker", logo: `${DEVICON}/docker/docker-original.svg` },
      { name: "CI/CD Pipelines" },
      { name: "Cloud Security" },
      { name: "Backup & Disaster Recovery" },
    ],
  },
  {
    category: "UI/UX Design",
    items: [
      { name: "Figma", logo: `${DEVICON}/figma/figma-original.svg` },
      { name: "Adobe XD", logo: `${DEVICON}/xd/xd-original.svg` },
      { name: "UX Research" },
      { name: "Wireframing & Prototyping" },
      { name: "Responsive Design" },
    ],
  },
];

// Logos sit on a white chip so brand marks stay visible regardless of icon fill color on the dark theme
const TechIcon = ({ name, logo }: { name: string; logo?: string }) => {
  if (logo) {
    return (
      <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center shrink-0 p-1">
        <img
          loading="lazy"
          decoding="async"
          src={logo}
          alt={name}
          className="w-full h-full object-contain"
          onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }}
        />
      </div>
    );
  }
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
      className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-bold shrink-0"
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
  const { getSetting } = useSettings();
  const techCategories = getSetting("tech_stack", defaultTechCategories);
  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary mb-3">
            Tech Stack
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            Yes! We Cover <span className="gradient-text">Your Tech Stack</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Our team has expertise across the full modern technology ecosystem — frontend, backend, mobile, cloud, and AI.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {techCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.06, duration: 0.4 }}
              className="glass-card rounded-xl p-3.5 border border-border/30 hover:border-primary/20 transition-all duration-300"
            >
              <h3 className="text-xs font-semibold text-primary mb-2.5">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((tech: string | { name: string; logo?: string }) => {
                  const name = typeof tech === "string" ? tech : tech.name;
                  const logo = typeof tech === "string" ? undefined : tech.logo;
                  return (
                    <div
                      key={name}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.03] border border-border/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-default"
                    >
                      <TechIcon name={name} logo={logo} />
                      <span className="text-[11px] font-medium text-foreground/80">
                        {name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
