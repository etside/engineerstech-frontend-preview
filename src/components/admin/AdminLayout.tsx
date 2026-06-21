import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard, Layers, Package, FileText, Users, MessageSquare,
  Image, Settings, Mail, LogOut, Menu, X, Star, Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import logoLight from "@/assets/logo-dark-bg.svg";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { to: "/admin/services", icon: Layers, label: "Services" },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/blog", icon: FileText, label: "Blog Posts" },
  { to: "/admin/team", icon: Users, label: "Team" },
  { to: "/admin/testimonials", icon: Star, label: "Testimonials" },
  { to: "/admin/logos", icon: Image, label: "Client Logos" },
  { to: "/admin/submissions", icon: Mail, label: "Contact Submissions" },
  { to: "/admin/navigation", icon: Navigation, label: "Navigation" },
  { to: "/admin/case-studies", icon: FileText, label: "Case Studies" },
  { to: "/admin/settings", icon: Settings, label: "Site Settings" },
];

const AdminLayout = () => {
  const { user, signOut, isAdmin, loading } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

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

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoLight} alt="engineersTech" className="h-6" />
        </Link>
        <p className="text-[10px] text-muted-foreground mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isActive(item.to, item.exact)
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-border/50">
        <div className="px-3 py-2 text-xs text-muted-foreground truncate mb-2">{user?.email}</div>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-60 border-r border-border/50 flex-col z-30">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-60 bg-card border-r border-border/50">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content offset for fixed sidebar */}
      <div className="lg:ml-60 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 h-14 border-b border-border/50 flex items-center px-4 gap-3 bg-background/80 backdrop-blur-sm">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-secondary"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={18} />
          </button>
          <h1 className="text-sm font-semibold">
            {navItems.find((n) => isActive(n.to, n.exact))?.label || "Admin"}
          </h1>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminLayout;
