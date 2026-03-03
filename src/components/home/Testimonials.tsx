import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import jeremyImg from "@/assets/testimonials/jeremy-nathan.jpg";
import fredaImg from "@/assets/testimonials/freda-lin.png";
import mynulImg from "@/assets/testimonials/mynul-hasan.jpg";

const testimonials = [
  {
    name: "Jeremy Nathan",
    role: "CEO, Industracom, USA",
    photo: jeremyImg,
    quote:
      "engineersTech did an amazing job with this design. I really like how they interpreted our brand. I hope to work with them again soon!",
  },
  {
    name: "Freda Lin",
    role: "Design and Marketing Specialist, Ample, Canada",
    photo: fredaImg,
    quote:
      "engineersTech has an excellent eye for design and attention to detail. They were able to turn a quick project around within hours — impressive work, will be working together in the near future!",
  },
  {
    name: "Mynul Hasan",
    role: "Senior Auditor @ Intertek Bangladesh",
    photo: mynulImg,
    quote:
      "engineersTech is an extremely passionate, talented, and achiever. They are very good designers and deliver projects on time. It is an absolute privilege to work with them.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-2xl p-8 md:p-10 text-center"
            >
              <Quote size={32} className="text-primary/40 mx-auto mb-6" />
              <p className="text-foreground leading-relaxed mb-8 text-lg italic">"{t.quote}"</p>
              <img
                src={t.photo}
                alt={t.name}
                className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-primary/30"
              />
              <h4 className="font-semibold">{t.name}</h4>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Previous">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === current ? "bg-primary" : "bg-border"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
