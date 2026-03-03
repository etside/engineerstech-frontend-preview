import { motion } from "framer-motion";
import { Quote } from "lucide-react";
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
  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card rounded-2xl p-8 flex flex-col"
            >
              <Quote size={28} className="text-primary/40 mb-4" />
              <p className="text-foreground/90 leading-relaxed mb-6 text-sm italic flex-1">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                <img
                  src={t.photo}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <h4 className="font-semibold text-sm">{t.name}</h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
