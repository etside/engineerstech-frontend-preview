import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface Submission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

const AdminSubmissions = () => {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);

  const fetchItems = async () => {
    try {
      const data = await adminApi.getSubmissions();
      setItems(data || []);
    } catch {
      // silently ignore fetch errors on initial load
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const markRead = async (item: Submission) => {
    setSelected(item);
    if (!item.is_read) {
      try {
        await adminApi.markSubmissionRead(item.id);
        setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, is_read: true } : i));
      } catch {
        // silently ignore mark-read errors
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this submission?")) return;
    try {
      await adminApi.deleteSubmission(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch {
      // silently ignore delete errors
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div>
      <h2 className="text-lg font-bold mb-6">Contact Submissions</h2>
      <div className="grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => markRead(item)}
              className={`w-full text-left glass-card rounded-lg p-3 transition-colors ${selected?.id === item.id ? "border-primary/50" : ""} ${!item.is_read ? "border-l-2 border-l-primary" : ""}`}
            >
              <div className="flex items-center gap-2">
                {item.is_read ? <MailOpen size={14} className="text-muted-foreground shrink-0" /> : <Mail size={14} className="text-primary shrink-0" />}
                <p className={`text-sm truncate ${!item.is_read ? "font-semibold" : ""}`}>{item.name}</p>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-1">{item.subject || item.message.slice(0, 50)}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{format(new Date(item.created_at), "MMM d, yyyy · h:mm a")}</p>
            </button>
          ))}
          {items.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">No submissions yet.</p>}
        </div>

        <div className="lg:col-span-3">
          {selected ? (
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{selected.name}</h3>
                  <p className="text-xs text-muted-foreground">{selected.email}{selected.phone ? ` · ${selected.phone}` : ""}</p>
                </div>
                <button onClick={() => handleDelete(selected.id)} className="p-1.5 rounded-lg hover:bg-destructive/10"><Trash2 size={14} className="text-destructive" /></button>
              </div>
              {selected.subject && <p className="text-sm font-medium mb-3">{selected.subject}</p>}
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              <p className="text-[10px] text-muted-foreground mt-4">{format(new Date(selected.created_at), "MMMM d, yyyy 'at' h:mm a")}</p>
            </div>
          ) : (
            <div className="glass-card rounded-xl p-8 text-center text-muted-foreground text-sm">
              Select a message to view
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSubmissions;
