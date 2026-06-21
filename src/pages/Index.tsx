import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import ClientLogos from "@/components/home/ClientLogos";
import StatsSection from "@/components/home/StatsSection";
import ProcessSection from "@/components/home/ProcessSection";
import TechStackSection from "@/components/home/TechStackSection";
import GlowUpSpotlight from "@/components/home/GlowUpSpotlight";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <HeroSection />
      <ClientLogos />
      <ServicesOverview />
      <ProcessSection />
      <TechStackSection />
      <StatsSection />
      <GlowUpSpotlight />
      <Testimonials />
      <CTASection />
    </>
  );
};

export default Index;
