import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { iconEntries } from "@/lib/icons";

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  className?: string;
}

const IconPicker = ({ value, onChange, className }: IconPickerProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [rect, setRect] = useState<{ top: number; left: number; width: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        ref.current && !ref.current.contains(e.target as Node) &&
        popoverRef.current && !popoverRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openDropdown = () => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setRect({ top: r.bottom + 4, left: r.left, width: r.width });
    setOpen((o) => !o);
  };

  useEffect(() => {
    if (!open) return;
    const update = () => {
      const r = ref.current?.getBoundingClientRect();
      if (r) setRect({ top: r.bottom + 4, left: r.left, width: r.width });
    };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);

  const selectedEntry = iconEntries.find((e) => e.name === value);
  const SelectedIcon = selectedEntry?.icon;

  const filtered = search
    ? iconEntries.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase())
      )
    : iconEntries;

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={openDropdown}
        className="flex items-center gap-2 w-full h-8 px-2 rounded-md border border-border/30 bg-white/[0.03] hover:bg-white/[0.05] transition-colors text-left"
      >
        {SelectedIcon ? (
          <>
            <SelectedIcon size={14} className="text-primary shrink-0" />
            <span className="text-xs truncate flex-1">{value}</span>
          </>
        ) : (
          <span className="text-xs text-muted-foreground flex-1">Choose icon...</span>
        )}
        <ChevronDown size={12} className={cn("text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {/* Dropdown */}
      {open && rect && createPortal(
        <div
          ref={popoverRef}
          className="fixed z-[100] bg-card border border-border/50 rounded-xl shadow-xl overflow-hidden"
          style={{ top: rect.top, left: rect.left, width: rect.width }}
        >
          {/* Search */}
          <div className="p-2 border-b border-border/20">
            <div className="relative">
              <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search icons..."
                className="w-full h-7 pl-7 pr-2 text-xs bg-transparent border border-border/20 rounded-md outline-none placeholder:text-muted-foreground/50 focus:border-primary/30"
                autoFocus
              />
            </div>
          </div>

          {/* Grid */}
          <div className="p-2 max-h-[200px] overflow-y-auto">
            <div className="grid grid-cols-6 gap-1">
              {filtered.map((entry) => (
                <button
                  key={entry.name}
                  type="button"
                  onClick={() => {
                    onChange(entry.name);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                    value === entry.name
                      ? "bg-primary/15 text-primary"
                      : "hover:bg-white/[0.05] text-muted-foreground hover:text-foreground"
                  )}
                  title={entry.name}
                >
                  <entry.icon size={16} />
                  <span className="text-[8px] leading-tight truncate w-full text-center">
                    {entry.name}
                  </span>
                </button>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">No icons found</p>
            )}
          </div>

          {/* Clear button */}
          {value && (
            <div className="p-2 border-t border-border/20">
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="w-full text-xs text-muted-foreground hover:text-destructive py-1"
              >
                Clear icon
              </button>
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

export default IconPicker;
