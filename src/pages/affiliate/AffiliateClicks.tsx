import { useEffect, useState } from "react";
import { affiliateApi } from "@/lib/affiliateApi";
import SEO from "@/components/SEO";

const AffiliateClicks = () => {
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    affiliateApi.clicks(page)
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="space-y-6">
      <SEO title="Click History" description="View your affiliate click history" path="/affiliate/clicks" />
      <h1 className="text-2xl font-bold">Click History</h1>
      <div className="glass-card rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-10">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : data?.data?.length ? (
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">Landing Page</th>
                <th className="text-left p-3 font-medium text-muted-foreground">IP</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden sm:table-cell">Referrer</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((click: any) => (
                <tr key={click.id} className="border-b last:border-0">
                  <td className="p-3 truncate max-w-[200px]">{click.landing_page}</td>
                  <td className="p-3 text-muted-foreground">{click.ip_address}</td>
                  <td className="p-3 text-muted-foreground hidden sm:table-cell truncate max-w-[150px]">{click.referrer || "—"}</td>
                  <td className="p-3 text-right text-muted-foreground">{new Date(click.clicked_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-6 text-center text-muted-foreground">No clicks recorded yet.</p>
        )}
      </div>
      {data?.last_page > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!data.prev_page_url}
            className="px-3 py-1 text-sm rounded border disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1 text-sm">Page {data.current_page} of {data.last_page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!data.next_page_url}
            className="px-3 py-1 text-sm rounded border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AffiliateClicks;
