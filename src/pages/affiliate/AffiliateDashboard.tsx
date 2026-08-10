import { useEffect, useState } from "react";
import { affiliateApi } from "@/lib/affiliateApi";
import SEO from "@/components/SEO";
import { MousePointerClick, DollarSign, TrendingUp, Clock } from "lucide-react";

const StatCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) => (
  <div className="glass-card rounded-xl p-5">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon size={18} className="text-primary" />
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const AffiliateDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    affiliateApi.dashboard()
      .then((data) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SEO title="Affiliate Dashboard" description="Your affiliate performance overview" path="/affiliate" />
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={MousePointerClick} label="Total Clicks" value={stats?.stats?.total_clicks ?? 0} />
        <StatCard icon={TrendingUp} label="Conversions" value={stats?.stats?.total_conversions ?? 0} />
        <StatCard icon={DollarSign} label="Total Earnings" value={`৳${(stats?.stats?.total_earnings ?? 0).toFixed(2)}`} />
        <StatCard icon={Clock} label="Pending" value={`৳${(stats?.stats?.pending_earnings ?? 0).toFixed(2)}`} />
      </div>
      <div className="glass-card rounded-xl p-5">
        <h2 className="font-semibold mb-3">Recent Clicks</h2>
        {stats?.recent_clicks?.length ? (
          <div className="space-y-2">
            {stats.recent_clicks.map((click: any) => (
              <div key={click.id} className="flex items-center justify-between text-sm py-2 border-b last:border-0">
                <span className="text-muted-foreground truncate max-w-[200px]">{click.landing_page}</span>
                <span className="text-xs text-muted-foreground">{new Date(click.clicked_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No clicks yet. Share your referral link to get started!</p>
        )}
      </div>
    </div>
  );
};

export default AffiliateDashboard;
