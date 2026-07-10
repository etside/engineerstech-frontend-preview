import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard, Layers, Package, FileText, Users, MessageSquare,
  Image, Settings, Mail, LogOut, Menu, X, Star, Navigation,
  Globe, FolderOpen, Building2, Plug, ChevronLeft, ChevronRight,
  ExternalLink, Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import logoLight from "@/assets/logo-dark-bg.svg";
import { cn } from "@/lib/utils";

// ─── Nav groups ──────────────────────────────────────────────────────────────

const navGroups = [
  {
    label: "Overview",
    items: [
      { to: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
    ],
  },
  {
    label: "Content",
    items: [
      { to: "/admin/services",    icon: Layers,      label: "Services" },
      { to: "/admin/industries",  icon: Globe,       label: "Industries" },
      { to: "/admin/products",    icon: Package,     label: "Products" },
      { to: "/admin/blog",        icon: FileText,    label: "Blog Posts" },
      { to: "/admin/case-studies",icon: FolderOpen,  label: "Case Studies" },
      { to: "/admin/resources",   icon: FolderOpen,  label: "Resources" },
    ],
  },
  {
    label: "People",
    items: [
      { to: "/admin/team",         icon: Users,        label: "Team" },
      { to: "/admin/testimonials", icon: Star,         label: "Testimonials" },
      { to: "/admin/logos",        icon: Image,        label: "Client Logos" },
      { to: "/admin/businesses",   icon: Building2,    label: "Businesses" },
      { to: "/admin/submissions",  icon: Mail,         label: "Submissions",  badge: "inbox" },
    ],
  },
  {
    label: "Configuration",
    items: [
      { to: "/admin/navigation",  icon: Navigation,  label: "Navigation" },
      { to: "/admin/mcp-configs", icon: Plug,        label: "MCP Config",   badge: "ai" },
      { to: "/admin/settings",    icon: Settings,    label: "Site Settings" },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const AdminLayout = () => {
  const { user, signOut, isAdmin, loading } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center glass-card rounded-2xl p-8 max-w-md">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-4">You don't have admin permissions.</p>
          <Button onClick={signOut} variant="outline">Sign Out</Button>
        </div>
      </div>
    );
  }

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  const currentLabel = navGroups
    .flatMap((g) => g.items)
    .find((n) => isActive(n.to, (n as any).exact))?.label ?? "Admin";

  // Initials from email
  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : "AU";

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo + collapse button */}
      <div className={cn(
        "flex items-center border-b border-border/40 shrink-0",
        collapsed && !isMobile ? "justify-center px-3 py-4" : "justify-between px-4 py-4"
      )}>
        {(!collapsed || isMobile) && (
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <img src={logoLight} alt="engineersTech" className="h-6 shrink-0" />
          </Link>
        )}
        {/* Desktop collapse toggle */}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
        {/* Mobile close */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            {/* Group label (hidden when collapsed on desktop) */}
            {(!collapsed || isMobile) && (
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 select-none">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.to, (item as any).exact);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => isMobile && setMobileOpen(false)}
                    title={collapsed && !isMobile ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg text-sm transition-colors relative group",
                      collapsed && !isMobile ? "justify-center px-2 py-2.5" : "px-3 py-2.5",
                      active
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <item.icon size={16} className="shrink-0" />
                    {(!collapsed || isMobile) && (
                      <>
                        <span className="flex-1 truncate">{item.label}</span>
                        {(item as any).badge === "ai" && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-semibold">
                            AI
                          </span>
                        )}
                        {(item as any).badge === "inbox" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                        )}
                      </>
                    )}
                    {/* Tooltip when collapsed */}
                    {collapsed && !isMobile && (
                      <div className="absolute left-full ml-2 px-2 py-1 rounded-md bg-popover border border-border text-xs text-popover-foreground whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-md">
                        {item.label}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer: user info + sign-out */}
      <div className={cn(
        "border-t border-border/40 p-3 shrink-0",
        collapsed && !isMobile ? "flex flex-col items-center gap-2" : "space-y-1"
      )}>
        {(!collapsed || isMobile) && (
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg">
            <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-[10px] font-bold text-primary-foreground shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate leading-tight">{user?.email}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">Administrator</p>
            </div>
          </div>
        )}
        {collapsed && !isMobile && (
          <div
            title={user?.email}
            className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-[10px] font-bold text-primary-foreground cursor-default"
          >
            {initials}
          </div>
        )}
        <button
          onClick={signOut}
          title={collapsed && !isMobile ? "Sign Out" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full",
            collapsed && !isMobile ? "justify-center px-2 py-2" : "px-3 py-2"
          )}
        >
          <LogOut size={15} className="shrink-0" />
          {(!collapsed || isMobile) && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  const sidebarWidth = collapsed ? "w-[60px]" : "w-60";

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className={cn(
        "hidden lg:flex fixed left-0 top-0 h-screen border-r border-border/40 flex-col z-30 transition-all duration-200 bg-card/50",
        sidebarWidth
      )}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-60 bg-card border-r border-border/40 shadow-xl">
            <SidebarContent isMobile />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className={cn(
        "flex flex-col min-h-screen transition-all duration-200",
        collapsed ? "lg:ml-[60px]" : "lg:ml-60"
      )}>
        {/* Top header */}
        <header className="sticky top-0 z-40 h-14 border-b border-border/40 flex items-center px-4 gap-3 bg-background/80 backdrop-blur-md">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={18} />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold truncate">{currentLabel}</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* View site link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-lg hover:bg-secondary transition-colors"
            >
              <ExternalLink size={13} />
              <span>View Site</span>
            </a>

            {/* MCP indicator */}
            <Link
              to="/admin/mcp-configs"
              className="hidden sm:flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Plug size={12} />
              <span className="font-medium">MCP</span>
            </Link>

            {/* Avatar */}
            <div className="w-7 h-7 rounded-full gradient-bg flex items-center justify-center text-[10px] font-bold text-primary-foreground">
              {initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      <Toaster />
    </div>
  );
};

export default AdminLayout;
