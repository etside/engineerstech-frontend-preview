import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { affiliateApi } from "@/lib/affiliateApi";
import { LayoutDashboard, MousePointerClick, DollarSign, Link2, LogOut } from "lucide-react";

const navItems = [
  { to: "/affiliate", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { to: "/affiliate/links", icon: Link2, label: "Referral Links" },
  { to: "/affiliate/clicks", icon: MousePointerClick, label: "Clicks" },
  { to: "/affiliate/conversions", icon: DollarSign, label: "Conversions" },
];

const AffiliateLayout = () => {
  const { pathname } = useLocation();

  if (!affiliateApi.isAuthenticated()) {
    return <Navigate to="/affiliate/login" replace />;
  }

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname.startsWith(to);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 border-r bg-card p-4 space-y-1 hidden md:block">
          <h2 className="text-lg font-bold mb-4 px-3">Affiliate Portal</h2>
          {navItems.map(({ to, icon: Icon, label, exact }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive(to, exact)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
          <button
            onClick={() => { affiliateApi.logout(); window.location.href = "/affiliate/login"; }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted w-full mt-4"
          >
            <LogOut size={16} />
            Logout
          </button>
        </aside>
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AffiliateLayout;
