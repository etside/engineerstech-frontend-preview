import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { footerQuickLinks } from "@/data/navigation";
import logoDark from "@/assets/logo-dark-bg.svg";
import ecabLogo from "@/assets/ecab-logo.png";

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
      {/* Desktop: always visible */}
      <h4 className="hidden md:block text-sm font-semibold mb-4">{title}</h4>
      <div className="hidden md:flex flex-col gap-2.5">{children}</div>

      {/* Mobile: collapsible */}
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
  return (
    <footer className="bg-card border-t border-border/50 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4 mb-4 md:mb-0">
            <img src={logoDark} alt="engineersTech" className="h-6 sm:h-8" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              High-performing software solutions driven by engineers. We build enterprise-grade products with affordable pricing.
            </p>
            <p className="text-xs font-semibold gradient-text">#drivenByEngineers</p>
          </div>

          {/* Quick Links */}
          <FooterAccordion title="Quick Links">
            {footerQuickLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </FooterAccordion>

          {/* Services */}
          <FooterAccordion title="Services">
            {["Enterprise & SaaS Solutions", "Web & Mobile Apps", "UI/UX & Design", "Consultation & Strategy"].map((s) => (
              <span key={s} className="text-sm text-muted-foreground">{s}</span>
            ))}
          </FooterAccordion>

          {/* Contact */}
          <FooterAccordion title="Contact">
            <a href="mailto:info@engineerstechbd.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail size={14} /> info@engineerstechbd.com
            </a>
            <a href="tel:+8801314443311" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone size={14} /> +88 01314 44 33 11
            </a>
            <a href="https://maps.app.goo.gl/jcPQ1mB5N83hoGrm7" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <span>Rashi International, Level 6, Flat B6<br />Plot 9, Road 4, Sector 16/A<br />Uttara, Dhaka 1230</span>
            </a>
          </FooterAccordion>
        </div>

        <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-xs text-muted-foreground text-center">
            <span>© {new Date().getFullYear()} engineersTech. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span>Reg: TRAD/DNCC/025495/2025</span>
          </div>
          <div className="flex items-center gap-3">
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
      </div>
    </footer>
  );
};

export default Footer;
