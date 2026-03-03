import client1 from "@/assets/clients/client-1.png";
import client2 from "@/assets/clients/client-2.png";
import client3 from "@/assets/clients/client-3.png";
import client4 from "@/assets/clients/client-4.png";
import client5 from "@/assets/clients/client-5.png";
import client6 from "@/assets/clients/client-6.png";

const logos = [client1, client2, client3, client4, client5, client6];

const ClientLogos = () => {
  return (
    <section className="py-16 border-y border-border/30">
      <div className="container mb-8">
        <p className="text-center text-sm text-muted-foreground font-medium uppercase tracking-wider">
          Trusted by clients worldwide
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="flex animate-scroll-left gap-16 w-max">
          {[...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={logo}
              alt={`Client ${(i % logos.length) + 1}`}
              className="h-10 md:h-12 opacity-80 object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
