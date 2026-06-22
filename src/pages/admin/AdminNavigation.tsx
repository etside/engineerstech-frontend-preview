import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { defaultNavigation, serializeNavigation } from "@/data/navigation";
import {
  Save, Plus, Trash2, ChevronDown, ChevronRight, GripVertical,
  FolderOpen, Folder, Link2, ArrowUp, ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import IconPicker from "@/components/admin/IconPicker";

interface NavSubItem {
  label: string;
  to: string;
  description?: string;
  icon?: string;
}

interface NavMegaGroup {
  title: string;
  items: NavSubItem[];
}

interface NavItem {
  label: string;
  to?: string;
  megaMenu?: NavMegaGroup[];
}

// ─── Sub-item editor ───

const SubItemEditor = ({
  item,
  onChange,
  onRemove,
}: {
  item: NavSubItem;
  onChange: (val: NavSubItem) => void;
  onRemove: () => void;
}) => (
  <div className="flex items-start gap-2 p-3 rounded-lg bg-white/[0.02] border border-border/20">
    <div className="flex-1 grid grid-cols-2 gap-2">
      <div className="space-y-1">
        <Label className="text-[10px]">Label</Label>
        <Input
          value={item.label}
          onChange={(e) => onChange({ ...item, label: e.target.value })}
          className="h-8 text-xs"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-[10px]">Link</Label>
        <Input
          value={item.to}
          onChange={(e) => onChange({ ...item, to: e.target.value })}
          className="h-8 text-xs"
          placeholder="/path or #"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-[10px]">Description</Label>
        <Input
          value={item.description || ""}
          onChange={(e) => onChange({ ...item, description: e.target.value })}
          className="h-8 text-xs"
          placeholder="Optional short description"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-[10px]">Icon</Label>
        <IconPicker
          value={item.icon || ""}
          onChange={(iconName) => onChange({ ...item, icon: iconName })}
        />
      </div>
    </div>
    <button
      type="button"
      onClick={onRemove}
      className="p-1.5 mt-5 text-destructive hover:bg-destructive/10 rounded"
    >
      <Trash2 size={14} />
    </button>
  </div>
);

// ─── Group editor ───

const GroupEditor = ({
  group,
  onChange,
  onRemove,
}: {
  group: NavMegaGroup;
  onChange: (val: NavMegaGroup) => void;
  onRemove: () => void;
}) => {
  const [expanded, setExpanded] = useState(true);

  const updateItem = (index: number, val: NavSubItem) => {
    const next = [...group.items];
    next[index] = val;
    onChange({ ...group, items: next });
  };

  const removeItem = (index: number) => {
    const next = [...group.items];
    next.splice(index, 1);
    onChange({ ...group, items: next });
  };

  const addItem = () => {
    onChange({
      ...group,
      items: [...group.items, { label: "", to: "#", description: "", icon: "" }],
    });
  };

  return (
    <div className="border border-border/30 rounded-lg overflow-hidden">
      {/* Group header */}
      <div className="flex items-center gap-2 p-3 bg-white/[0.02] border-b border-border/20">
        <button type="button" onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        <Folder size={14} className="text-primary" />
        <Input
          value={group.title}
          onChange={(e) => onChange({ ...group, title: e.target.value })}
          className="h-7 text-xs flex-1 bg-transparent border-0 font-medium"
          placeholder="Group title"
        />
        <span className="text-[10px] text-muted-foreground">{group.items.length} items</span>
        <button type="button" onClick={onRemove} className="p-1 text-destructive hover:bg-destructive/10 rounded">
          <Trash2 size={13} />
        </button>
      </div>

      {/* Items */}
      {expanded && (
        <div className="p-3 space-y-2">
          {group.items.map((item, index) => (
            <SubItemEditor
              key={index}
              item={item}
              onChange={(val) => updateItem(index, val)}
              onRemove={() => removeItem(index)}
            />
          ))}
          <Button type="button" variant="ghost" size="sm" onClick={addItem} className="text-xs h-7 w-full">
            <Plus size={12} className="mr-1" /> Add Sub-item
          </Button>
        </div>
      )}
    </div>
  );
};

// ─── Nav item editor ───

const NavItemEditor = ({
  item,
  index,
  total,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  item: NavItem;
  index: number;
  total: number;
  onChange: (val: NavItem) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) => {
  const [expanded, setExpanded] = useState(true);
  const hasMegaMenu = !!item.megaMenu;

  const updateGroup = (groupIndex: number, val: NavMegaGroup) => {
    const next = [...(item.megaMenu || [])];
    next[groupIndex] = val;
    onChange({ ...item, megaMenu: next });
  };

  const removeGroup = (groupIndex: number) => {
    const next = [...(item.megaMenu || [])];
    next.splice(groupIndex, 1);
    onChange({ ...item, megaMenu: next.length > 0 ? next : undefined });
  };

  const addGroup = () => {
    onChange({
      ...item,
      megaMenu: [...(item.megaMenu || []), { title: "", items: [{ label: "", to: "#", description: "", icon: "" }] }],
    });
  };

  const toggleMegaMenu = () => {
    if (hasMegaMenu) {
      onChange({ label: item.label, to: item.megaMenu?.[0]?.items?.[0]?.to || "#" });
    } else {
      onChange({ label: item.label, megaMenu: [{ title: "", items: [{ label: "", to: "#", description: "", icon: "" }] }] });
    }
  };

  return (
    <div className="glass-card rounded-xl border border-border/30 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 bg-white/[0.02] border-b border-border/20">
        <div className="flex flex-col gap-0.5">
          <button type="button" onClick={onMoveUp} disabled={index === 0} className="text-muted-foreground hover:text-foreground disabled:opacity-20">
            <ArrowUp size={12} />
          </button>
          <button type="button" onClick={onMoveDown} disabled={index === total - 1} className="text-muted-foreground hover:text-foreground disabled:opacity-20">
            <ArrowDown size={12} />
          </button>
        </div>

        <button type="button" onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {hasMegaMenu ? (
          <FolderOpen size={16} className="text-primary" />
        ) : (
          <Link2 size={16} className="text-muted-foreground" />
        )}

        <div className="flex-1 grid grid-cols-2 gap-2">
          <Input
            value={item.label}
            onChange={(e) => onChange({ ...item, label: e.target.value })}
            className="h-8 text-sm font-medium"
            placeholder="Menu label"
          />
          {!hasMegaMenu && (
            <Input
              value={item.to || ""}
              onChange={(e) => onChange({ ...item, to: e.target.value })}
              className="h-8 text-sm"
              placeholder="/path"
            />
          )}
        </div>

        <button
          type="button"
          onClick={toggleMegaMenu}
          className={cn(
            "text-[10px] px-2 py-1 rounded-md border transition-colors",
            hasMegaMenu
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-border/30 text-muted-foreground hover:text-foreground"
          )}
        >
          {hasMegaMenu ? "Mega Menu" : "Simple Link"}
        </button>

        <button type="button" onClick={onRemove} className="p-1.5 text-destructive hover:bg-destructive/10 rounded">
          <Trash2 size={14} />
        </button>
      </div>

      {/* Body */}
      {expanded && hasMegaMenu && item.megaMenu && (
        <div className="p-4 space-y-3">
          {item.megaMenu.map((group, groupIndex) => (
            <GroupEditor
              key={groupIndex}
              group={group}
              onChange={(val) => updateGroup(groupIndex, val)}
              onRemove={() => removeGroup(groupIndex)}
            />
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addGroup} className="w-full">
            <Plus size={14} className="mr-1" /> Add Column/Group
          </Button>
        </div>
      )}
    </div>
  );
};

// ─── Main Component ───

const AdminNavigation = () => {
  const { toast } = useToast();
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminApi
      .getSettings()
      .then((data) => {
        setNavItems(
          data?.navigation?.length ? data.navigation : serializeNavigation(defaultNavigation)
        );
      })
      .catch((err: any) => {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      })
      .finally(() => setLoading(false));
  }, []);

  const updateItem = (index: number, val: NavItem) => {
    const next = [...navItems];
    next[index] = val;
    setNavItems(next);
  };

  const removeItem = (index: number) => {
    const next = [...navItems];
    next.splice(index, 1);
    setNavItems(next);
  };

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= navItems.length) return;
    const next = [...navItems];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setNavItems(next);
  };

  const addSimpleLink = () => {
    setNavItems([...navItems, { label: "", to: "#" }]);
  };

  const addMegaMenu = () => {
    setNavItems([
      ...navItems,
      {
        label: "",
        megaMenu: [
          {
            title: "",
            items: [{ label: "", to: "#", description: "", icon: "" }],
          },
        ],
      },
    ]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Validate
      for (const item of navItems) {
        if (!item.label.trim()) {
          toast({ title: "Error", description: "All menu items need a label", variant: "destructive" });
          setSaving(false);
          return;
        }
      }

      await adminApi.updateSettings({ navigation: navItems });
      toast({
        title: "Navigation saved!",
        description: "Refresh the homepage to see the updated menu.",
      });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold">Navigation Menu</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Manage the main navigation bar. Drag items to reorder. Toggle between simple links and mega menus.
          </p>
        </div>
        <Button onClick={handleSave} size="sm" className="gradient-bg border-0" disabled={saving}>
          <Save size={14} className="mr-1" /> {saving ? "Saving..." : "Save Navigation"}
        </Button>
      </div>

      {/* Nav items */}
      <div className="space-y-3">
        {navItems.map((item, index) => (
          <NavItemEditor
            key={index}
            item={item}
            index={index}
            total={navItems.length}
            onChange={(val) => updateItem(index, val)}
            onRemove={() => removeItem(index)}
            onMoveUp={() => moveItem(index, index - 1)}
            onMoveDown={() => moveItem(index, index + 1)}
          />
        ))}
      </div>

      {/* Add buttons */}
      <div className="flex gap-3 mt-4">
        <Button type="button" variant="outline" size="sm" onClick={addSimpleLink}>
          <Plus size={14} className="mr-1" /> Add Simple Link
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={addMegaMenu}>
          <Plus size={14} className="mr-1" /> Add Mega Menu
        </Button>
      </div>

      {/* Preview */}
      <div className="mt-8 glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold mb-3">Preview</h3>
        <div className="flex gap-4 flex-wrap">
          {navItems.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-sm font-medium">{item.label || "(empty)"}</span>
              {item.megaMenu && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                  {item.megaMenu.length} col{item.megaMenu.length > 1 ? "s" : ""}
                </span>
              )}
              {item.to && !item.megaMenu && (
                <span className="text-[10px] text-muted-foreground">→ {item.to}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNavigation;
