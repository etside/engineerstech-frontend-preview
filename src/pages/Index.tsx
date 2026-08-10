import SEO, { breadcrumbSchema } from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "engineersTech",
  url: "https://engineerstechbd.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://engineerstechbd.com/discover?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does engineersTech offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Custom software development, SaaS products, web & mobile apps, AI solutions, and DevOps consulting for startups and enterprises."
      }
    },
    {
      "@type": "Question",
      name: "Is engineersTech a registered company in Bangladesh?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, engineersTech is BASIS and e-CAB registered, headquartered in Uttara, Dhaka, Bangladesh."
      }
    },
    {
      "@type": "Question",
      name: "How much does custom software development cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Projects start from $5,000 depending on scope. We offer transparent pricing with no hidden fees. Contact us for a free consultation."
      }
    },
    {
      "@type": "Question",
      name: "Does engineersTech work with international clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we serve clients across four continents including USA, UK, Australia, and the Middle East."
      }
    },
    {
      "@type": "Question",
      name: "What technologies does engineersTech use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "React, Next.js, Node.js, Python, Laravel, Flutter, PostgreSQL, MongoDB, AWS, and modern AI/ML frameworks."
      }
    }
  ]
};

const Index = () => {
  const { lang, t } = useLanguage();
  return (
    <>
      <SEO
        title={t("Custom Software Development Company in Bangladesh", "বাংলাদেশে কাস্টম সফটওয়্যার ডেভেলপমেন্ট কোম্পানি")}
        description={t("engineersTech builds custom enterprise software, SaaS products, web & mobile apps for global clients. BASIS & e-CAB registered. Trusted engineering, delivered fast.", "engineersTech বৈশ্বিক ক্লায়েন্টদের জন্য কাস্টম এন্টারপ্রাইজ সফটওয়্যার, SaaS পণ্য, ওয়েব ও মোবাইল অ্যাপ তৈরি করে। BASIS ও e-CAB নিবন্ধিত। বিশ্বস্ত ইঞ্জিনিয়ারিং, দ্রুত ডেলিভারি।")}
        path="/"
        lang={lang}
        schema={[websiteSchema, faqSchema]}
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
