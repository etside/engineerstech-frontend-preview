import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import etIcon from "@/assets/eticon.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { api } from "@/lib/api";
import { blogPosts as staticPosts } from "@/data/blogPosts";

interface ApiBlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  cover_image: string | null;
  published_at: string;
  author_id: number | null;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const BlogPost = () => {
  const { id: slug } = useParams<{ id: string }>();
  const [post, setPost] = useState<ApiBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [useStatic, setUseStatic] = useState(false);

  useEffect(() => {
    if (!slug) return;
    api.blogPost(slug)
      .then((data: ApiBlogPost) => {
        if (data) setPost(data);
        else setUseStatic(true);
      })
      .catch(() => setUseStatic(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // Static fallback
  const staticPost = staticPosts.find((p) => p.id === slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!post && (!useStatic || !staticPost)) {
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

  // Resolve display data
  const title = post?.title ?? staticPost!.title;
  const category = post?.category ?? staticPost!.category;
  const image = post?.cover_image ?? staticPost!.image;
  const date = post ? formatDate(post.published_at) : staticPost!.date;
  const isHtml = post?.content ? /<[a-z][\s\S]*>/i.test(post.content) : false;
  const contentParagraphs: string[] = post
    ? (isHtml ? [] : post.content.split(/\n\n|\n/).filter(Boolean))
    : staticPost!.content;
  const excerpt = post?.excerpt ?? staticPost!.excerpt;
  const postSlug = post?.slug ?? staticPost!.id;

  return (
    <div className="min-h-screen">
      <SEO title={title} description={excerpt} path={`/blog/${postSlug}`} image={image} type="article" />
      {/* Hero Image */}
      <section className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        {image ? (
          <img loading="lazy" decoding="async"
            src={typeof image === "string" && image.includes("unsplash") ? image.replace("w=600&h=340", "w=1400&h=500") : image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-secondary" />
        )}
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
                {category}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar size={12} /> {date}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-8 leading-tight">{title}</h1>

            {/* Author bar */}
            <div className="flex items-center justify-between glass-card rounded-xl p-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <img loading="lazy" decoding="async" src={etIcon} alt="engineersTech" className="h-6 w-6" />
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
            {isHtml ? (
              <motion.div
                className="blog-content text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                dangerouslySetInnerHTML={{ __html: post!.content }}
              />
            ) : (
              <div className="space-y-6">
                {contentParagraphs.map((paragraph, i) => (
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
            )}

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
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
