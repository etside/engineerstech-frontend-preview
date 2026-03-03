import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-10 md:p-16 text-center overflow-hidden"
        >
          {/* Multi-layer gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-accent/90" />
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-accent/30 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary/40 blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary-foreground/5 animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary-foreground/10 animate-[pulse_3s_ease-in-out_infinite]" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Build Something Great?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Let's discuss your project and see how our team of engineers can bring your vision to life — affordably and efficiently.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 h-12 px-8 text-base">
                Contact Us <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
