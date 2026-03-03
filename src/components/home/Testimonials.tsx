import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
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

const TestimonialCard = ({ t }: { t: typeof testimonials[0] }) => (
  <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col h-full">
    <Quote size={24} className="text-primary/40 mb-3 sm:mb-4 shrink-0" />
    <p className="text-foreground/90 leading-relaxed mb-4 sm:mb-6 text-xs sm:text-sm italic flex-1">
      "{t.quote}"
    </p>
    <div className="flex items-center gap-3 pt-3 sm:pt-4 border-t border-border/30">
      <img
        src={t.photo}
        alt={t.name}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-primary/30"
      />
      <div>
        <h4 className="font-semibold text-xs sm:text-sm">{t.name}</h4>
        <p className="text-[10px] sm:text-xs text-muted-foreground">{t.role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-bold mb-3 sm:mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>

        {/* Desktop: 3 columns */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <TestimonialCard t={testimonials[current]} />
          </motion.div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
              className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-border"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
              className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
