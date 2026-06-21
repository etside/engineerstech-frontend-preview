import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X, ExternalLink } from "lucide-react";
import IconPicker from "@/components/admin/IconPicker";
import RichTextEditor from "@/components/admin/RichTextEditor";

interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  industry: string;
  client: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  tech_stack: string[];
  cover_image: string;
  color: string;
  duration: string;
  display_order: number;
  is_published: boolean;
}

const emptyForm = {
  title: "", slug: "", industry: "", client: "", summary: "",
  challenge: "", solution: "", results: "", tags: "",
  metrics: "", tech_stack: "", cover_image: "", color: "#6366F1",
  duration: "", display_order: 0, is_published: false,
};

const AdminCaseStudies = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const fetchItems = async () => {
    try {
      const data = await adminApi.getCaseStudies();
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

  const openEdit = (item: CaseStudy) => {
    setEditing(item);
    setForm({
      title: item.title || "", slug: item.slug || "", industry: item.industry || "",
      client: item.client || "", summary: item.summary || "", challenge: item.challenge || "",
      solution: item.solution || "", results: item.results || "",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : (item.tags || ""),
      metrics: Array.isArray(item.metrics) ? JSON.stringify(item.metrics) : (item.metrics || ""),
      tech_stack: Array.isArray(item.tech_stack) ? item.tech_stack.join(", ") : (item.tech_stack || ""),
      cover_image: item.cover_image || "", color: item.color || "#6366F1",
      duration: item.duration || "", display_order: item.display_order || 0,
      is_published: item.is_published || false,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      tech_stack: form.tech_stack ? form.tech_stack.split(",").map((t) => t.trim()).filter(Boolean) : [],
      metrics: form.metrics ? JSON.parse(form.metrics) : [],
      display_order: Number(form.display_order),
    };
    try {
      if (editing) {
        await adminApi.updateCaseStudy(editing.id, payload);
        toast({ title: "Case study updated" });
      } else {
        await adminApi.createCaseStudy(payload);
        toast({ title: "Case study created" });
      }
      setShowForm(false);
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this case study?")) return;
    try {
      await adminApi.deleteCaseStudy(id);
      toast({ title: "Case study deleted" });
      fetchItems();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Case Studies</h2>
        <Button onClick={openNew} size="sm" className="gradient-bg border-0">
          <Plus size={14} className="mr-1" /> Add Case Study
        </Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-xl p-5 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">{editing ? "Edit Case Study" : "New Case Study"}</h3>
            <button onClick={() => setShowForm(false)}><X size={16} className="text-muted-foreground" /></button>
          </div>

          {/* Basic info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div className="space-y-1"><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated if empty" /></div>
            <div className="space-y-1"><Label>Industry</Label><Input value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} /></div>
            <div className="space-y-1"><Label>Client</Label><Input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} /></div>
            <div className="space-y-1"><Label>Duration</Label><Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 12 weeks" /></div>
            <div className="space-y-1"><Label>Color</Label><div className="flex gap-2"><input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-8 h-8 rounded" /><Input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} /></div></div>
          </div>

          <div className="space-y-1"><Label>Summary</Label><Textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} rows={2} /></div>
          <div className="space-y-1"><Label>Challenge</Label><RichTextEditor value={form.challenge} onChange={(val) => setForm({ ...form, challenge: val })} /></div>
          <div className="space-y-1"><Label>Solution</Label><RichTextEditor value={form.solution} onChange={(val) => setForm({ ...form, solution: val })} /></div>
          <div className="space-y-1"><Label>Results</Label><RichTextEditor value={form.results} onChange={(val) => setForm({ ...form, results: val })} /></div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Tags (comma separated)</Label><Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="React, Node.js, AWS" /></div>
            <div className="space-y-1"><Label>Tech Stack (comma separated)</Label><Input value={form.tech_stack} onChange={(e) => setForm({ ...form, tech_stack: e.target.value })} placeholder="React, PostgreSQL, AWS" /></div>
          </div>

          <div className="space-y-1">
            <Label>Metrics (JSON)</Label>
            <Textarea
              value={form.metrics}
              onChange={(e) => setForm({ ...form, metrics: e.target.value })}
              rows={2}
              placeholder='[{"label":"Uptime","value":"99.9%"}]'
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-1"><Label>Cover Image URL</Label><Input value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} /></div>
            <div className="space-y-1"><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} /></div>
            <div className="flex items-center gap-2 pt-6"><input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} /><Label>Published</Label></div>
          </div>

          <Button onClick={handleSave} className="gradient-bg border-0">{editing ? "Update" : "Create"}</Button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-8 rounded-full" style={{ backgroundColor: item.color || "#6366F1" }} />
              <div>
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.industry} {item.client && `· ${item.client}`} {item.duration && `· ${item.duration}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.is_published ? "bg-green-500/10 text-green-400" : "bg-muted text-muted-foreground"}`}>
                {item.is_published ? "Published" : "Draft"}
              </span>
              {item.is_published && (
                <a href={`/case-studies/${item.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-secondary">
                  <ExternalLink size={14} className="text-muted-foreground" />
                </a>
              )}
              <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-secondary"><Pencil size={14} className="text-muted-foreground" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-destructive/10"><Trash2 size={14} className="text-destructive" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">No case studies yet.</p>}
      </div>
    </div>
  );
};

export default AdminCaseStudies;
