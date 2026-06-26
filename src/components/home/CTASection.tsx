import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden"
        >
          {/* Rich layered background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(214,100%,15%)] via-[hsl(214,100%,25%)] to-[hsl(230,80%,12%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(214,100%,50%,0.3),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(214,100%,60%,0.2),transparent_60%)]" />
          <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
          
          {/* Glowing orbs */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/25 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-accent/20 blur-[100px]" />
          <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-primary/15 blur-[60px]" />
          
          {/* Animated rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-primary-foreground/[0.04] animate-[pulse_5s_ease-in-out_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-primary-foreground/[0.07] animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-primary-foreground/[0.1] animate-[pulse_3s_ease-in-out_infinite]" />
          
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-primary-foreground/10 rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-primary-foreground/10 rounded-br-3xl" />

          <div className="relative z-10">
            <h2 className="font-bold text-primary-foreground mb-4">
              Ready to Build Something Great?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Let's discuss your project and see how our team of engineers can bring your vision to life — affordably and efficiently.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 h-12 px-8 text-base">
                Get Started <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
