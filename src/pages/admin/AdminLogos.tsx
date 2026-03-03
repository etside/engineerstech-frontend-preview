import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface ClientLogo {
  id: number;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  display_order: number;
  is_active: boolean;
}

const AdminLogos = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ClientLogo | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", logo_url: "", website_url: "", display_order: 0, is_active: true });

  const fetchItems = async () => {
    try {
      const data = await adminApi.getLogos();
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
    setForm({ name: "", logo_url: "", website_url: "", display_order: items.length, is_active: true });
    setShowForm(true);
  };

  const openEdit = (item: ClientLogo) => {
    setEditing(item);
    setForm({ name: item.name, logo_url: item.logo_url || "", website_url: item.website_url || "", display_order: item.display_order, is_active: item.is_active });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    const payload = { name: form.name, logo_url: form.logo_url, website_url: form.website_url, display_order: form.display_order, is_active: form.is_active };
    try {
      if (editing) {
        await adminApi.updateLogo(editing.id, payload);
        toast({ title: "Logo updated" });
      } else {
        await adminApi.createLogo(payload);
        toast({ title: "Logo created" });
      }
      setShowForm(false);
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this logo?")) return;
    try {
      await adminApi.deleteLogo(id);
      toast({ title: "Logo deleted" });
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Client Logos</h2>
        <Button onClick={openNew} size="sm" className="gradient-bg border-0"><Plus size={14} className="mr-1" /> Add Logo</Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-xl p-5 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">{editing ? "Edit Logo" : "New Logo"}</h3>
            <button onClick={() => setShowForm(false)}><X size={16} className="text-muted-foreground" /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Client Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <ImageUpload label="Logo Image" folder="logos" value={form.logo_url} onChange={(url) => setForm({ ...form, logo_url: url })} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Website URL</Label><Input value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} /></div>
            <div className="space-y-1"><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} /></div>
          </div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /><Label>Active</Label></div>
          <Button onClick={handleSave} className="gradient-bg border-0">{editing ? "Update" : "Create"}</Button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <div key={item.id} className="glass-card rounded-lg p-4 text-center">
            {item.logo_url && <img src={item.logo_url} alt={item.name} className="h-10 mx-auto mb-2 object-contain" />}
            <p className="text-xs font-medium">{item.name}</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <button onClick={() => openEdit(item)} className="p-1 rounded hover:bg-secondary"><Pencil size={12} className="text-muted-foreground" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-1 rounded hover:bg-destructive/10"><Trash2 size={12} className="text-destructive" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="col-span-full text-center text-muted-foreground text-sm py-8">No logos yet.</p>}
      </div>
    </div>
  );
};

export default AdminLogos;
