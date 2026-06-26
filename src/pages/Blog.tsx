import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import { api } from "@/lib/api";
import { blogPosts as staticPosts } from "@/data/blogPosts";

interface ApiBlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover_image: string | null;
  published_at: string;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const Blog = () => {
  const [active, setActive] = useState("All");
  const [posts, setPosts] = useState<ApiBlogPost[]>([]);
  const [useStatic, setUseStatic] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    api.blog()
      .then((data: ApiBlogPost[]) => {
        if (data && data.length > 0) setPosts(data);
        else setUseStatic(true);
      })
      .catch(() => setUseStatic(true))
      .finally(() => setLoadingPosts(false));
  }, []);

  // Derive categories and filtered list
  const allPosts = useStatic
    ? staticPosts.map((p) => ({ id: 0, slug: p.id, title: p.title, excerpt: p.excerpt, category: p.category, cover_image: p.image, published_at: p.date }))
    : posts;

  const categories = ["All", ...Array.from(new Set(allPosts.map((p) => p.category)))];
  const filtered = active === "All" ? allPosts : allPosts.filter((p) => p.category === active);

  return (
    <div className="min-h-screen">
      <SEO
        title="Blog"
        description="Insights on software engineering, SaaS, AI, and digital transformation from the engineersTech team."
        path="/blog"
      />
      {/* Hero */}
      <section className="relative pt-16 md:pt-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="container relative z-10 text-center pt-10 sm:pt-12 pb-0">
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
          {loadingPosts && (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          )}
          {!loadingPosts && filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No posts found.</p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.article
                key={post.slug}
                className="group glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <div className="relative h-44 overflow-hidden">
                  {post.cover_image ? (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <BookOpen className="text-muted-foreground" size={32} />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-[10px] backdrop-blur-md bg-background/70 border-border/50">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {useStatic ? post.published_at : formatDate(post.published_at)}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.slug}`}
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
