import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminApi } from "@/lib/api";
import {
  Layers, Package, FileText, Users, Star, Image, Mail,
  Building2, FolderOpen, Globe, Plug, ArrowRight, TrendingUp,
  CheckCircle2, AlertCircle, Loader2, Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

interface StatsData {
  services?: number;
  products?: number;
  blog_posts?: number;
  team?: number;
  testimonials?: number;
  logos?: number;
  submissions?: number;
  businesses?: number;
  resources?: number;
  industries?: number;
  mcp_configs?: number;
}

interface McpStatusResult {
  loading: boolean;
  ok: boolean | null;
  latencyMs: number | null;
  serverName: string | null;
  tools: string[];
  error: string | null;
}

// ─── Stat card ───────────────────────────────────────────────────────────────

const StatCard = ({
  label, value, icon: Icon, to, accent = false,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  to: string;
  accent?: boolean;
}) => (
  <Link
    to={to}
    className={cn(
      "glass-card rounded-xl p-5 flex flex-col gap-4 hover:shadow-md transition-all group border border-border/30 hover:border-primary/30",
      accent && "border-primary/20 bg-primary/5"
    )}
  >
    <div className="flex items-start justify-between">
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center",
        accent ? "gradient-bg" : "bg-secondary"
      )}>
        <Icon size={18} className={accent ? "text-primary-foreground" : "text-muted-foreground"} />
      </div>
      <ArrowRight size={14} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-1" />
    </div>
    <div>
      <p className="text-2xl font-bold leading-none">
        {value === undefined || value === null ? (
          <span className="inline-block w-8 h-6 bg-secondary rounded animate-pulse" />
        ) : value}
      </p>
      <p className="text-xs text-muted-foreground mt-1.5">{label}</p>
    </div>
  </Link>
);

// ─── Quick action ─────────────────────────────────────────────────────────────

const QuickAction = ({
  label, to, icon: Icon, description,
}: {
  label: string;
  to: string;
  icon: React.ElementType;
  description: string;
}) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border/30 hover:border-primary/30 hover:bg-primary/5 transition-all group glass-card"
  >
    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 group-hover:gradient-bg transition-all">
      <Icon size={15} className="text-muted-foreground group-hover:text-primary-foreground" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium truncate">{label}</p>
      <p className="text-[11px] text-muted-foreground truncate">{description}</p>
    </div>
    <ArrowRight size={13} className="text-muted-foreground/40 group-hover:text-primary shrink-0" />
  </Link>
);

// ─── MCP Status widget ────────────────────────────────────────────────────────

const McpStatusWidget = ({ mcpCount }: { mcpCount: number }) => {
  const [status, setStatus] = useState<McpStatusResult>({
    loading: true,
    ok: null,
    latencyMs: null,
    serverName: null,
    tools: [],
    error: null,
  });

  useEffect(() => {
    const check = async () => {
      const start = Date.now();
      try {
        const res = await fetch("https://engineerstechbd.com/mcp/health", {
          signal: AbortSignal.timeout(5000),
        });
        const latencyMs = Date.now() - start;
        if (res.ok) {
          const data = await res.json().catch(() => ({}));
          setStatus({
            loading: false,
            ok: true,
            latencyMs,
            serverName: data.server ?? "EngineersTechBD",
            tools: Array.isArray(data.tools) ? data.tools : [],
            error: null,
          });
        } else {
          setStatus({ loading: false, ok: false, latencyMs, serverName: null, tools: [], error: `HTTP ${res.status}` });
        }
      } catch (err: any) {
        setStatus({ loading: false, ok: false, latencyMs: null, serverName: null, tools: [], error: err.message ?? "Unreachable" });
      }
    };
    check();
  }, []);

  return (
    <div className="glass-card rounded-xl border border-border/30 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Plug size={15} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">MCP Server</h3>
            <p className="text-[11px] text-muted-foreground">Live endpoint status</p>
          </div>
        </div>
        <Link
          to="/admin/mcp-configs"
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          Manage <ArrowRight size={11} />
        </Link>
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-3 mb-4">
        {status.loading ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 size={14} className="animate-spin" />
            Checking endpoint…
          </div>
        ) : status.ok ? (
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-60" />
            </div>
            <span className="text-xs text-green-500 font-medium">Live</span>
            {status.latencyMs !== null && (
              <span className="text-[11px] text-muted-foreground">· {status.latencyMs}ms</span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
            <span className="text-xs text-destructive font-medium">Offline</span>
            {status.error && (
              <span className="text-[11px] text-muted-foreground">· {status.error}</span>
            )}
          </div>
        )}
      </div>

      {/* Server info */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg bg-secondary/50 px-3 py-2.5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Endpoint</p>
          <p className="text-xs font-medium truncate">engineerstechbd.com/mcp</p>
        </div>
        <div className="rounded-lg bg-secondary/50 px-3 py-2.5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Server</p>
          <p className="text-xs font-medium truncate">{status.serverName ?? "—"}</p>
        </div>
        <div className="rounded-lg bg-secondary/50 px-3 py-2.5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Transport</p>
          <p className="text-xs font-medium">Streamable HTTP</p>
        </div>
        <div className="rounded-lg bg-secondary/50 px-3 py-2.5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Saved Configs</p>
          <p className="text-xs font-medium">{mcpCount}</p>
        </div>
      </div>

      {/* Tools */}
      {status.tools.length > 0 && (
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-2">Available Tools</p>
          <div className="flex flex-wrap gap-1.5">
            {status.tools.map((tool) => (
              <span
                key={tool}
                className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────

const AdminDashboard = () => {
  const [stats, setStats] = useState<StatsData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.stats().then((data) => {
      setStats(data ?? {});
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: "Services",       key: "services",     icon: Layers,      to: "/admin/services",     accent: false },
    { label: "Products",       key: "products",     icon: Package,     to: "/admin/products",     accent: false },
    { label: "Blog Posts",     key: "blog_posts",   icon: FileText,    to: "/admin/blog",         accent: false },
    { label: "Team Members",   key: "team",         icon: Users,       to: "/admin/team",         accent: false },
    { label: "Testimonials",   key: "testimonials", icon: Star,        to: "/admin/testimonials", accent: false },
    { label: "Client Logos",   key: "logos",        icon: Image,       to: "/admin/logos",        accent: false },
    { label: "Businesses",     key: "businesses",   icon: Building2,   to: "/admin/businesses",   accent: false },
    { label: "Inbox",          key: "submissions",  icon: Mail,        to: "/admin/submissions",  accent: true  },
  ];

  const quickActions = [
    { label: "New Blog Post",    to: "/admin/blog",         icon: FileText,  description: "Write and publish a new article" },
    { label: "Add Service",      to: "/admin/services",     icon: Layers,    description: "Define a new service offering" },
    { label: "Add Business",     to: "/admin/businesses",   icon: Building2, description: "Register a business profile" },
    { label: "MCP Config",       to: "/admin/mcp-configs",  icon: Plug,      description: "Connect an AI client via MCP" },
    { label: "Site Settings",    to: "/admin/settings",     icon: Activity,  description: "Edit SEO, contact, and brand info" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your content, team, and AI connections.
        </p>
      </div>

      {/* Stats grid */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Content Stats</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {statCards.map((s) => (
            <StatCard
              key={s.key}
              label={s.label}
              value={loading ? "…" : (stats as any)[s.key] ?? 0}
              icon={s.icon}
              to={s.to}
              accent={s.accent}
            />
          ))}
        </div>
      </div>

      {/* Lower section: quick actions + MCP widget */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Quick actions */}
        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((a) => (
              <QuickAction key={a.to} label={a.label} to={a.to} icon={a.icon} description={a.description} />
            ))}
          </div>
        </div>

        {/* MCP widget */}
        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">MCP Server Status</h3>
          <McpStatusWidget mcpCount={loading ? 0 : (stats as any).mcp_configs ?? 0} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
