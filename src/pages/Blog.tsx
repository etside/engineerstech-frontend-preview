import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    id: "why-saas-for-small-business",
    title: "Why SaaS Is the Smartest Investment for Small Businesses in 2025",
    excerpt: "Discover how affordable SaaS platforms are leveling the playing field for startups and SMEs across South Asia and beyond.",
    category: "SaaS",
    date: "Feb 28, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop",
  },
  {
    id: "ai-driven-development",
    title: "How AI-Driven Development Is Cutting Project Costs by 40%",
    excerpt: "We share our internal methodology for using AI co-pilots, automated testing, and code generation to deliver faster without sacrificing quality.",
    category: "Engineering",
    date: "Feb 20, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=340&fit=crop",
  },
  {
    id: "restaurant-pos-guide",
    title: "The Complete Guide to Choosing a Restaurant POS System",
    excerpt: "From order management to inventory tracking — what every restaurant owner should know before picking a POS solution.",
    category: "Products",
    date: "Feb 12, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=340&fit=crop",
  },
  {
    id: "upwork-to-company",
    title: "From Upwork Freelancing to a Registered Tech Company: Our Journey",
    excerpt: "The engineersTech origin story — how a group of engineers turned side projects into a full-service software company.",
    category: "Company",
    date: "Jan 30, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=340&fit=crop",
  },
  {
    id: "ui-ux-mistakes",
    title: "7 UI/UX Mistakes That Are Costing You Customers",
    excerpt: "Common design pitfalls we see in client projects — and the straightforward fixes that boost conversion rates overnight.",
    category: "Design",
    date: "Jan 18, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=340&fit=crop",
  },
  {
    id: "devops-essentials",
    title: "DevOps Essentials Every Startup Should Implement From Day One",
    excerpt: "CI/CD pipelines, containerisation, and monitoring — the non-negotiable infrastructure practices for scaling fast.",
    category: "Engineering",
    date: "Jan 5, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=340&fit=crop",
  },
];

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

import { useState } from "react";

const Blog = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium mb-6">
              <BookOpen size={14} /> Blog & Insights
            </div>
            <h1 className="mb-4">
              Thoughts from the{" "}
              <span className="gradient-text">Engineering Floor</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Industry insights, product updates, and behind-the-scenes from our team of engineers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-6">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                  active === cat
                    ? "gradient-bg border-transparent text-primary-foreground"
                    : "border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20 sm:pb-32">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                className="group glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-[10px] backdrop-blur-md bg-background/70 border-border/50">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary mt-auto pt-2"
                  >
                    Read More <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
