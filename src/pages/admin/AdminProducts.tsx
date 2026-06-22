import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import GalleryUpload from "@/components/admin/GalleryUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import IconPicker from "@/components/admin/IconPicker";
import { upsertNavLink, removeNavLink, isInNav } from "@/lib/navSync";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  category: string | null;
  icon: string | null;
  image_url: string | null;
  gallery: string[] | null;
  price: string | null;
  features: string[] | null;
  external_url: string | null;
  show_demo_request: boolean;
  demo_credentials: string | null;
  display_order: number;
  is_active: boolean;
}

const emptyForm = {
  name: "", slug: "", description: "", long_description: "", category: "",
  icon: "", image_url: "", gallery: [] as string[], price: "", features: "",
  external_url: "", show_demo_request: true, demo_credentials: "", display_order: 0, is_active: true,
  add_to_menu: false,
};

const AdminProducts = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

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
    setForm({ ...emptyForm, display_order: items.length });
    setShowForm(true);
  };

  const openEdit = (item: Product) => {
    setEditing(item);
    setForm({
      name: item.name,
      slug: item.slug || "",
      description: item.description || "",
      long_description: item.long_description || "",
      category: item.category || "",
      icon: item.icon || "",
      image_url: item.image_url || "",
      gallery: item.gallery || [],
      price: item.price || "",
      features: (item.features || []).join("\n"),
      external_url: item.external_url || "",
      show_demo_request: item.show_demo_request ?? true,
      demo_credentials: item.demo_credentials || "",
      display_order: item.display_order,
      is_active: item.is_active,
      add_to_menu: false,
    });
    setShowForm(true);
    if (item.slug) {
      isInNav("Products", `/products/${item.slug}`).then((inNav) =>
        setForm((f) => ({ ...f, add_to_menu: inNav }))
      );
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      long_description: form.long_description,
      category: form.category,
      icon: form.icon,
      image_url: form.image_url,
      gallery: form.gallery,
      price: form.price,
      features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
      external_url: form.external_url,
      show_demo_request: form.show_demo_request,
      demo_credentials: form.demo_credentials,
      display_order: form.display_order,
      is_active: form.is_active,
    };
    try {
      let saved: Product;
      if (editing) {
        saved = await adminApi.updateProduct(editing.id, payload);
        toast({ title: "Product updated" });
      } else {
        saved = await adminApi.createProduct(payload);
        toast({ title: "Product created" });
      }

      const previousTo = editing?.slug ? `/products/${editing.slug}` : undefined;
      const navTo = `/products/${saved.slug}`;
      try {
        if (form.add_to_menu) {
          await upsertNavLink(
            "Products",
            "Our Products",
            { label: form.name, to: navTo, description: form.description || undefined, icon: form.icon || undefined },
            previousTo
          );
        } else if (previousTo) {
          await removeNavLink("Products", previousTo);
        }
      } catch {}

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
            <div className="space-y-1"><Label>Slug (auto if blank)</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="e.g. glowup" /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Enterprise" /></div>
            <div className="space-y-1"><Label>Price</Label><Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. Starting $999" /></div>
          </div>
          <div className="space-y-1"><Label>Short Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} /></div>
          <div className="space-y-1"><Label>Features (one per line)</Label><Textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={4} /></div>

          <div className="grid sm:grid-cols-2 gap-4">
            <ImageUpload label="Cover Image" folder="products" value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} />
            <div className="space-y-1"><Label>Icon</Label><IconPicker value={form.icon} onChange={(icon) => setForm({ ...form, icon })} /></div>
          </div>

          <GalleryUpload label="Gallery (multiple images)" folder="products" value={form.gallery} onChange={(gallery) => setForm({ ...form, gallery })} />

          <div className="space-y-1">
            <Label>Detailed Description (rich text, shown on product page)</Label>
            <RichTextEditor value={form.long_description} onChange={(html) => setForm({ ...form, long_description: html })} />
          </div>

          <div className="space-y-1">
            <Label>Demo Link & Credentials (optional, shown on product page)</Label>
            <Textarea
              value={form.demo_credentials}
              onChange={(e) => setForm({ ...form, demo_credentials: e.target.value })}
              rows={3}
              placeholder={"Demo URL: https://demo.example.com\nUsername: demo@example.com\nPassword: demo1234"}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>External URL</Label><Input value={form.external_url} onChange={(e) => setForm({ ...form, external_url: e.target.value })} /></div>
            <div className="space-y-1"><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} /></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /><Label>Active</Label></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={form.show_demo_request} onChange={(e) => setForm({ ...form, show_demo_request: e.target.checked })} /><Label>Show "Request Demo" button</Label></div>
          </div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={form.add_to_menu} onChange={(e) => setForm({ ...form, add_to_menu: e.target.checked })} /><Label>Add to Products mega menu (optional)</Label></div>
          <Button onClick={handleSave} className="gradient-bg border-0">{editing ? "Update" : "Create"}</Button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{item.name} <span className="text-xs text-muted-foreground">/{item.slug}</span></p>
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
