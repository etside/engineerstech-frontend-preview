import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logoDark from "@/assets/logo-dark-bg.svg";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/50 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logoDark} alt="engineersTech" className="h-10" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              High-performing software solutions driven by engineers. We build enterprise-grade products with affordable pricing.
            </p>
            <p className="text-xs font-semibold gradient-text">#drivenByEngineers</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "Services", to: "/services" },
                { label: "About Us", to: "/about" },
                { label: "Blog", to: "/blog" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Services</h4>
            <div className="flex flex-col gap-2.5">
              {["Enterprise & SaaS Solutions", "Web & Mobile Apps", "UI/UX & Design", "Consultation & Strategy"].map((s) => (
                <span key={s} className="text-sm text-muted-foreground">{s}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@engineerstechbd.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail size={14} /> info@engineerstechbd.com
              </a>
              <a href="tel:+8801873722228" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone size={14} /> +880-18737-22228
              </a>
              <a href="tel:+8801689877007" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone size={14} /> 01689877007
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="mt-0.5 shrink-0" /> Dhaka, Bangladesh
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} engineersTech. All rights reserved.</span>
            <span>Reg: TRAD/DNCC/025495/2025</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://e-cab.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors border border-border/50 px-3 py-1.5 rounded-md"
            >
              e-CAB Member
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
