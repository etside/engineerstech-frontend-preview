import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Building2 } from "lucide-react";

interface Business {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  services: string[] | null;
  categories: string[] | null;
  industries: string[] | null;
  technologies: string[] | null;
  city: string | null;
  country: string | null;
  rating: number | null;
  review_count: number | null;
  verification_status: string | null;
  is_verified: boolean;
  is_active: boolean;
  is_featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
}

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  services: "",
  categories: "",
  industries: "",
  technologies: "",
  city: "",
  country: "",
  website: "",
  email: "",
  phone: "",
  rating: "",
  review_count: "",
  verification_status: "pending",
  is_verified: false,
  is_active: true,
  is_featured: false,
  seo_title: "",
  seo_description: "",
  structured_data: "",
};

const AdminBusinesses = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Business | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchItems = async () => {
    try {
      const data = await adminApi.getBusinesses();
      setItems(data || []);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (item: Business) => {
    setEditing(item);
    setForm({
      name: item.name,
      slug: item.slug || "",
      description: item.description || "",
      services: (item.services || []).join(", "),
      categories: (item.categories || []).join(", "),
      industries: (item.industries || []).join(", "),
      technologies: (item.technologies || []).join(", "),
      city: item.city || "",
      country: item.country || "",
      website: "",
      email: "",
      phone: "",
      rating: item.rating?.toString() || "",
      review_count: item.review_count?.toString() || "",
      verification_status: item.verification_status || "pending",
      is_verified: item.is_verified,
      is_active: item.is_active,
      is_featured: item.is_featured,
      seo_title: item.seo_title || "",
      seo_description: item.seo_description || "",
      structured_data: item.structured_data ? JSON.stringify(item.structured_data, null, 2) : "",
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      services: form.services.split(",").map((s) => s.trim()).filter(Boolean),
      categories: form.categories.split(",").map((s) => s.trim()).filter(Boolean),
      industries: form.industries.split(",").map((s) => s.trim()).filter(Boolean),
      technologies: form.technologies.split(",").map((s) => s.trim()).filter(Boolean),
      city: form.city,
      country: form.country,
      website: form.website,
      email: form.email,
      phone: form.phone,
      rating: form.rating ? Number(form.rating) : null,
      review_count: form.review_count ? Number(form.review_count) : 0,
      verification_status: form.verification_status,
      is_verified: form.is_verified,
      is_active: form.is_active,
      is_featured: form.is_featured,
      seo_title: form.seo_title,
      seo_description: form.seo_description,
      structured_data: null,
    };

    // If admin provided JSON-LD in structured_data field, attempt to parse
    if (form.structured_data && form.structured_data.trim()) {
      try {
        payload.structured_data = JSON.parse(form.structured_data);
      } catch (e) {
        toast({ title: 'Invalid JSON-LD', description: 'Structured data must be valid JSON', variant: 'destructive' });
        return;
      }
    }

    try {
      if (editing) {
        await adminApi.updateBusiness(editing.id, payload);
        toast({ title: "Business updated" });
      } else {
        await adminApi.createBusiness(payload);
        toast({ title: "Business created" });
      }
      setShowForm(false);
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this business?")) return;
    try {
      await adminApi.deleteBusiness(id);
      toast({ title: "Business deleted" });
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Businesses</h2>
        <Button onClick={openNew} size="sm" className="gradient-bg border-0"><Plus size={14} className="mr-1" /> Add Business</Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-xl p-5 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">{editing ? "Edit Business" : "New Business"}</h3>
            <button onClick={() => setShowForm(false)}><X size={16} className="text-muted-foreground" /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="space-y-1"><Label>Slug (auto if blank)</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
          </div>
          <div className="space-y-1"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Services (comma separated)</Label><Input value={form.services} onChange={(e) => setForm({ ...form, services: e.target.value })} /></div>
            <div className="space-y-1"><Label>Categories (comma separated)</Label><Input value={form.categories} onChange={(e) => setForm({ ...form, categories: e.target.value })} /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Industries (comma separated)</Label><Input value={form.industries} onChange={(e) => setForm({ ...form, industries: e.target.value })} /></div>
            <div className="space-y-1"><Label>Technologies (comma separated)</Label><Input value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} /></div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-1"><Label>City</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
            <div className="space-y-1"><Label>Country</Label><Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} /></div>
            <div className="space-y-1"><Label>Verification Status</Label><Input value={form.verification_status} onChange={(e) => setForm({ ...form, verification_status: e.target.value })} /></div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-1"><Label>Website</Label><Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></div>
            <div className="space-y-1"><Label>Email</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="space-y-1"><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-1"><Label>Rating</Label><Input type="number" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} step="0.1" /></div>
            <div className="space-y-1"><Label>Review Count</Label><Input type="number" value={form.review_count} onChange={(e) => setForm({ ...form, review_count: e.target.value })} /></div>
            <div className="space-y-1"><Label>SEO Title</Label><Input value={form.seo_title} onChange={(e) => setForm({ ...form, seo_title: e.target.value })} /></div>
          </div>
          <div className="space-y-1"><Label>SEO Description</Label><Textarea value={form.seo_description} onChange={(e) => setForm({ ...form, seo_description: e.target.value })} rows={2} /></div>
          <div className="space-y-1"><Label>Structured data (JSON-LD)</Label><Textarea value={form.structured_data} onChange={(e) => setForm({ ...form, structured_data: e.target.value })} rows={6} placeholder='{"@context":"https://schema.org","@type":"LocalBusiness",...}' /></div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_verified} onChange={(e) => setForm({ ...form, is_verified: e.target.checked })} /> Verified</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} /> Featured</label>
          </div>
          <Button onClick={handleSave} className="gradient-bg border-0">{editing ? "Update" : "Create"}</Button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-lg bg-primary/10 p-2"><Building2 size={16} className="text-primary" /></div>
              <div>
                <p className="font-medium text-sm">{item.name} <span className="text-xs text-muted-foreground">/{item.slug}</span></p>
                <p className="text-xs text-muted-foreground">{item.city}, {item.country} · {item.verification_status}</p>
                <p className="text-xs text-muted-foreground truncate max-w-md">{item.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.is_verified ? "bg-green-500/10 text-green-400" : "bg-muted text-muted-foreground"}`}>{item.is_verified ? "Verified" : "Pending"}</span>
              <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-secondary"><Pencil size={14} className="text-muted-foreground" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-destructive/10"><Trash2 size={14} className="text-destructive" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">No businesses yet.</p>}
      </div>
    </div>
  );
};

export default AdminBusinesses;
