import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import ClientLogos from "@/components/home/ClientLogos";
import StatsSection from "@/components/home/StatsSection";
import GlowUpSpotlight from "@/components/home/GlowUpSpotlight";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <HeroSection />
      <ClientLogos />
      <ServicesOverview />
      <StatsSection />
      <GlowUpSpotlight />
      <Testimonials />
      <CTASection />
    </>
  );
};

export default Index;
