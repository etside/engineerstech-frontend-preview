import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { ArrowLeft, MapPin, Globe, Phone, Mail, ExternalLink } from "lucide-react";

interface Business {
  id: number;
  name: string;
  slug: string;
  description: string;
  city: string;
  country: string;
  website: string | null;
  phone: string | null;
  email: string | null;
  logo_url: string | null;
  verification_status: string;
  json_ld: any;
}

const BusinessDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getBusiness(slug)
      .then((data) => setBusiness(data))
      .catch((err) => setError(err.message || "Business not found"))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">{error || "Business not found"}</p>
        <Link to="/discover" className="text-primary hover:underline text-sm">← Back to Discover</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link to="/discover" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft size={14} /> Back to Discover
      </Link>

      <div className="glass-card rounded-2xl p-6 md:p-8">
        <div className="flex items-start gap-4 mb-6">
          {business.logo_url && (
            <img src={business.logo_url} alt={business.name} className="w-16 h-16 rounded-lg object-cover" />
          )}
          <div>
            <h1 className="text-2xl font-bold">{business.name}</h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <MapPin size={14} />
              {business.city}, {business.country}
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary/10 text-primary capitalize">
                {business.verification_status}
              </span>
            </div>
          </div>
        </div>

        {business.description && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold mb-2">About</h2>
            <p className="text-muted-foreground leading-relaxed">{business.description}</p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border/20">
          {business.website && (
            <a href={business.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
              <Globe size={14} /> Website <ExternalLink size={10} />
            </a>
          )}
          {business.phone && (
            <a href={`tel:${business.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <Phone size={14} /> {business.phone}
            </a>
          )}
          {business.email && (
            <a href={`mailto:${business.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <Mail size={14} /> {business.email}
            </a>
          )}
        </div>
      </div>

      {business.json_ld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(business.json_ld) }}
        />
      )}
    </div>
  );
};

export default BusinessDetail;
