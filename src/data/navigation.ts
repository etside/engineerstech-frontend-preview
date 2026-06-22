import {
  Code2, Users, Rocket, Lightbulb, Sparkles, BrainCircuit, Smartphone,
  Cloud, Bug, Link2, Wallet, HeartPulse, ShoppingCart, GraduationCap,
  Radio, Building2, Store, Zap, Cpu, Layers, BookOpen, Briefcase,
  FileText, Handshake, ShieldCheck, Leaf, Newspaper, UserPlus,
  FolderOpen, TrendingUp, Search, Gauge, Palette, type LucideIcon,
} from "lucide-react";
import { iconMap, resolveIcon } from "@/lib/icons";

export interface NavSubItem {
  label: string;
  to: string;
  description?: string;
  icon?: LucideIcon;
}

export interface NavMegaGroup {
  title: string;
  items: NavSubItem[];
}

export interface NavItem {
  label: string;
  to?: string;
  megaMenu?: NavMegaGroup[];
}

export { resolveIcon };

const iconNameMap = new Map<LucideIcon, string>(
  Object.entries(iconMap).map(([name, icon]) => [icon, name])
);

// Convert NavItem[] (with icon components) back to plain settings data (with icon names)
export function serializeNavigation(nav: NavItem[]): any[] {
  return nav.map((item) => {
    if (item.megaMenu) {
      return {
        label: item.label,
        megaMenu: item.megaMenu.map((group) => ({
          title: group.title,
          items: group.items.map((sub) => ({
            label: sub.label,
            to: sub.to,
            description: sub.description,
            icon: sub.icon ? iconNameMap.get(sub.icon) : undefined,
          })),
        })),
      };
    }
    return { label: item.label, to: item.to };
  });
}

// Convert settings nav data (with icon names) to NavItem[] (with icon components)
export function parseNavigation(data: any[]): NavItem[] {
  if (!Array.isArray(data)) return defaultNavigation;
  return data.map((item) => {
    if (item.megaMenu) {
      return {
        label: item.label,
        megaMenu: item.megaMenu.map((group: any) => ({
          title: group.title,
          items: group.items.map((sub: any) => ({
            label: sub.label,
            to: sub.to,
            description: sub.description,
            icon: resolveIcon(sub.icon),
          })),
        })),
      };
    }
    return { label: item.label, to: item.to };
  });
}

// Default fallback navigation (hardcoded)
export const defaultNavigation: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "Services",
    megaMenu: [
      {
        title: "Collaboration Models",
        items: [
          { label: "Staff Augmentation", to: "/services/staff-augmentation", description: "Scale your team with vetted developers in 4 weeks", icon: Users },
          { label: "Managed Services", to: "/services/managed-services", description: "End-to-end app & infrastructure support", icon: Layers },
          { label: "MVP Development", to: "/services/mvp-development", description: "Market-ready MVPs in 8–12 weeks", icon: Rocket },
          { label: "Technology Consulting", to: "/services/technology-consulting", description: "Strategic audits to cut tech waste by 30%", icon: Lightbulb },
          { label: "Digital Transformation", to: "/services/digital-transformation", description: "AI-driven automation for 50% efficiency gains", icon: Sparkles },
        ],
      },
      {
        title: "Top Services",
        items: [
          { label: "AI & Machine Learning", to: "/services/ai-machine-learning", icon: BrainCircuit },
          { label: "Web & Mobile Development", to: "/services/web-mobile-development", icon: Smartphone },
          { label: "Cloud & DevOps", to: "/services/cloud-devops", icon: Cloud },
          { label: "QA Testing & Automation", to: "/services/qa-testing-automation", icon: Bug },
          { label: "Blockchain Development", to: "/services/blockchain-development", icon: Link2 },
        ],
      },
    ],
  },
  {
    label: "Industries",
    megaMenu: [{
      title: "Industries We Serve",
      items: [
        { label: "Fintech", to: "/industries/fintech", description: "Payments, lending, digital banking", icon: Wallet },
        { label: "Healthcare", to: "/industries/healthcare", description: "Telemedicine, health records, compliance", icon: HeartPulse },
        { label: "E-Commerce", to: "/industries/e-commerce", description: "Custom stores, marketplace solutions", icon: ShoppingCart },
        { label: "Education", to: "/industries/education", description: "LMS, edtech platforms, assessments", icon: GraduationCap },
        { label: "Telecom", to: "/industries/telecom", description: "Enterprise-grade telecom solutions", icon: Radio },
        { label: "Real Estate", to: "/industries/real-estate", description: "Property management, CRM systems", icon: Building2 },
        { label: "Retail", to: "/industries/retail", description: "Inventory, omnichannel, POS systems", icon: Store },
        { label: "Startups", to: "/industries/startups", description: "MVPs, product-market fit, scaling", icon: Zap },
      ],
    }],
  },
  {
    label: "Products",
    megaMenu: [{
      title: "Our Products",
      items: [
        { label: "GlowUp", to: "/products/glowup", description: "AI-powered social media growth platform", icon: Sparkles },
        { label: "Restaurant POS", to: "/products/restaurant-pos", description: "Smart restaurant point-of-sale system", icon: ShoppingCart },
        { label: "HRM Suite", to: "/products/hrm-suite", description: "Payroll, attendance & performance tracking", icon: Briefcase },
        { label: "CRM Platform", to: "/products/crm-platform", description: "Pipeline tracking & automation", icon: Cpu },
      ],
    }],
  },
  {
    label: "Resources",
    megaMenu: [
      {
        title: "Inside EngineersTech",
        items: [
          { label: "About Us", to: "/about", description: "Our story, mission & vision", icon: Building2 },
          { label: "Blog", to: "/blog", description: "Insights, tutorials & updates", icon: BookOpen },
          { label: "Case Studies", to: "/case-studies", description: "Real projects, real results", icon: FileText },
          { label: "Career", to: "/career", description: "Join our growing team", icon: Briefcase },
          { label: "Contact", to: "/contact", description: "Get in touch with us", icon: Code2 },
          { label: "Our Resources", to: "/resources", description: "Whitepapers, guides & tools", icon: FolderOpen },
        ],
      },
      {
        title: "Recognitions",
        items: [
          { label: "Enterprise-Grade Security", to: "/resources#recognitions", description: "ISO certified & compliant", icon: ShieldCheck },
          { label: "Sustainability", to: "/resources#recognitions", description: "Our commitment to the planet", icon: Leaf },
          { label: "Media", to: "/resources#recognitions", description: "Press releases & coverage", icon: Newspaper },
          { label: "Join as Partner", to: "/resources#recognitions", description: "Partner with EngineersTech", icon: UserPlus },
        ],
      },
    ],
  },
  { label: "Contact", to: "/contact" },
];

export const footerQuickLinks = [
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];
