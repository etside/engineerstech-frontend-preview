import {
  Code2,
  Users,
  Rocket,
  Lightbulb,
  Sparkles,
  BrainCircuit,
  Smartphone,
  Cloud,
  Bug,
  Link2,
  Wallet,
  HeartPulse,
  ShoppingCart,
  GraduationCap,
  Radio,
  Building2,
  Store,
  Zap,
  Cpu,
  Layers,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

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

export const navigation: NavItem[] = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Services",
    megaMenu: [
      {
        title: "Collaboration Models",
        items: [
          {
            label: "Staff Augmentation",
            to: "#",
            description: "Scale your team with vetted developers in 4 weeks",
            icon: Users,
          },
          {
            label: "Managed Services",
            to: "#",
            description: "End-to-end app & infrastructure support",
            icon: Layers,
          },
          {
            label: "MVP Development",
            to: "#",
            description: "Market-ready MVPs in 8–12 weeks",
            icon: Rocket,
          },
          {
            label: "Technology Consulting",
            to: "#",
            description: "Strategic audits to cut tech waste by 30%",
            icon: Lightbulb,
          },
          {
            label: "Digital Transformation",
            to: "#",
            description: "AI-driven automation for 50% efficiency gains",
            icon: Sparkles,
          },
        ],
      },
      {
        title: "Top Services",
        items: [
          { label: "AI & Machine Learning", to: "#", icon: BrainCircuit },
          { label: "Web & Mobile Development", to: "#", icon: Smartphone },
          { label: "Cloud & DevOps", to: "#", icon: Cloud },
          { label: "QA Testing & Automation", to: "#", icon: Bug },
          { label: "Blockchain Development", to: "#", icon: Link2 },
        ],
      },
    ],
  },
  {
    label: "Industries",
    megaMenu: [
      {
        title: "Industries We Serve",
        items: [
          { label: "Fintech", to: "#", description: "Payments, lending, digital banking", icon: Wallet },
          { label: "Healthcare", to: "#", description: "Telemedicine, health records, compliance", icon: HeartPulse },
          { label: "E-Commerce", to: "#", description: "Custom stores, marketplace solutions", icon: ShoppingCart },
          { label: "Education", to: "#", description: "LMS, edtech platforms, assessments", icon: GraduationCap },
          { label: "Telecom", to: "#", description: "Enterprise-grade telecom solutions", icon: Radio },
          { label: "Real Estate", to: "#", description: "Property management, CRM systems", icon: Building2 },
          { label: "Retail", to: "#", description: "Inventory, omnichannel, POS systems", icon: Store },
          { label: "Startups", to: "#", description: "MVPs, product-market fit, scaling", icon: Zap },
        ],
      },
    ],
  },
  {
    label: "Products",
    megaMenu: [
      {
        title: "Our Products",
        items: [
          { label: "GlowUp", to: "#", description: "Digital transformation platform", icon: Sparkles },
          { label: "ERP Solutions", to: "#", description: "Enterprise resource planning", icon: Cpu },
          { label: "LMS Platform", to: "#", description: "Learning management system", icon: BookOpen },
          { label: "AI Tools", to: "#", description: "Custom AI/ML powered solutions", icon: BrainCircuit },
        ],
      },
    ],
  },
  {
    label: "Company",
    megaMenu: [
      {
        title: "About EngineersTech",
        items: [
          { label: "About Us", to: "/about", description: "Our story, mission & vision", icon: Building2 },
          { label: "Blog", to: "/blog", description: "Insights, tutorials & updates", icon: BookOpen },
          { label: "Career", to: "#", description: "Join our growing team", icon: Users },
          { label: "Contact", to: "/contact", description: "Get in touch with us", icon: Code2 },
          { label: "Portfolio", to: "#", description: "Our work & case studies", icon: Layers },
          { label: "Team", to: "#", description: "Meet the people behind the code", icon: Users },
        ],
      },
    ],
  },
  {
    label: "Contact",
    to: "/contact",
  },
];

export const footerQuickLinks = [
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];
