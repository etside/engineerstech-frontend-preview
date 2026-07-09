import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

const Discover = () => {
  const [q, setQ] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    try {
      const data = await api.searchBusinesses({ q: q || undefined, lat: lat ? Number(lat) : undefined, lon: lon ? Number(lon) : undefined });
      setResults(data || []);
    } catch (err: any) {
      setResults([]);
    } finally { setLoading(false); }
  };

  const [showJson, setShowJson] = useState<Record<string, boolean>>({});

  return (
    <div className="min-h-screen">
      <SEO 
        title="Discover Businesses" 
        description="Search and discover businesses in Bangladesh by location, category, and more."
        path="/discover"
      />
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-2">Discover Businesses</h1>
        <p className="text-muted-foreground mb-8">Search for businesses by name, location, and more.</p>
        
        <div className="glass-card rounded-xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Search Term</label>
              <Input placeholder="e.g., barber, POS, restaurant" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Latitude (Optional)</label>
              <Input placeholder="e.g., 23.8103" value={lat} onChange={(e) => setLat(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Longitude (Optional)</label>
              <Input placeholder="e.g., 90.4125" value={lon} onChange={(e) => setLon(e.target.value)} />
            </div>
          </div>
          <Button onClick={search} disabled={loading} className="gradient-bg border-0 w-full sm:w-auto">
            {loading ? 'Searching…' : 'Search'}
          </Button>
        </div>

        <div className="space-y-4">
          {results.length === 0 && !loading && <p className="text-center text-muted-foreground py-12">No results found. Try adjusting your search.</p>}
          {loading && <p className="text-center text-muted-foreground py-12">Searching...</p>}
          {results.map((b: any) => (
            <div key={b.id} className="glass-card p-4 rounded-lg hover:border-primary/30 transition-colors">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-base">{b.name}</h3>
                  <p className="text-xs text-muted-foreground">{b.city}, {b.country} · <span className="capitalize">{b.verification_status}</span></p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{b.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2 whitespace-nowrap">
                  <Link to={`/businesses/${b.slug}`} className="text-primary hover:underline text-sm font-medium">View Profile →</Link>
                  {b.json_ld && (
                    <button 
                      className="text-xs text-muted-foreground hover:text-primary transition-colors" 
                      onClick={() => setShowJson({ ...showJson, [b.slug]: !showJson[b.slug] })}
                    >
                      {showJson[b.slug] ? '↑ Hide' : '↓ JSON-LD'}
                    </button>
                  )}
                </div>
              </div>
              {b.json_ld && showJson[b.slug] && (
                <pre className="mt-4 p-3 bg-secondary text-xs text-foreground overflow-auto rounded-lg border border-border/50 max-h-96">
                  {JSON.stringify(b.json_ld, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
