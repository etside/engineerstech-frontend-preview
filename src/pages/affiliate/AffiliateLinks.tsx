import { useEffect, useState } from "react";
import { affiliateApi } from "@/lib/affiliateApi";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check } from "lucide-react";

const pages = [
  { label: "Homepage", url: "https://engineerstechbd.com" },
  { label: "Services", url: "https://engineerstechbd.com/services" },
  { label: "Products", url: "https://engineerstechbd.com/products" },
  { label: "Contact", url: "https://engineerstechbd.com/contact" },
  { label: "Blog", url: "https://engineerstechbd.com/blog" },
];

const AffiliateLinks = () => {
  const [refCode, setRefCode] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState("");

  useEffect(() => {
    affiliateApi.referralLink().then((data) => setRefCode(data.ref_code)).catch(() => {});
  }, []);

  const makeLink = (url: string) => `${url}${url.includes("?") ? "&" : "?"}ref=${refCode}`;

  const copyLink = (url: string, key: string) => {
    navigator.clipboard.writeText(url);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <SEO title="Referral Links" description="Your affiliate referral links" path="/affiliate/links" />
      <h1 className="text-2xl font-bold">Referral Links</h1>
      <div className="glass-card rounded-xl p-5 space-y-4">
        <h2 className="font-semibold">Your Referral Code</h2>
        <div className="flex items-center gap-2">
          <code className="bg-muted px-3 py-2 rounded text-sm font-mono">{refCode}</code>
          <Button variant="outline" size="sm" onClick={() => copyLink(refCode, "code")}>
            {copied === "code" ? <Check size={14} /> : <Copy size={14} />}
          </Button>
        </div>
      </div>
      <div className="glass-card rounded-xl p-5 space-y-3">
        <h2 className="font-semibold">Pre-built Links</h2>
        {pages.map((page) => {
          const link = makeLink(page.url);
          return (
            <div key={page.label} className="flex items-center justify-between gap-3 py-2 border-b last:border-0">
              <div className="min-w-0">
                <p className="text-sm font-medium">{page.label}</p>
                <p className="text-xs text-muted-foreground truncate">{link}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => copyLink(link, page.label)}>
                {copied === page.label ? <Check size={14} /> : <Copy size={14} />}
              </Button>
            </div>
          );
        })}
      </div>
      <div className="glass-card rounded-xl p-5 space-y-3">
        <h2 className="font-semibold">Custom Link</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Enter any URL from engineerstechbd.com"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={() => {
              if (customUrl) copyLink(makeLink(customUrl), "custom");
            }}
          >
            {copied === "custom" ? <Check size={14} /> : <Copy size={14} />}
          </Button>
        </div>
        {customUrl && (
          <p className="text-xs text-muted-foreground break-all">{makeLink(customUrl)}</p>
        )}
      </div>
    </div>
  );
};

export default AffiliateLinks;
