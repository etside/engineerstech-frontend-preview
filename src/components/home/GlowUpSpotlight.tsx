import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import glowupBanner from "@/assets/glowup-banner-for-web.webp";

const glowupSpotlight = () => {
  return (
    <section>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden gradient-bg p-[1px]"
        >
          <div className="bg-background rounded-2xl p-8 md:p-14 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                <Sparkles size={12} /> Featured SaaS Product
              </span>
              <h2 className="font-bold mb-4">
                <span style={{ background: "linear-gradient(135deg, hsl(270, 70%, 55%) 0%, hsl(330, 80%, 60%) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>glowup</span> — Bangladesh's Beauty & Wellness Platform
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Book salon services, stylists & henna artists. Buy products, event tickets & courses.
                Discover top-rated salons, talented stylists, and beauty products for men and women — book instantly with a few clicks.
              </p>
              <a href="https://glowupbd.app/" target="_blank" rel="noopener noreferrer">
                <Button className="gradient-bg border-0 text-primary-foreground hover:opacity-90">
                  Visit glowup <ArrowUpRight size={16} />
                </Button>
              </a>
            </div>
            <div className="w-full md:w-80 shrink-0">
              <img loading="lazy" decoding="async" src={glowupBanner} alt="glowup" className="w-full h-auto rounded-xl object-cover" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default glowupSpotlight;
