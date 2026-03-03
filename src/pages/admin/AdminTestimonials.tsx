import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface Testimonial {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  photo_url: string | null;
  rating: number | null;
  is_active: boolean;
  display_order: number;
}

const AdminTestimonials = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", company: "", quote: "", photo_url: "", rating: 5, is_active: true, display_order: 0 });

  const fetchItems = async () => {
    try {
      const data = await adminApi.getTestimonials();
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
    setForm({ name: "", role: "", company: "", quote: "", photo_url: "", rating: 5, is_active: true, display_order: items.length });
    setShowForm(true);
  };

  const openEdit = (item: Testimonial) => {
    setEditing(item);
    setForm({ name: item.name, role: item.role || "", company: item.company || "", quote: item.quote, photo_url: item.photo_url || "", rating: item.rating ?? 5, is_active: item.is_active, display_order: item.display_order });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.quote.trim()) return;
    const payload = { name: form.name, role: form.role, company: form.company, quote: form.quote, photo_url: form.photo_url, rating: form.rating, is_active: form.is_active, display_order: form.display_order };
    try {
      if (editing) {
        await adminApi.updateTestimonial(editing.id, payload);
        toast({ title: "Testimonial updated" });
      } else {
        await adminApi.createTestimonial(payload);
        toast({ title: "Testimonial created" });
      }
      setShowForm(false);
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await adminApi.deleteTestimonial(id);
      toast({ title: "Testimonial deleted" });
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Testimonials</h2>
        <Button onClick={openNew} size="sm" className="gradient-bg border-0"><Plus size={14} className="mr-1" /> Add Testimonial</Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-xl p-5 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">{editing ? "Edit Testimonial" : "New Testimonial"}</h3>
            <button onClick={() => setShowForm(false)}><X size={16} className="text-muted-foreground" /></button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-1"><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="space-y-1"><Label>Role</Label><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
            <div className="space-y-1"><Label>Company</Label><Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
          </div>
          <div className="space-y-1"><Label>Quote</Label><Textarea value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} rows={3} /></div>
          <div className="grid sm:grid-cols-3 gap-4">
            <ImageUpload label="Photo" folder="testimonials" value={form.photo_url} onChange={(url) => setForm({ ...form, photo_url: url })} />
            <div className="space-y-1"><Label>Rating (1-5)</Label><Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) || 5 })} /></div>
            <div className="space-y-1"><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} /></div>
          </div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /><Label>Active</Label></div>
          <Button onClick={handleSave} className="gradient-bg border-0">{editing ? "Update" : "Create"}</Button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role}{item.company ? ` · ${item.company}` : ""}</p>
                <p className="text-xs text-muted-foreground mt-2 italic">"{item.quote.slice(0, 100)}..."</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-secondary"><Pencil size={14} className="text-muted-foreground" /></button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-destructive/10"><Trash2 size={14} className="text-destructive" /></button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">No testimonials yet.</p>}
      </div>
    </div>
  );
};

export default AdminTestimonials;
