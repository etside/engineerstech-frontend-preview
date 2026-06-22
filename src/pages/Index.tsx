import SEO from "@/components/SEO";
import HeroSection from "@/components/home/HeroSection";
import ClientLogos from "@/components/home/ClientLogos";
import ServicesOverview from "@/components/home/ServicesOverview";
import ProcessSection from "@/components/home/ProcessSection";
import TechStackSection from "@/components/home/TechStackSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import ProductsSection from "@/components/home/ProductsSection";
import AIExcellenceSection from "@/components/home/AIExcellenceSection";
import DeliveryBanner from "@/components/home/DeliveryBanner";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import StatsSection from "@/components/home/StatsSection";
import GlowUpSpotlight from "@/components/home/GlowUpSpotlight";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <SEO
        title="Custom Software Development Company in Bangladesh"
        description="engineersTech builds custom enterprise software, SaaS products, web & mobile apps for global clients. BASIS & e-CAB registered. Trusted engineering, delivered fast."
        path="/"
      />
      <HeroSection />
      <ClientLogos />
      <ServicesOverview />
      <ProcessSection />
      <TechStackSection />
      <IndustriesSection />
      <ProductsSection />
      <AIExcellenceSection />
      <DeliveryBanner />
      <CaseStudiesSection />
      <StatsSection />
      <GlowUpSpotlight />
      <Testimonials />
      <CTASection />
    </>
  );
};

export default Index;
