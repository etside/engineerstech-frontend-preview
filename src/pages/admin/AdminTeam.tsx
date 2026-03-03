import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  designation: string | null;
  bio: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
  whatsapp_number: string | null;
  display_order: number;
  is_active: boolean;
}

const AdminTeam = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", designation: "", bio: "", photo_url: "", linkedin_url: "", whatsapp_number: "", display_order: 0, is_active: true });

  const fetchItems = async () => {
    const { data } = await supabase.from("team_members").select("*").order("display_order");
    setItems((data as TeamMember[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", designation: "", bio: "", photo_url: "", linkedin_url: "", whatsapp_number: "", display_order: items.length, is_active: true });
    setShowForm(true);
  };

  const openEdit = (item: TeamMember) => {
    setEditing(item);
    setForm({ name: item.name, designation: item.designation || "", bio: item.bio || "", photo_url: item.photo_url || "", linkedin_url: item.linkedin_url || "", whatsapp_number: item.whatsapp_number || "", display_order: item.display_order, is_active: item.is_active });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    const payload = { name: form.name, designation: form.designation, bio: form.bio, photo_url: form.photo_url, linkedin_url: form.linkedin_url, whatsapp_number: form.whatsapp_number, display_order: form.display_order, is_active: form.is_active };
    if (editing) {
      const { error } = await supabase.from("team_members").update(payload).eq("id", editing.id);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Member updated" });
    } else {
      const { error } = await supabase.from("team_members").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Member created" });
    }
    setShowForm(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this member?")) return;
    await supabase.from("team_members").delete().eq("id", id);
    toast({ title: "Member deleted" });
    fetchItems();
  };

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Team Members</h2>
        <Button onClick={openNew} size="sm" className="gradient-bg border-0"><Plus size={14} className="mr-1" /> Add Member</Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-xl p-5 mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">{editing ? "Edit Member" : "New Member"}</h3>
            <button onClick={() => setShowForm(false)}><X size={16} className="text-muted-foreground" /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="space-y-1"><Label>Designation</Label><Input value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} /></div>
          </div>
          <div className="space-y-1"><Label>Bio</Label><Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Photo URL</Label><Input value={form.photo_url} onChange={(e) => setForm({ ...form, photo_url: e.target.value })} /></div>
            <div className="space-y-1"><Label>LinkedIn URL</Label><Input value={form.linkedin_url} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} /></div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1"><Label>WhatsApp Number</Label><Input value={form.whatsapp_number} onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })} /></div>
            <div className="space-y-1"><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} /></div>
          </div>
          <div className="flex items-center gap-2"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /><Label>Active</Label></div>
          <Button onClick={handleSave} className="gradient-bg border-0">{editing ? "Update" : "Create"}</Button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                {item.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.designation}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-secondary"><Pencil size={14} className="text-muted-foreground" /></button>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-destructive/10"><Trash2 size={14} className="text-destructive" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">No team members yet.</p>}
      </div>
    </div>
  );
};

export default AdminTeam;
