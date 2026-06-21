import { useState, useRef, useEffect } from "react";
import {
  Code2, Users, Rocket, Lightbulb, Sparkles, BrainCircuit, Smartphone,
  Cloud, Bug, Link2, Wallet, HeartPulse, ShoppingCart, GraduationCap,
  Radio, Building2, Store, Zap, Cpu, Layers, BookOpen, Briefcase,
  FileText, Handshake, ShieldCheck, Leaf, Newspaper, UserPlus,
  FolderOpen, TrendingUp, Search, Gauge, Globe, Award, Shield,
  Monitor, Palette, LineChart, Settings, Mail, Star, Image,
  MessageSquare, Phone, MapPin, Calendar, Clock, Check, X,
  ChevronDown, ChevronRight, Plus, Trash2, Save, Eye, EyeOff,
  Lock, Unlock, Home, Menu, ArrowRight, ArrowLeft, ArrowUp,
  ExternalLink, Download, Upload, Edit, Copy, Trash,
  Bell, Heart, Flag, Bookmark, Tag, Hash, AtSign,
  DollarSign, Percent, CreditCard, ShoppingCart as Cart,
  Truck, Package, Box, Warehouse, Factory, Wrench,
  Database, Server, HardDrive, Wifi, Bluetooth, Signal,
  BarChart, PieChart, Activity, TrendingDown, Minus,
  Layout, Grid, List, Columns, Rows, Sidebar,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconEntries: { name: string; icon: LucideIcon }[] = [
  { name: "Code2", icon: Code2 },
  { name: "Users", icon: Users },
  { name: "Rocket", icon: Rocket },
  { name: "Lightbulb", icon: Lightbulb },
  { name: "Sparkles", icon: Sparkles },
  { name: "BrainCircuit", icon: BrainCircuit },
  { name: "Smartphone", icon: Smartphone },
  { name: "Cloud", icon: Cloud },
  { name: "Bug", icon: Bug },
  { name: "Link2", icon: Link2 },
  { name: "Wallet", icon: Wallet },
  { name: "HeartPulse", icon: HeartPulse },
  { name: "ShoppingCart", icon: ShoppingCart },
  { name: "GraduationCap", icon: GraduationCap },
  { name: "Radio", icon: Radio },
  { name: "Building2", icon: Building2 },
  { name: "Store", icon: Store },
  { name: "Zap", icon: Zap },
  { name: "Cpu", icon: Cpu },
  { name: "Layers", icon: Layers },
  { name: "BookOpen", icon: BookOpen },
  { name: "Briefcase", icon: Briefcase },
  { name: "FileText", icon: FileText },
  { name: "Handshake", icon: Handshake },
  { name: "ShieldCheck", icon: ShieldCheck },
  { name: "Leaf", icon: Leaf },
  { name: "Newspaper", icon: Newspaper },
  { name: "UserPlus", icon: UserPlus },
  { name: "FolderOpen", icon: FolderOpen },
  { name: "TrendingUp", icon: TrendingUp },
  { name: "Search", icon: Search },
  { name: "Gauge", icon: Gauge },
  { name: "Globe", icon: Globe },
  { name: "Award", icon: Award },
  { name: "Shield", icon: Shield },
  { name: "Monitor", icon: Monitor },
  { name: "Palette", icon: Palette },
  { name: "LineChart", icon: LineChart },
  { name: "Settings", icon: Settings },
  { name: "Mail", icon: Mail },
  { name: "Star", icon: Star },
  { name: "Image", icon: Image },
  { name: "MessageSquare", icon: MessageSquare },
  { name: "Phone", icon: Phone },
  { name: "MapPin", icon: MapPin },
  { name: "Calendar", icon: Calendar },
  { name: "Clock", icon: Clock },
  { name: "Check", icon: Check },
  { name: "Eye", icon: Eye },
  { name: "Lock", icon: Lock },
  { name: "Home", icon: Home },
  { name: "Menu", icon: Menu },
  { name: "ArrowRight", icon: ArrowRight },
  { name: "ExternalLink", icon: ExternalLink },
  { name: "Download", icon: Download },
  { name: "Upload", icon: Upload },
  { name: "Edit", icon: Edit },
  { name: "Copy", icon: Copy },
  { name: "Bell", icon: Bell },
  { name: "Heart", icon: Heart },
  { name: "Flag", icon: Flag },
  { name: "Bookmark", icon: Bookmark },
  { name: "Tag", icon: Tag },
  { name: "Hash", icon: Hash },
  { name: "DollarSign", icon: DollarSign },
  { name: "CreditCard", icon: CreditCard },
  { name: "Truck", icon: Truck },
  { name: "Package", icon: Package },
  { name: "Box", icon: Box },
  { name: "Factory", icon: Factory },
  { name: "Wrench", icon: Wrench },
  { name: "Database", icon: Database },
  { name: "Server", icon: Server },
  { name: "Wifi", icon: Wifi },
  { name: "BarChart", icon: BarChart },
  { name: "PieChart", icon: PieChart },
  { name: "Activity", icon: Activity },
  { name: "Layout", icon: Layout },
  { name: "Grid", icon: Grid },
  { name: "List", icon: List },
];

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  className?: string;
}

const IconPicker = ({ value, onChange, className }: IconPickerProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedEntry = iconEntries.find((e) => e.name === value);
  const SelectedIcon = selectedEntry?.icon;

  const filtered = search
    ? iconEntries.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase())
      )
    : iconEntries;

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full h-8 px-2 rounded-md border border-border/30 bg-white/[0.03] hover:bg-white/[0.05] transition-colors text-left"
      >
        {SelectedIcon ? (
          <>
            <SelectedIcon size={14} className="text-primary shrink-0" />
            <span className="text-xs truncate flex-1">{value}</span>
          </>
        ) : (
          <span className="text-xs text-muted-foreground flex-1">Choose icon...</span>
        )}
        <ChevronDown size={12} className={cn("text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-card border border-border/50 rounded-xl shadow-xl overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-border/20">
            <div className="relative">
              <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search icons..."
                className="w-full h-7 pl-7 pr-2 text-xs bg-transparent border border-border/20 rounded-md outline-none placeholder:text-muted-foreground/50 focus:border-primary/30"
                autoFocus
              />
            </div>
          </div>

          {/* Grid */}
          <div className="p-2 max-h-[200px] overflow-y-auto">
            <div className="grid grid-cols-6 gap-1">
              {filtered.map((entry) => (
                <button
                  key={entry.name}
                  type="button"
                  onClick={() => {
                    onChange(entry.name);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                    value === entry.name
                      ? "bg-primary/15 text-primary"
                      : "hover:bg-white/[0.05] text-muted-foreground hover:text-foreground"
                  )}
                  title={entry.name}
                >
                  <entry.icon size={16} />
                  <span className="text-[8px] leading-tight truncate w-full text-center">
                    {entry.name}
                  </span>
                </button>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">No icons found</p>
            )}
          </div>

          {/* Clear button */}
          {value && (
            <div className="p-2 border-t border-border/20">
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="w-full text-xs text-muted-foreground hover:text-destructive py-1"
              >
                Clear icon
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IconPicker;
