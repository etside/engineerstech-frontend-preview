import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import client1 from "@/assets/clients/client-1.png";
import client2 from "@/assets/clients/client-2.png";
import client3 from "@/assets/clients/client-3.png";
import client4 from "@/assets/clients/client-4.png";
import client5 from "@/assets/clients/client-5.png";
import client6 from "@/assets/clients/client-6.png";

const staticLogos = [client1, client2, client3, client4, client5, client6];

interface LogoData {
  id: number;
  name: string;
  logo_url: string | null;
}

const ClientLogos = () => {
  const [logos, setLogos] = useState<{ src: string; alt: string }[] | null>(null);

  useEffect(() => {
    api.logos().then((data: LogoData[]) => {
      const withImages = data?.filter(l => l.logo_url);
      if (withImages && withImages.length > 0) {
        setLogos(withImages.map(l => ({ src: l.logo_url!, alt: l.name })));
      } else {
        setLogos(staticLogos.map((src, i) => ({ src, alt: `Client ${i + 1}` })));
      }
    }).catch(() => {
      setLogos(staticLogos.map((src, i) => ({ src, alt: `Client ${i + 1}` })));
    });
  }, []);

  if (!logos) return null;

  return (
    <section className="border-y border-border/30">
      <div className="container mb-8">
        <p className="text-center text-sm text-muted-foreground font-medium uppercase tracking-wider">
          Trusted by clients worldwide
        </p>
      </div>
      <div className="overflow-hidden space-y-8">
        <div className="flex animate-scroll-left gap-8 w-max">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`row1-${i}`}
              className="h-20 md:h-24 w-40 md:w-48 bg-white/90 rounded-xl shrink-0 overflow-hidden"
            >
              <img loading="lazy" decoding="async"
                src={logo.src}
                alt={logo.alt}
                className="w-full h-full object-contain p-3"
              />
            </div>
          ))}
        </div>
        <div className="flex animate-scroll-right gap-8 w-max">
          {[...logos, ...logos].reverse().map((logo, i) => (
            <div
              key={`row2-${i}`}
              className="h-20 md:h-24 w-40 md:w-48 bg-white/90 rounded-xl shrink-0 overflow-hidden"
            >
              <img loading="lazy" decoding="async"
                src={logo.src}
                alt={logo.alt}
                className="w-full h-full object-contain p-3"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
