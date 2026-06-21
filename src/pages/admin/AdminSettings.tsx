import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Setting definitions ───

const SETTINGS_CONFIG = [
  {
    id: "company_info",
    label: "Company Info",
    fields: [
      { path: "name", label: "Company Name", type: "text" },
      { path: "tagline", label: "Tagline", type: "text" },
      { path: "description", label: "Description", type: "textarea" },
      { path: "email", label: "Email", type: "text" },
      { path: "phone", label: "Phone", type: "text" },
      { path: "whatsapp", label: "WhatsApp", type: "text" },
      { path: "address", label: "Address", type: "textarea" },
      { path: "registration", label: "Registration #", type: "text" },
      { path: "socialLinks.facebook", label: "Facebook URL", type: "text" },
      { path: "socialLinks.linkedin", label: "LinkedIn URL", type: "text" },
      { path: "socialLinks.twitter", label: "Twitter URL", type: "text" },
      { path: "socialLinks.youtube", label: "YouTube URL", type: "text" },
    ],
  },
  {
    id: "announcement",
    label: "Announcement Bar",
    fields: [
      { path: "visible", label: "Visible", type: "toggle" },
      { path: "highlight", label: "Highlight Text", type: "text" },
      { path: "text", label: "Main Text", type: "text" },
      { path: "ctaLabel", label: "CTA Label", type: "text" },
      { path: "ctaLink", label: "CTA Link", type: "text" },
    ],
  },
  {
    id: "hero_slides",
    label: "Hero Slides",
    type: "array",
    itemLabel: "Slide",
    itemFields: [
      { path: "badge", label: "Badge Text", type: "text" },
      { path: "badgeIcon", label: "Badge Icon", type: "text" },
      { path: "headline", label: "Headline", type: "text" },
      { path: "highlight", label: "Highlight", type: "text" },
      { path: "subtext", label: "Subtext", type: "textarea" },
      { path: "ctaPrimary.label", label: "Primary CTA Text", type: "text" },
      { path: "ctaPrimary.to", label: "Primary CTA Link", type: "text" },
      { path: "ctaSecondary.label", label: "Secondary CTA Text", type: "text" },
      { path: "ctaSecondary.to", label: "Secondary CTA Link", type: "text" },
    ],
    arrayFields: {
      key: "stats",
      label: "Stats",
      itemFields: [
        { path: "value", label: "Value", type: "text" },
        { path: "label", label: "Label", type: "text" },
        { path: "icon", label: "Icon", type: "text" },
      ],
    },
  },
  {
    id: "industries",
    label: "Industries",
    type: "array",
    itemLabel: "Industry",
    itemFields: [
      { path: "name", label: "Name", type: "text" },
      { path: "description", label: "Description", type: "text" },
      { path: "icon", label: "Icon", type: "text" },
      { path: "color", label: "Color", type: "color" },
      { path: "link", label: "Link", type: "text" },
    ],
  },
  {
    id: "process_steps",
    label: "Process Steps",
    type: "array",
    itemLabel: "Step",
    itemFields: [
      { path: "step", label: "Step #", type: "text" },
      { path: "icon", label: "Icon", type: "text" },
      { path: "title", label: "Title", type: "text" },
      { path: "subtitle", label: "Subtitle", type: "text" },
    ],
    arrayFields: {
      key: "points",
      label: "Points",
      itemFields: [{ path: "_value", label: "Point", type: "text" }],
    },
  },
  {
    id: "tech_stack",
    label: "Tech Stack",
    type: "array",
    itemLabel: "Category",
    itemFields: [
      { path: "category", label: "Category Name", type: "text" },
    ],
    arrayFields: {
      key: "items",
      label: "Technologies",
      itemFields: [{ path: "_value", label: "Tech", type: "text" }],
    },
  },
  {
    id: "ai_metrics",
    label: "AI Metrics",
    type: "array",
    itemLabel: "Metric",
    itemFields: [
      { path: "value", label: "Value", type: "number" },
      { path: "suffix", label: "Suffix", type: "text" },
      { path: "label", label: "Label", type: "text" },
      { path: "subtitle", label: "Subtitle", type: "text" },
      { path: "description", label: "Description", type: "text" },
      { path: "icon", label: "Icon", type: "text" },
      { path: "color", label: "Color", type: "color" },
    ],
  },
  {
    id: "delivery_stats",
    label: "Delivery Stats",
    type: "array",
    itemLabel: "Stat",
    itemFields: [
      { path: "value", label: "Value", type: "number" },
      { path: "suffix", label: "Suffix", type: "text" },
      { path: "label", label: "Label", type: "text" },
      { path: "icon", label: "Icon", type: "text" },
      { path: "prefix", label: "Prefix", type: "text" },
    ],
  },
  {
    id: "case_studies",
    label: "Case Studies",
    type: "array",
    itemLabel: "Case Study",
    itemFields: [
      { path: "id", label: "ID", type: "text" },
      { path: "title", label: "Title", type: "text" },
      { path: "industry", label: "Industry", type: "text" },
      { path: "summary", label: "Summary", type: "textarea" },
      { path: "color", label: "Color", type: "color" },
    ],
    arrayFields: {
      key: "tags",
      label: "Tags",
      itemFields: [{ path: "_value", label: "Tag", type: "text" }],
    },
    arrayFields2: {
      key: "metrics",
      label: "Metrics",
      itemFields: [
        { path: "label", label: "Label", type: "text" },
        { path: "value", label: "Value", type: "text" },
      ],
    },
  },
  {
    id: "footer_services",
    label: "Footer Services",
    type: "array",
    itemLabel: "Service",
    itemFields: [
      { path: "label", label: "Label", type: "text" },
      { path: "to", label: "Link", type: "text" },
    ],
  },
  {
    id: "footer_quick_links",
    label: "Footer Quick Links",
    type: "array",
    itemLabel: "Link",
    itemFields: [
      { path: "label", label: "Label", type: "text" },
      { path: "to", label: "Link", type: "text" },
    ],
  },
];

// ─── Helper functions ───

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : ""), obj);
}

function setNestedValue(obj: any, path: string, value: any): any {
  const keys = path.split(".");
  const result = { ...obj };
  let current = result;
  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...(current[keys[i]] || {}) };
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
  return result;
}

// ─── Components ───

const FieldInput = ({
  field,
  value,
  onChange,
}: {
  field: { path: string; label: string; type: string };
  value: any;
  onChange: (val: any) => void;
}) => {
  if (field.type === "toggle") {
    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={cn(
            "w-10 h-5 rounded-full transition-colors relative",
            value ? "bg-primary" : "bg-muted"
          )}
        >
          <div
            className={cn(
              "w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform",
              value ? "translate-x-5" : "translate-x-0.5"
            )}
          />
        </button>
        <span className="text-xs text-muted-foreground">{value ? "Visible" : "Hidden"}</span>
      </div>
    );
  }

  if (field.type === "textarea") {
    return <Textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={3} />;
  }

  if (field.type === "color") {
    return (
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer"
        />
        <Input value={value || ""} onChange={(e) => onChange(e.target.value)} className="flex-1" />
      </div>
    );
  }

  return (
    <Input
      type={field.type === "number" ? "number" : "text"}
      value={value ?? ""}
      onChange={(e) => onChange(field.type === "number" ? Number(e.target.value) : e.target.value)}
    />
  );
};

const SimpleObjectEditor = ({
  config,
  value,
  onChange,
}: {
  config: (typeof SETTINGS_CONFIG)[number];
  value: any;
  onChange: (val: any) => void;
}) => (
  <div className="space-y-4">
    {config.fields!.map((field) => (
      <div key={field.path} className="space-y-1">
        <Label className="text-xs">{field.label}</Label>
        <FieldInput
          field={field}
          value={getNestedValue(value, field.path)}
          onChange={(val) => onChange(setNestedValue(value, field.path, val))}
        />
      </div>
    ))}
  </div>
);

const ArrayEditor = ({
  config,
  value,
  onChange,
}: {
  config: (typeof SETTINGS_CONFIG)[number];
  value: any[];
  onChange: (val: any[]) => void;
}) => {
  const [expanded, setExpanded] = useState<number | null>(0);

  const addItem = () => {
    const newItem: any = {};
    config.itemFields!.forEach((f) => {
      if (f.type === "number") newItem[f.path] = 0;
      else if (f.type === "toggle") newItem[f.path] = true;
      else newItem[f.path] = "";
    });
    if (config.arrayFields) {
      newItem[config.arrayFields.key] = [];
    }
    if (config.arrayFields2) {
      newItem[config.arrayFields2.key] = [];
    }
    onChange([...(value || []), newItem]);
    setExpanded((value || []).length);
  };

  const removeItem = (index: number) => {
    const next = [...value];
    next.splice(index, 1);
    onChange(next);
    if (expanded === index) setExpanded(null);
    else if (expanded !== null && expanded > index) setExpanded(expanded - 1);
  };

  const updateItem = (index: number, field: string, val: any) => {
    const next = [...value];
    next[index] = setNestedValue(next[index], field, val);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {(value || []).map((item: any, index: number) => (
        <div key={index} className="glass-card rounded-lg border border-border/30 overflow-hidden">
          {/* Header */}
          <button
            type="button"
            onClick={() => setExpanded(expanded === index ? null : index)}
            className="w-full flex items-center justify-between p-3 hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-2">
              {expanded === index ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              <span className="text-sm font-medium">
                {config.itemLabel} {index + 1}
                {item.title && ` — ${item.title}`}
                {item.name && ` — ${item.name}`}
                {item.label && ` — ${item.label}`}
                {item.badge && ` — ${item.badge}`}
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeItem(index); }}
              className="p-1 text-destructive hover:bg-destructive/10 rounded"
            >
              <Trash2 size={14} />
            </button>
          </button>

          {/* Fields */}
          {expanded === index && (
            <div className="p-4 pt-0 space-y-3 border-t border-border/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                {config.itemFields!.map((field) => (
                  <div key={field.path} className="space-y-1">
                    <Label className="text-xs">{field.label}</Label>
                    <FieldInput
                      field={field}
                      value={getNestedValue(item, field.path)}
                      onChange={(val) => updateItem(index, field.path, val)}
                    />
                  </div>
                ))}
              </div>

              {/* Nested array (e.g., stats, points, tags) */}
              {config.arrayFields && (
                <NestedArrayEditor
                  config={config.arrayFields}
                  items={item[config.arrayFields.key] || []}
                  onChange={(val) => updateItem(index, config.arrayFields!.key, val)}
                />
              )}

              {/* Second nested array (e.g., case_studies metrics) */}
              {config.arrayFields2 && (
                <NestedArrayEditor
                  config={config.arrayFields2}
                  items={item[config.arrayFields2.key] || []}
                  onChange={(val) => updateItem(index, config.arrayFields2!.key, val)}
                />
              )}
            </div>
          )}
        </div>
      ))}

      <Button type="button" variant="outline" size="sm" onClick={addItem} className="w-full">
        <Plus size={14} className="mr-1" /> Add {config.itemLabel}
      </Button>
    </div>
  );
};

const NestedArrayEditor = ({
  config,
  items,
  onChange,
}: {
  config: { key: string; label: string; itemFields: { path: string; label: string; type: string }[] };
  items: any[];
  onChange: (val: any[]) => void;
}) => {
  const isSimple = config.itemFields.length === 1 && config.itemFields[0].path === "_value";

  const addItem = () => {
    if (isSimple) {
      onChange([...items, ""]);
    } else {
      const newItem: any = {};
      config.itemFields.forEach((f) => { newItem[f.path] = ""; });
      onChange([...items, newItem]);
    }
  };

  const updateItem = (index: number, val: any) => {
    const next = [...items];
    next[index] = val;
    onChange(next);
  };

  const removeItem = (index: number) => {
    const next = [...items];
    next.splice(index, 1);
    onChange(next);
  };

  return (
    <div className="space-y-2 pl-4 border-l-2 border-primary/10">
      <Label className="text-xs text-muted-foreground">{config.label}</Label>
      {items.map((item: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          {isSimple ? (
            <Input
              value={item || ""}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 h-8 text-xs"
            />
          ) : (
            <div className="flex-1 flex gap-2">
              {config.itemFields.map((field) => (
                <Input
                  key={field.path}
                  value={getNestedValue(item, field.path) || ""}
                  onChange={(e) => updateItem(index, setNestedValue(item, field.path, e.target.value))}
                  placeholder={field.label}
                  className="flex-1 h-8 text-xs"
                />
              ))}
            </div>
          )}
          <button type="button" onClick={() => removeItem(index)} className="p-1 text-destructive hover:bg-destructive/10 rounded">
            <Trash2 size={12} />
          </button>
        </div>
      ))}
      <Button type="button" variant="ghost" size="sm" onClick={addItem} className="text-xs h-7">
        <Plus size={12} className="mr-1" /> Add
      </Button>
    </div>
  );
};

// ─── Main Component ───

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState(SETTINGS_CONFIG[0].id);

  useEffect(() => {
    adminApi
      .getSettings()
      .then((data) => {
        setSettings(data || {});
      })
      .catch((err: any) => {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminApi.updateSettings(settings);
      toast({ title: "Settings saved!", description: "Refresh the homepage to see changes." });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const activeConfig = SETTINGS_CONFIG.find((c) => c.id === activeTab)!;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Site Settings</h2>
        <Button onClick={handleSave} size="sm" className="gradient-bg border-0" disabled={saving}>
          <Save size={14} className="mr-1" /> {saving ? "Saving..." : "Save All"}
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-48 shrink-0 space-y-1">
          {SETTINGS_CONFIG.map((config) => (
            <button
              key={config.id}
              onClick={() => setActiveTab(config.id)}
              className={cn(
                "w-full text-left text-sm px-3 py-2 rounded-lg transition-colors",
                activeTab === config.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
              )}
            >
              {config.label}
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 glass-card rounded-xl p-5 min-h-[400px]">
          <h3 className="text-sm font-semibold mb-4">{activeConfig.label}</h3>

          {activeConfig.type === "array" ? (
            <ArrayEditor
              config={activeConfig}
              value={settings[activeConfig.id] || []}
              onChange={(val) => updateSetting(activeConfig.id, val)}
            />
          ) : (
            <SimpleObjectEditor
              config={activeConfig}
              value={settings[activeConfig.id] || {}}
              onChange={(val) => updateSetting(activeConfig.id, val)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
