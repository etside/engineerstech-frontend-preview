import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";
import jeremyImg from "@/assets/testimonials/jeremy-nathan.jpg";
import fredaImg from "@/assets/testimonials/freda-lin.png";
import mynulImg from "@/assets/testimonials/mynul-hasan.jpg";

const fallback = [
  { name: "Jeremy Nathan", role: "CEO, Industracom, USA", photo_url: jeremyImg, quote: "engineersTech did an amazing job with this design. I really like how they interpreted our brand. I hope to work with them again soon!", rating: 5 },
  { name: "Freda Lin", role: "Design & Marketing, Ample, Canada", photo_url: fredaImg, quote: "engineersTech has an excellent eye for design and attention to detail. They were able to turn a quick project around within hours — impressive work!", rating: 5 },
  { name: "Mynul Hasan", role: "Senior Auditor, Intertek Bangladesh", photo_url: mynulImg, quote: "engineersTech is an extremely passionate, talented, and achiever. They deliver projects on time. It is an absolute privilege to work with them.", rating: 5 },
];

interface TestimonialData {
  name: string;
  role: string | null;
  company: string | null;
  photo_url: string | null;
  quote: string;
  rating?: number;
}

function mapRole(t: TestimonialData): string {
  if (t.role && t.company) return `${t.role}, ${t.company}`;
  return t.role || t.company || "";
}

const Stars = ({ count = 5 }: { count?: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

const TestimonialCard = ({
  t,
  featured = false,
}: {
  t: { name: string; role: string; photo_url: string | null; quote: string; rating?: number };
  featured?: boolean;
}) => (
  <div
    className={`glass-card rounded-2xl p-6 sm:p-8 flex flex-col h-full border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${
      featured
        ? "border-primary/30 bg-primary/[0.03]"
        : "border-border/30 hover:border-primary/20"
    }`}
  >
    <div className="flex items-center justify-between mb-4">
      <Quote size={24} className="text-primary/40" />
      <Stars count={t.rating || 5} />
    </div>
    <p className="text-foreground/90 leading-relaxed mb-6 text-xs sm:text-sm italic flex-1">
      "{t.quote}"
    </p>
    <div className="flex items-center gap-3 pt-4 border-t border-border/30">
      {t.photo_url ? (
        <img
          src={t.photo_url}
          alt={t.name}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-primary/30"
        />
      ) : (
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/30 text-sm font-bold text-primary">
          {t.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        </div>
      )}
      <div>
        <h4 className="font-semibold text-xs sm:text-sm">{t.name}</h4>
        <p className="text-[10px] sm:text-xs text-muted-foreground">{t.role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [testimonials, setTestimonials] = useState(fallback);

  useEffect(() => {
    api
      .testimonials()
      .then((data: TestimonialData[]) => {
        if (data && data.length > 0) {
          setTestimonials(
            data.map((t) => ({
              name: t.name,
              role: mapRole(t),
              photo_url: t.photo_url,
              quote: t.quote,
              rating: t.rating || 5,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary mb-4">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Don't just take our word for it — hear from the teams we've worked with.
          </p>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TestimonialCard t={t} featured={i === 0} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <TestimonialCard t={testimonials[current]} />
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() =>
                setCurrent(
                  (c) => (c - 1 + testimonials.length) % testimonials.length
                )
              }
              className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 gradient-bg"
                      : "w-1.5 bg-border hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() =>
                setCurrent((c) => (c + 1) % testimonials.length)
              }
              className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Clutch link */}
        <div className="text-center mt-10">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View all reviews on Clutch <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
