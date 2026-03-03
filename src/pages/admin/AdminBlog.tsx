import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image: string | null;
  category: string | null;
  is_published: boolean;
  published_at: string | null;
}

const AdminBlog = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", cover_image: "", category: "", is_published: false });

  const fetchItems = async () => {
    try {
      const data = await adminApi.getBlog();
      setItems(data || []);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const openNew = () => {
    setEditing(null);
    setForm({ title: "", slug: "", excerpt: "", content: "", cover_image: "", category: "", is_published: false });
    setShowForm(true);
  };

  const openEdit = (item: BlogPost) => {
    setEditing(item);
    setForm({ title: item.title, slug: item.slug, excerpt: item.excerpt || "", content: item.content || "", cover_image: item.cover_image || "", category: item.category || "", is_published: item.is_published });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim()) return;
    const payload = {
      title: form.title, slug: form.slug, excerpt: form.excerpt, content: form.content,
      cover_image: form.cover_image, category: form.category, is_published: form.is_published,
      published_at: form.is_published ? new Date().toISOString() : null,
    };
    try {
      if (editing) {
        await adminApi.updatePost(editing.id, payload);
        toast({ title: "Post updated" });
      } else {
        await adminApi.createPost(payload);
        toast({ title: "Post created" });
      }
      setShowForm(false);
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this post?")) return;
    try {
      await adminApi.deletePost(id);
      toast({ title: "Post deleted" });
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Blog Posts</h2>
        <Button onClick={openNew} size="sm" className="gradient-bg border-0"><Plus size={14} className="mr-1" /> New Post</Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-xl p-5 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">{editing ? "Edit Post" : "New Post"}</h3>
            <button onClick={() => setShowForm(false)}><X size={16} className="text-muted-foreground" /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => {
                const title = e.target.value;
                setForm({ ...form, title, slug: editing ? form.slug : slugify(title) });
              }} />
            </div>
            <div className="space-y-1"><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
            <ImageUpload label="Cover Image" folder="blog" value={form.cover_image} onChange={(url) => setForm({ ...form, cover_image: url })} />
          </div>
          <div className="space-y-1"><Label>Excerpt</Label><Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} /></div>
          <div className="space-y-1"><Label>Content</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} /></div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} /><Label>Published</Label></div>
          <Button onClick={handleSave} className="gradient-bg border-0">{editing ? "Update" : "Create"}</Button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.category} · {item.slug}</p>
            </div>
            <div className="flex items-center gap-2">
              {item.is_published ? <Eye size={14} className="text-green-400" /> : <EyeOff size={14} className="text-muted-foreground" />}
              <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-secondary"><Pencil size={14} className="text-muted-foreground" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-destructive/10"><Trash2 size={14} className="text-destructive" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">No posts yet.</p>}
      </div>
    </div>
  );
};

export default AdminBlog;
