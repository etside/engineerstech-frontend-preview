import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Layers, Package, FileText, Users, Star, Image, Mail } from "lucide-react";

const AdminDashboard = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const tables = ["services", "products", "blog_posts", "team_members", "testimonials", "client_logos", "contact_submissions"];
    Promise.all(
      tables.map(async (t) => {
        const { count } = await supabase.from(t as any).select("*", { count: "exact", head: true });
        return [t, count ?? 0] as const;
      })
    ).then((results) => setCounts(Object.fromEntries(results)));
  }, []);

  const stats = [
    { label: "Services", key: "services", icon: Layers },
    { label: "Products", key: "products", icon: Package },
    { label: "Blog Posts", key: "blog_posts", icon: FileText },
    { label: "Team Members", key: "team_members", icon: Users },
    { label: "Testimonials", key: "testimonials", icon: Star },
    { label: "Client Logos", key: "client_logos", icon: Image },
    { label: "Contact Messages", key: "contact_submissions", icon: Mail },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold mb-6">Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.key} className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
                <s.icon size={16} className="text-primary-foreground" />
              </div>
            </div>
            <p className="text-2xl font-bold">{counts[s.key] ?? "—"}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
