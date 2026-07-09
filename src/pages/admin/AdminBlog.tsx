import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, Eye, EyeOff, Upload } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";

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
  const [showImport, setShowImport] = useState(false);
  const [importing, setImporting] = useState(false);
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

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImporting(true);
    try {
      const result = await adminApi.importBlogPosts(file);
      toast({
        title: "Import successful",
        description: `Created ${result.created}, Updated ${result.updated}${result.errors.length > 0 ? ` (${result.errors.length} errors)` : ""}`,
      });
      setShowImport(false);
      fetchItems();
    } catch (err: any) {
      toast({ title: "Import failed", description: err.message, variant: "destructive" });
    } finally {
      setImporting(false);
      if (e.target) e.target.value = "";
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Blog Posts</h2>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowImport(!showImport)} size="sm" className="border-primary/30 hover:bg-primary/10" variant="outline">
            <Upload size={14} className="mr-1" /> Import
          </Button>
          <Button onClick={openNew} size="sm" className="gradient-bg border-0"><Plus size={14} className="mr-1" /> New Post</Button>
        </div>
      </div>

      {showImport && (
        <div className="glass-card rounded-xl p-5 mb-6 space-y-4 border border-primary/20">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Bulk Import Posts</h3>
            <button onClick={() => setShowImport(false)}><X size={16} className="text-muted-foreground" /></button>
          </div>
          <p className="text-xs text-muted-foreground">Upload a CSV or JSON file with blog posts. CSV should have headers: slug, title, meta_title, meta_description, category, excerpt, featured_image, image_alt, canonical_url, tags, content, is_published</p>
          <div className="space-y-2">
            <Label>Select File</Label>
            <input
              type="file"
              accept=".csv,.json"
              onChange={handleImportFile}
              disabled={importing}
              className="block w-full text-sm border border-border rounded-lg p-2 cursor-pointer file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
          </div>
          {importing && <p className="text-xs text-muted-foreground flex items-center gap-2"><div className="h-3 w-3 border border-primary/30 border-t-primary rounded-full animate-spin" /> Importing...</p>}
        </div>
      )}

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
          <div className="space-y-1"><Label>Content</Label><RichTextEditor value={form.content} onChange={(html) => setForm({ ...form, content: html })} /></div>
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
              {item.is_published ? <a href={`/blog/${item.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-secondary" title="View post"><Eye size={14} className="text-green-400" /></a> : <EyeOff size={14} className="text-muted-foreground" title="Unpublished" />}
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
