import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  icon: string | null;
  features: string[] | null;
  technologies: string[] | null;
  hero_image: string | null;
  display_order: number;
  is_active: boolean;
  is_featured: boolean;
}

const emptyForm = {
  title: "", slug: "", description: "", long_description: "",
  icon: "", features: "", technologies: "", hero_image: "",
  display_order: 0, is_active: true, is_featured: false,
};

const AdminServices = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchItems = async () => {
    try {
      const data = await adminApi.getServices();
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
    setForm({ ...emptyForm, display_order: items.length });
    setShowForm(true);
  };

  const openEdit = (item: Service) => {
    setEditing(item);
    setForm({
      title: item.title,
      slug: item.slug || "",
      description: item.description || "",
      long_description: item.long_description || "",
      icon: item.icon || "",
      features: (item.features || []).join("\n"),
      technologies: (item.technologies || []).join(", "),
      hero_image: item.hero_image || "",
      display_order: item.display_order,
      is_active: item.is_active,
      is_featured: item.is_featured,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    const payload = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      long_description: form.long_description,
      icon: form.icon,
      features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
      technologies: form.technologies.split(",").map((s) => s.trim()).filter(Boolean),
      hero_image: form.hero_image,
      display_order: form.display_order,
      is_active: form.is_active,
      is_featured: form.is_featured,
    };
    try {
      if (editing) {
        await adminApi.updateService(editing.id, payload);
        toast({ title: "Service updated" });
      } else {
        await adminApi.createService(payload);
        toast({ title: "Service created" });
      }
      setShowForm(false);
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this service?")) return;
    try {
      await adminApi.deleteService(id);
      toast({ title: "Service deleted" });
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Services</h2>
        <Button onClick={openNew} size="sm" className="gradient-bg border-0"><Plus size={14} className="mr-1" /> Add Service</Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-xl p-5 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">{editing ? "Edit Service" : "New Service"}</h3>
            <button onClick={() => setShowForm(false)}><X size={16} className="text-muted-foreground" /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div className="space-y-1"><Label>Slug (auto if blank)</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="e.g. mvp-development" /></div>
          </div>
          <div className="space-y-1"><Label>Short Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} /></div>
          <div className="space-y-1"><Label>Long Description (detail page)</Label><Textarea value={form.long_description} onChange={(e) => setForm({ ...form, long_description: e.target.value })} rows={4} /></div>
          <div className="space-y-1"><Label>Features (one per line)</Label><Textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={4} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Technologies (comma separated)</Label><Input value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} placeholder="React, Node.js, AWS" /></div>
            <div className="space-y-1"><Label>Icon (Lucide name)</Label><Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="e.g. Rocket" /></div>
          </div>
          <ImageUpload label="Hero Image" folder="services" value={form.hero_image} onChange={(url) => setForm({ ...form, hero_image: url })} />
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-1"><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} /></div>
            <div className="flex items-center gap-2 pt-6"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /><Label>Active</Label></div>
            <div className="flex items-center gap-2 pt-6"><input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} /><Label>Featured (homepage)</Label></div>
          </div>
          <Button onClick={handleSave} className="gradient-bg border-0">{editing ? "Update" : "Create"}</Button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">
                {item.title} <span className="text-xs text-muted-foreground">/{item.slug}</span>
                {item.is_featured && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">Featured</span>}
              </p>
              <p className="text-xs text-muted-foreground truncate max-w-md">{item.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.is_active ? "bg-green-500/10 text-green-400" : "bg-muted text-muted-foreground"}`}>
                {item.is_active ? "Active" : "Inactive"}
              </span>
              <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-secondary"><Pencil size={14} className="text-muted-foreground" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-destructive/10"><Trash2 size={14} className="text-destructive" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">No services yet. Add your first one!</p>}
      </div>
    </div>
  );
};

export default AdminServices;
