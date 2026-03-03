import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
  external_url: string | null;
  display_order: number;
  is_active: boolean;
}

const AdminProducts = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", icon: "", external_url: "", display_order: 0, is_active: true });

  const fetchItems = async () => {
    try {
      const data = await adminApi.getProducts();
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
    setForm({ name: "", description: "", icon: "", external_url: "", display_order: items.length, is_active: true });
    setShowForm(true);
  };

  const openEdit = (item: Product) => {
    setEditing(item);
    setForm({ name: item.name, description: item.description || "", icon: item.icon || "", external_url: item.external_url || "", display_order: item.display_order, is_active: item.is_active });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    const payload = { name: form.name, description: form.description, icon: form.icon, external_url: form.external_url, display_order: form.display_order, is_active: form.is_active };
    try {
      if (editing) {
        await adminApi.updateProduct(editing.id, payload);
        toast({ title: "Product updated" });
      } else {
        await adminApi.createProduct(payload);
        toast({ title: "Product created" });
      }
      setShowForm(false);
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    try {
      await adminApi.deleteProduct(id);
      toast({ title: "Product deleted" });
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Products</h2>
        <Button onClick={openNew} size="sm" className="gradient-bg border-0"><Plus size={14} className="mr-1" /> Add Product</Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-xl p-5 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">{editing ? "Edit Product" : "New Product"}</h3>
            <button onClick={() => setShowForm(false)}><X size={16} className="text-muted-foreground" /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="space-y-1"><Label>Icon</Label><Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="e.g. ShoppingCart" /></div>
          </div>
          <div className="space-y-1"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>External URL</Label><Input value={form.external_url} onChange={(e) => setForm({ ...form, external_url: e.target.value })} /></div>
            <div className="space-y-1"><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} /></div>
          </div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /><Label>Active</Label></div>
          <Button onClick={handleSave} className="gradient-bg border-0">{editing ? "Update" : "Create"}</Button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{item.name}</p>
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
        {items.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">No products yet.</p>}
      </div>
    </div>
  );
};

export default AdminProducts;
