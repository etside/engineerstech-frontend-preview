import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock, ArrowRight, Users, Zap, Heart, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const perks = [
  { icon: Users, title: "Great Team", desc: "Work with talented engineers who push each other to grow." },
  { icon: Zap, title: "Latest Tech", desc: "We use modern tools and frameworks — never stuck in legacy." },
  { icon: Heart, title: "Work-Life Balance", desc: "Flexible hours and remote-friendly culture." },
  { icon: Coffee, title: "Learning Budget", desc: "Dedicated budget for courses, conferences, and certifications." },
];

const Career = () => {
  return (
    <div className="pt-28 pb-20">
      <SEO
        title="Careers"
        description="Join engineersTech — build enterprise software with a talented, remote-friendly team. Explore open roles and our engineering culture."
        path="/career"
      />
      {/* Hero */}
      <section className="container text-center mb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary mb-4">
            <Briefcase className="h-3 w-3" /> Careers
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Join Our <span className="gradient-text">Growing Team</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            We're always looking for talented engineers who are passionate about building great software. Explore opportunities below.
          </p>
        </motion.div>

        {/* Perks */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-4 border border-border/30 text-center"
            >
              <perk.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <h3 className="text-sm font-semibold mb-1">{perk.title}</h3>
              <p className="text-[11px] text-muted-foreground/70">{perk.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="container mb-20">
        <h2 className="text-2xl font-bold text-center mb-10">Open Positions</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {[
            { title: "Senior Full-Stack Developer", type: "Full-time", location: "Dhaka / Remote", tags: ["React", "Node.js", "PostgreSQL"] },
            { title: "Mobile App Developer", type: "Full-time", location: "Dhaka / Remote", tags: ["React Native", "Flutter"] },
            { title: "UI/UX Designer", type: "Full-time", location: "Dhaka / Remote", tags: ["Figma", "Design Systems"] },
            { title: "DevOps Engineer", type: "Full-time", location: "Remote", tags: ["AWS", "Docker", "CI/CD"] },
          ].map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-xl p-5 border border-border/30 hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{job.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {job.type}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                  </div>
                </div>
                <Link to="/contact">
                  <Button size="sm" variant="outline" className="shrink-0">
                    Apply <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {job.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container">
        <div className="glass-card rounded-2xl p-8 sm:p-12 text-center border border-border/30 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-3">Don't see your role?</h2>
          <p className="text-muted-foreground mb-6">
            Send us your resume — we're always open to exceptional talent.
          </p>
          <Link to="/contact">
            <Button className="gradient-bg border-0 text-primary-foreground">
              Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Career;
