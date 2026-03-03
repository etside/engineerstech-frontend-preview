import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const settingKeys = [
  { key: "hero_headline", label: "Hero Headline", type: "text" },
  { key: "hero_subtext", label: "Hero Subtext", type: "textarea" },
  { key: "hero_cta_text", label: "Hero CTA Text", type: "text" },
  { key: "hero_cta_link", label: "Hero CTA Link", type: "text" },
  { key: "company_email", label: "Company Email", type: "text" },
  { key: "company_phone", label: "Company Phone", type: "text" },
  { key: "company_phone_alt", label: "Alternative Phone", type: "text" },
  { key: "company_address", label: "Company Address", type: "text" },
  { key: "registration_number", label: "Registration Number", type: "text" },
  { key: "about_mission", label: "Mission Statement", type: "textarea" },
  { key: "about_vision", label: "Vision Statement", type: "textarea" },
];

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await adminApi.getSettings();
        const map: Record<string, string> = {};
        Object.entries(data || {}).forEach(([key, value]) => {
          map[key] = typeof value === "string" ? value : JSON.stringify(value);
        });
        setSettings(map);
      } catch (err: any) {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: Record<string, string> = {};
      for (const { key } of settingKeys) {
        payload[key] = settings[key] || "";
      }
      await adminApi.updateSettings(payload);
      toast({ title: "Settings saved" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Site Settings</h2>
        <Button onClick={handleSave} size="sm" className="gradient-bg border-0" disabled={saving}>
          <Save size={14} className="mr-1" /> {saving ? "Saving..." : "Save All"}
        </Button>
      </div>

      <div className="glass-card rounded-xl p-5 space-y-5">
        {settingKeys.map(({ key, label, type }) => (
          <div key={key} className="space-y-1">
            <Label>{label}</Label>
            {type === "textarea" ? (
              <Textarea value={settings[key] || ""} onChange={(e) => setSettings({ ...settings, [key]: e.target.value })} rows={3} />
            ) : (
              <Input value={settings[key] || ""} onChange={(e) => setSettings({ ...settings, [key]: e.target.value })} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSettings;
