import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ChevronDown, Linkedin, Facebook, Twitter, Instagram } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import logoDark from "@/assets/logo-dark-bg.svg";
import ecabLogo from "@/assets/ecab-logo.png";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/engineerstechbd/posts/?feedView=all", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/engineerstech7", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/engineerstech7", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com/engineerstechbd", label: "Instagram" },
];

const FooterAccordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h4 className="hidden md:block text-sm font-semibold mb-4">{title}</h4>
      <div className="hidden md:flex flex-col gap-2.5">{children}</div>

      <button
        className="md:hidden flex items-center justify-between w-full py-3 border-b border-border/30"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold">{title}</span>
        <ChevronDown
          size={16}
          className={`text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`md:hidden overflow-hidden transition-all duration-200 ${
          open ? "max-h-60 pt-3 pb-1" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-2.5">{children}</div>
      </div>
    </div>
  );
};

const Footer = () => {
  const { getSetting } = useSettings();

  const company = getSetting("company_info", {
    name: "engineersTech",
    tagline: "#drivenByEngineers",
    description: "High-performing software solutions driven by engineers. We build enterprise-grade products with affordable pricing.",
    email: "info@engineerstechbd.com",
    phone: "+88 01314 44 33 11",
    address: "Rashi International, Level 6, Flat B6, Plot 9, Road 4, Sector 16/A, Uttara, Dhaka 1230",
    registration: "TRAD/DNCC/025495/2025",
  });

  const quickLinks = getSetting("footer_quick_links", [
    { label: "About Us", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Products", to: "/products" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
  ]);

  const services = getSetting("footer_services", [
    { label: "Staff Augmentation", to: "/services/staff-augmentation" },
    { label: "Managed Services", to: "/services/managed-services" },
    { label: "MVP Development", to: "/services/mvp-development" },
    { label: "AI & ML Solutions", to: "/services/ai-machine-learning" },
    { label: "Consulting", to: "/services/technology-consulting" },
  ]);

  return (
    <footer className="bg-card border-t border-border/50 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 mb-12">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <img src={logoDark} alt={company.name} className="h-6 sm:h-8" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {company.description}
            </p>
            <p className="text-xs font-semibold gradient-text">{company.tagline}</p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-secondary hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={15} className="text-muted-foreground hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://e-cab.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors border border-border/50 px-3 py-1.5 rounded-md"
              >
                <img src={ecabLogo} alt="e-CAB" className="h-5 brightness-0 invert" />
                Member
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <FooterAccordion title="Quick Links">
            {quickLinks.map((link: any) => (
              <Link key={link.to} to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </FooterAccordion>

          {/* Services */}
          <FooterAccordion title="Services">
            {services.map((s: any) => (
              <Link key={s.label} to={s.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {s.label}
              </Link>
            ))}
          </FooterAccordion>

          {/* Contact */}
          <FooterAccordion title="Contact">
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail size={14} /> {company.email}
            </a>
            <a href={`tel:${company.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone size={14} /> {company.phone}
            </a>
            <a href="https://maps.app.goo.gl/jcPQ1mB5N83hoGrm7" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <span className="whitespace-pre-line">{company.address}</span>
            </a>
          </FooterAccordion>
        </div>

        <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-xs text-muted-foreground text-center">
            <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span>Reg: {company.registration}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/data-protection-policy" className="hover:text-primary transition-colors">Data Protection</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
