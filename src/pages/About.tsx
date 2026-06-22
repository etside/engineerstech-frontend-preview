import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Rocket, Target, Eye, Heart, Users, Calendar,
  Award, Globe, Linkedin, MessageCircle, Code2, Zap, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { api } from "@/lib/api";

const timeline = [
  { year: "2017", title: "The Beginning", desc: "Started as a freelance agency on Upwork, delivering quality software to global clients." },
  { year: "2020", title: "Growing the Team", desc: "Expanded from solo freelancing to a dedicated team of skilled engineers across multiple domains." },
  { year: "2023", title: "Bangladesh Operations", desc: "Officially transitioned to full Bangladesh operations, establishing local presence and infrastructure." },
  { year: "2025", title: "Registered & Recognized", desc: "Obtained trade registration (TRAD/DNCC/025495/2025) and e-CAB membership. Building the future." },
];

const values = [
  { icon: Code2, title: "Engineering Excellence", desc: "Clean architecture, best practices, and code that scales — we don't cut corners." },
  { icon: Zap, title: "AI-Driven Efficiency", desc: "We leverage AI tools to deliver faster without sacrificing quality — more value, less cost." },
  { icon: Heart, title: "Client-First Mindset", desc: "Your success is our success. We treat every project as if it were our own product." },
  { icon: Shield, title: "Trust & Transparency", desc: "Honest communication, clear timelines, and no hidden surprises throughout the journey." },
];

const staticTeam = [
  { name: "Nazmul Alom Sakib", designation: "Founder & CEO", bio: "Visionary leader who started the company from Upwork freelancing and built it into a full-scale software engineering firm. Expert in enterprise architecture and team leadership.", photo_url: null, linkedin_url: "#", whatsapp_number: "#" },
  { name: "Al Shahriar", designation: "Co-founder & COO", bio: "Operations strategist ensuring every project runs smoothly from kickoff to delivery. Specializes in process optimization and client relationship management.", photo_url: null, linkedin_url: "#", whatsapp_number: "#" },
  { name: "Sheikh Md. Junaeid", designation: "Co-Founder & CMO", bio: "Marketing and growth expert driving brand visibility and business development. Passionate about connecting the right solutions with the right clients.", photo_url: null, linkedin_url: "#", whatsapp_number: "#" },
];

interface TeamMember { name: string; designation: string | null; bio: string | null; photo_url: string | null; linkedin_url: string | null; whatsapp_number: string | null; }

const About = () => {
  const [team, setTeam] = useState<TeamMember[]>(staticTeam);

  useEffect(() => {
    api.team().then((data: TeamMember[]) => {
      if (data && data.length > 0) setTeam(data);
    }).catch(() => {});
  }, []);

  return (
    <>
      <SEO
        title="About Us"
        description="Founded in 2017, engineersTech grew from freelance roots into a full-scale Bangladesh-based software engineering firm — BASIS & e-CAB registered, trusted by global clients."
        path="/about"
      />
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
              <Users size={12} /> About Us
            </span>
            <h1 className="font-bold leading-tight mb-6">
              Driven by <span className="gradient-text">Engineers</span>,{" "}
              Built for Business
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              From a freelance journey on Upwork to a registered software company in Bangladesh — 
              we've been building enterprise-grade solutions since 2017.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-bold mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every milestone shaped who we are today.
            </p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-start gap-6 mb-12 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full gradient-bg ring-4 ring-background z-10" />

                {/* Content */}
                <div className={`ml-14 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? "sm:text-right sm:pr-8" : "sm:text-left sm:pl-8 sm:ml-auto"}`}>
                  <span className="text-xs font-bold text-primary">{item.year}</span>
                  <h3 className="font-bold mt-1 mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/0 to-accent/0 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-500 blur-[1px]" />
              <div className="relative glass-card rounded-2xl overflow-hidden">
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="p-8 sm:p-10">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-6">
                    <Target size={22} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To democratize enterprise-grade software by making it accessible and affordable for businesses of all sizes. 
                    We combine skilled engineering with AI-driven workflows to deliver maximum value at minimal cost.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/0 to-accent/0 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-500 blur-[1px]" />
              <div className="relative glass-card rounded-2xl overflow-hidden">
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                <div className="p-8 sm:p-10">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-6">
                    <Eye size={22} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To become Bangladesh's most trusted software engineering company — known for technical excellence, 
                    innovation, and building products that genuinely transform businesses and lives.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why engineersTech */}
      <section>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-bold mb-4">
              Why <span className="gradient-text">engineersTech</span>?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              What sets us apart from the rest.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 rounded-lg gradient-bg blur-md opacity-20 group-hover:opacity-50 transition-opacity" />
                    <div className="relative w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
                      <value.icon size={18} className="text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">{value.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-bold mb-4">
              Meet the <span className="gradient-text">Leadership</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The people steering the ship.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-primary/0 to-accent/0 group-hover:from-primary/30 group-hover:to-accent/20 transition-all duration-500 blur-[1px]" />

                <div className="relative glass-card rounded-2xl overflow-hidden text-center">
                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:via-primary transition-all duration-500" />

                  <div className="p-6 sm:p-8">
                    {/* Avatar */}
                    {member.photo_url ? (
                      <img loading="lazy" decoding="async"
                        src={member.photo_url}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-5 object-cover ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full mx-auto mb-5 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300">
                        <span className="text-2xl font-bold gradient-text">
                          {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                    )}

                    <h3 className="font-bold group-hover:text-primary transition-colors">{member.name}</h3>
                    <p className="text-xs text-primary font-medium mt-1">{member.designation}</p>

                    <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-5">
                      {member.bio}
                    </p>

                    {/* Social links */}
                    <div className="flex items-center justify-center gap-3">
                      {member.linkedin_url && member.linkedin_url !== "#" && (
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary/20 flex items-center justify-center transition-colors group/icon"
                        >
                          <Linkedin size={15} className="text-muted-foreground group-hover/icon:text-primary transition-colors" />
                        </a>
                      )}
                      {member.whatsapp_number && member.whatsapp_number !== "#" && (
                        <a
                          href={`https://wa.me/${member.whatsapp_number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-secondary hover:bg-green-500/20 flex items-center justify-center transition-colors group/icon"
                        >
                          <MessageCircle size={15} className="text-muted-foreground group-hover/icon:text-green-400 transition-colors" />
                        </a>
                      )}
                    </div>
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
              Let's Build <span className="gradient-text">Together</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Ready to work with a team that truly cares about your project's success?
            </p>
            <Link to="/contact">
              <Button size="lg" className="gradient-bg border-0 text-primary-foreground hover:opacity-90 px-8 h-12">
                Get in Touch <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
