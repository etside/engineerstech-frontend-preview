import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { api } from "@/lib/api";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setActiveImg(0);
    api
      .product(slug)
      .then((data: any) => setProduct(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 container">
        <div className="flex justify-center">
          <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-32 pb-20 container text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/products">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Products</Button>
        </Link>
      </div>
    );
  }

  const gallery: string[] = product.gallery?.length ? product.gallery : [product.image_url || FALLBACK_IMAGE];
  const features: string[] = product.features || [];

  return (
    <div className="pt-28 pb-20">
      <SEO
        title={product.name}
        description={product.description || `Learn about ${product.name}, a SaaS product by engineersTech.`}
        path={`/products/${product.slug}`}
        image={gallery[0]}
      />
      <div className="container max-w-6xl">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> All Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 mb-14">
          {/* Gallery */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-2xl overflow-hidden border border-border/30 aspect-[4/3]">
              <img loading="lazy" decoding="async" src={gallery[activeImg]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-2 mt-3">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`h-16 w-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImg === i ? "border-primary" : "border-border/30 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img loading="lazy" decoding="async" src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {product.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                <Sparkles className="h-3 w-3" /> {product.category}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-base text-muted-foreground mb-6">{product.description}</p>

            {product.price && (
              <div className="text-2xl font-bold gradient-text mb-6">{product.price}</div>
            )}

            {features.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-2.5 mb-8">
                {features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {f}
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {product.external_url && (
                <a href={product.external_url} target="_blank" rel="noopener noreferrer">
                  <Button className="gradient-bg border-0 text-primary-foreground hover:opacity-90 px-6">
                    Visit Product <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              )}
              {product.show_demo_request !== false && (
                <Link to="/contact">
                  <Button variant="outline" className="px-6">Request Demo</Button>
                </Link>
              )}
            </div>

            {product.demo_credentials && (
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">Demo Access</p>
                <p className="text-sm text-foreground/80 whitespace-pre-line">{product.demo_credentials}</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Rich long description */}
        {product.long_description && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 sm:p-10 border border-border/30 max-w-4xl">
            <div className="rich-content text-sm sm:text-base text-foreground/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.long_description }} />
          </motion.div>
        )}
      </div>

      <style>{`
        .rich-content h2 { font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.5rem; }
        .rich-content h3 { font-size: 1.1rem; font-weight: 600; margin: 0.75rem 0 0.5rem; }
        .rich-content p { margin: 0.5rem 0; }
        .rich-content ul, .rich-content ol { padding-left: 1.5rem; margin: 0.5rem 0; }
        .rich-content ul { list-style-type: disc; }
        .rich-content ol { list-style-type: decimal; }
        .rich-content li { margin: 0.25rem 0; }
        .rich-content img { max-width: 100%; border-radius: 8px; margin: 0.75rem 0; }
        .rich-content a { color: hsl(var(--primary)); text-decoration: underline; }
      `}</style>
    </div>
  );
};

export default ProductDetail;
