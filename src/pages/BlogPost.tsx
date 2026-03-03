import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2>Post not found</h2>
          <Link to="/blog">
            <Button variant="outline">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <section className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <img
          src={post.image.replace("w=600&h=340", "w=1400&h=500")}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="container">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft size={14} /> Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5 -mt-6 relative z-10">
              <Badge variant="secondary" className="text-[10px] backdrop-blur-md bg-primary/10 text-primary border-primary/20">
                {post.category}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar size={12} /> {post.date}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} /> {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-8 leading-tight">{post.title}</h1>

            {/* Author bar */}
            <div className="flex items-center justify-between glass-card rounded-xl p-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-sm font-bold">
                  eT
                </div>
                <div>
                  <p className="text-sm font-medium">engineersTech Team</p>
                  <p className="text-xs text-muted-foreground">#drivenByEngineers</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
                className="text-muted-foreground hover:text-primary"
              >
                <Share2 size={16} />
              </Button>
            </div>

            {/* Body */}
            <div className="space-y-6">
              {post.content.map((paragraph, i) => (
                <motion.p
                  key={i}
                  className="text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-14 glass-card rounded-xl p-6 sm:p-8 text-center">
              <h3 className="mb-2">Interested in working with us?</h3>
              <p className="text-sm text-muted-foreground mb-5">
                Let's discuss how engineersTech can help bring your vision to life.
              </p>
              <Link to="/contact">
                <Button className="gradient-bg border-0">Get In Touch</Button>
              </Link>
            </div>
          </motion.div>

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="mb-6">More from the blog</h3>
              <div className="grid sm:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to={`/blog/${r.id}`}
                    className="group glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
                  >
                    <div className="h-28 overflow-hidden">
                      <img
                        src={r.image}
                        alt={r.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground mb-1">{r.date}</p>
                      <h4 className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {r.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
