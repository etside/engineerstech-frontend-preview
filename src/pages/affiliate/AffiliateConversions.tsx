import { useEffect, useState } from "react";
import { affiliateApi } from "@/lib/affiliateApi";
import SEO from "@/components/SEO";

const statusColors: Record<string, string> = {
  pending: "text-yellow-500",
  approved: "text-green-500",
  paid: "text-blue-500",
};

const AffiliateConversions = () => {
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    affiliateApi.conversions(page)
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="space-y-6">
      <SEO title="Conversions" description="View your affiliate conversion history" path="/affiliate/conversions" />
      <h1 className="text-2xl font-bold">Conversions</h1>
      <div className="glass-card rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-10">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : data?.data?.length ? (
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden sm:table-cell">Amount</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Commission</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((conv: any) => (
                <tr key={conv.id} className="border-b last:border-0">
                  <td className="p-3 capitalize">{conv.conversion_type.replace(/_/g, " ")}</td>
                  <td className="p-3 hidden sm:table-cell">৳{Number(conv.amount).toFixed(2)}</td>
                  <td className="p-3 text-right">৳{Number(conv.commission).toFixed(2)}</td>
                  <td className={`p-3 text-right capitalize ${statusColors[conv.status] || ""}`}>{conv.status}</td>
                  <td className="p-3 text-right text-muted-foreground">{new Date(conv.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-6 text-center text-muted-foreground">No conversions yet.</p>
        )}
      </div>
      {data?.last_page > 1 && (
        <div className="flex justify-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={!data.prev_page_url} className="px-3 py-1 text-sm rounded border disabled:opacity-50">Previous</button>
          <span className="px-3 py-1 text-sm">Page {data.current_page} of {data.last_page}</span>
          <button onClick={() => setPage((p) => p + 1)} disabled={!data.next_page_url} className="px-3 py-1 text-sm rounded border disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  );
};

export default AffiliateConversions;
