import { useEffect, useState, useCallback } from "react";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Plus, Trash2, Save, X, Plug, Loader2, ArrowUp, ArrowDown,
  CheckCircle2, XCircle, Sparkles, Copy, Eye, EyeOff, Edit2,
  RefreshCw, ChevronDown, ChevronUp, Terminal, Shield, Zap,
  Globe, Settings2, AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface McpConfig {
  id?: number;
  name: string;
  type: "claude" | "openai" | "custom";
  api_endpoint: string;
  api_key: string;
  auth_token?: string;
  auth_method?: "bearer" | "api_key" | "oauth_client_credentials" | "none";
  oauth_client_id?: string;
  oauth_client_secret?: string;
  oauth_scopes?: string;
  tool_visibility?: "all" | "custom" | "none";
  visible_tools?: string[];
  connection_notes?: string;
  model: string;
  enabled: boolean;
  priority: number;
  settings?: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
}

type PreviewTab = "chatgpt" | "claude" | "vscode" | "wechat" | "custom";

interface PreviewEntry {
  title: string;
  content: string;
  note: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const EMPTY: McpConfig = {
  name: "",
  type: "claude",
  api_endpoint: "https://engineerstechbd.com/mcp",
  api_key: "",
  auth_token: "",
  auth_method: "bearer",
  oauth_client_id: "",
  oauth_client_secret: "",
  oauth_scopes: "mcp/read",
  tool_visibility: "all",
  visible_tools: [],
  connection_notes: "",
  model: "",
  enabled: true,
  priority: 0,
  settings: null,
};

const TYPE_META: Record<string, { label: string; color: string; icon: typeof Plug }> = {
  claude:  { label: "Claude",  color: "bg-orange-500/15 text-orange-400 border-orange-400/30", icon: Zap },
  openai:  { label: "OpenAI",  color: "bg-green-500/15  text-green-400  border-green-400/30",  icon: Sparkles },
  custom:  { label: "Custom",  color: "bg-blue-500/15   text-blue-400   border-blue-400/30",   icon: Settings2 },
};

const PREVIEW_TABS: { id: PreviewTab; label: string }[] = [
  { id: "chatgpt", label: "ChatGPT / OpenAI" },
  { id: "claude",  label: "Claude Desktop" },
  { id: "vscode",  label: "VS Code / Cursor" },
  { id: "wechat",  label: "WeChat / Bot" },
  { id: "custom",  label: "Custom Agent" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useCopy() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  }, []);
  return { copy, copiedKey };
}

function SecretField({
  label, value, onChange, placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="space-y-1">
      <Label className="text-xs">{label}</Label>
      <div className="relative">
        <Input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-9 text-sm pr-9"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          tabIndex={-1}
        >
          {visible ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </div>
  );
}

// ─── ConfigCard ───────────────────────────────────────────────────────────────

function ConfigCard({
  config,
  index,
  total,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  config: McpConfig;
  index: number;
  total: number;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string; latencyMs?: number } | null>(null);
  const { copy, copiedKey } = useCopy();

  const meta = TYPE_META[config.type] ?? TYPE_META.custom;
  const Icon = meta.icon;

  const handleQuickTest = async () => {
    setTesting(true);
    setTestResult(null);
    const start = Date.now();
    try {
      const res = await adminApi.testMcpConfig({
        api_endpoint: config.api_endpoint,
        api_key: config.api_key || config.auth_token || "",
        auth_token: config.auth_token || config.api_key || "",
        auth_method: config.auth_method || "bearer",
        model: config.model,
      });
      setTestResult({ ...res, latencyMs: Date.now() - start });
    } catch (err: any) {
      setTestResult({ ok: false, message: err.message || "Test failed", latencyMs: Date.now() - start });
    } finally {
      setTesting(false);
    }
  };

  const endpointDisplay = config.api_endpoint
    ? config.api_endpoint.replace(/^https?:\/\//, "").replace(/\/mcp$/, "") + "/mcp"
    : "No endpoint";

  return (
    <div className={cn(
      "glass-card rounded-xl border transition-all",
      config.enabled ? "border-border/30" : "border-border/20 opacity-60"
    )}>
      {/* Card header row */}
      <div className="flex items-center gap-3 p-4">
        {/* Priority arrows */}
        <div className="flex flex-col gap-0.5 shrink-0">
          <button
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-20 rounded transition-colors"
            aria-label="Move up"
          >
            <ArrowUp size={12} />
          </button>
          <button
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-20 rounded transition-colors"
            aria-label="Move down"
          >
            <ArrowDown size={12} />
          </button>
        </div>

        {/* Type icon */}
        <div className={cn("w-8 h-8 rounded-lg border flex items-center justify-center shrink-0", meta.color)}>
          <Icon size={14} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold truncate">{config.name}</span>
            <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full border font-medium shrink-0", meta.color)}>
              {meta.label}
            </span>
            {config.enabled ? (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-400/30 font-medium shrink-0">
                Active
              </span>
            ) : (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border font-medium shrink-0">
                Disabled
              </span>
            )}
            {testResult && (
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full border font-medium flex items-center gap-1 shrink-0",
                testResult.ok
                  ? "bg-green-500/15 text-green-400 border-green-400/30"
                  : "bg-destructive/15 text-destructive border-destructive/30"
              )}>
                {testResult.ok ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                {testResult.ok ? `OK ${testResult.latencyMs}ms` : "Failed"}
              </span>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground font-mono mt-0.5 truncate">{endpointDisplay}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleQuickTest}
            disabled={testing || !config.api_endpoint}
            title="Quick test"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-40"
          >
            {testing ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          </button>
          <button
            onClick={() => copy(config.api_endpoint || "", `ep-${config.id}`)}
            title="Copy endpoint"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            {copiedKey === `ep-${config.id}` ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
          <button
            onClick={onEdit}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 size={14} />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Expanded detail row */}
      {expanded && (
        <div className="border-t border-border/20 px-4 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <p className="text-muted-foreground mb-0.5">Auth method</p>
            <p className="font-medium capitalize">{config.auth_method || "bearer"}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-0.5">Model</p>
            <p className="font-medium truncate">{config.model || "—"}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-0.5">Tool visibility</p>
            <p className="font-medium capitalize">{config.tool_visibility || "all"}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-0.5">Priority</p>
            <p className="font-medium">{config.priority}</p>
          </div>
          {config.connection_notes && (
            <div className="col-span-2 sm:col-span-4">
              <p className="text-muted-foreground mb-0.5">Notes</p>
              <p className="text-foreground/80">{config.connection_notes}</p>
            </div>
          )}
          {config.visible_tools && config.visible_tools.length > 0 && (
            <div className="col-span-2 sm:col-span-4">
              <p className="text-muted-foreground mb-1">Allowed tools</p>
              <div className="flex flex-wrap gap-1">
                {config.visible_tools.map((t) => (
                  <span key={t} className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-[10px]">{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── ConfigForm ───────────────────────────────────────────────────────────────

function ConfigForm({
  form,
  setForm,
  editingId,
  onSave,
  onCancel,
  saving,
}: {
  form: McpConfig;
  setForm: React.Dispatch<React.SetStateAction<McpConfig>>;
  editingId: number | null;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const { toast } = useToast();
  const { copy, copiedKey } = useCopy();
  const [toolInput, setToolInput] = useState((form.visible_tools ?? []).join(", "));
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [preview, setPreview] = useState<Record<PreviewTab, PreviewEntry> | null>(null);
  const [activeTab, setActiveTab] = useState<PreviewTab>("chatgpt");
  const [section, setSection] = useState<"basic" | "auth" | "tools">("basic");

  const f = (key: keyof McpConfig, val: unknown) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = () => {
    setForm((prev) => ({
      ...prev,
      visible_tools: toolInput.split(",").map((t) => t.trim()).filter(Boolean),
    }));
    onSave();
  };

  const handleTest = async () => {
    if (!form.api_endpoint) {
      toast({ title: "Endpoint required", description: "Enter an API endpoint first.", variant: "destructive" });
      return;
    }
    setTesting(true);
    setTestResult(null);
    try {
      const res = await adminApi.testMcpConfig({
        api_endpoint: form.api_endpoint,
        api_key: form.api_key || form.auth_token || "",
        auth_token: form.auth_token || form.api_key || "",
        auth_method: form.auth_method || "bearer",
        model: form.model,
      });
      setTestResult(res);
    } catch (err: any) {
      setTestResult({ ok: false, message: err.message || "Test failed" });
    } finally {
      setTesting(false);
    }
  };

  const handlePreview = async () => {
    if (!form.api_endpoint) {
      toast({ title: "Endpoint required", description: "Enter an API endpoint first.", variant: "destructive" });
      return;
    }
    setPreviewing(true);
    try {
      const payload = {
        ...form,
        api_key: form.api_key || form.auth_token || "",
        auth_token: form.auth_token || form.api_key || "",
        visible_tools: toolInput.split(",").map((t) => t.trim()).filter(Boolean),
      };
      const res = await adminApi.previewMcpConfig(payload);
      setPreview(res);
    } catch (err: any) {
      toast({ title: "Preview failed", description: err.message, variant: "destructive" });
    } finally {
      setPreviewing(false);
    }
  };

  const sectionTabs = [
    { id: "basic", label: "Basic", icon: Globe },
    { id: "auth",  label: "Auth & Credentials", icon: Shield },
    { id: "tools", label: "Tools & Notes", icon: Terminal },
  ] as const;

  return (
    <div className="glass-card rounded-xl border border-primary/20 p-5 mb-6 shadow-md">
      {/* Form header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Plug size={15} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-bold">{editingId ? "Edit MCP Config" : "New MCP Config"}</h3>
            <p className="text-[11px] text-muted-foreground">Fill in all fields then test the connection.</p>
          </div>
        </div>
        <button onClick={onCancel} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-secondary/50 mb-5">
        {sectionTabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setSection(id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-colors",
              section === id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon size={12} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* ── Basic section ── */}
      {section === "basic" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs">Name <span className="text-destructive">*</span></Label>
            <Input
              value={form.name}
              onChange={(e) => f("name", e.target.value)}
              placeholder="e.g. ChatGPT Production"
              className="h-9 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Type</Label>
            <select
              value={form.type}
              onChange={(e) => f("type", e.target.value)}
              className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm"
            >
              <option value="claude">Claude</option>
              <option value="openai">OpenAI / ChatGPT</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div className="sm:col-span-2 space-y-1">
            <Label className="text-xs">MCP Endpoint URL</Label>
            <div className="flex gap-2">
              <Input
                value={form.api_endpoint}
                onChange={(e) => f("api_endpoint", e.target.value)}
                placeholder="https://engineerstechbd.com/mcp"
                className="h-9 text-sm font-mono flex-1"
              />
              <button
                type="button"
                onClick={() => copy(form.api_endpoint, "endpoint")}
                className="px-3 h-9 rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0"
              >
                {copiedKey === "endpoint" ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Model</Label>
            <Input
              value={form.model}
              onChange={(e) => f("model", e.target.value)}
              placeholder="e.g. gpt-4o, claude-3-7-sonnet-latest"
              className="h-9 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Priority</Label>
            <Input
              type="number"
              value={form.priority}
              onChange={(e) => f("priority", parseInt(e.target.value) || 0)}
              className="h-9 text-sm"
            />
          </div>
          <div className="sm:col-span-2 space-y-1">
            <Label className="text-xs">Enabled</Label>
            <button
              type="button"
              onClick={() => f("enabled", !form.enabled)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg border text-sm transition-colors w-full",
                form.enabled
                  ? "border-green-500/30 bg-green-500/10 text-green-400"
                  : "border-border bg-secondary text-muted-foreground"
              )}
            >
              <div className={cn(
                "w-9 h-5 rounded-full relative transition-colors shrink-0",
                form.enabled ? "bg-green-500" : "bg-muted-foreground/30"
              )}>
                <div className={cn(
                  "w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform shadow-sm",
                  form.enabled ? "translate-x-4" : "translate-x-0.5"
                )} />
              </div>
              {form.enabled ? "Active — this config will be used" : "Disabled — this config is inactive"}
            </button>
          </div>
        </div>
      )}

      {/* ── Auth section ── */}
      {section === "auth" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1">
            <Label className="text-xs">Auth Method</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(["bearer", "api_key", "oauth_client_credentials", "none"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => f("auth_method", m)}
                  className={cn(
                    "py-2 px-3 rounded-lg border text-xs font-medium transition-colors capitalize",
                    form.auth_method === m
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {m === "oauth_client_credentials" ? "OAuth CC" : m.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>
          <SecretField
            label="Token / API Key"
            value={form.auth_token || form.api_key || ""}
            onChange={(v) => setForm((p) => ({ ...p, auth_token: v, api_key: v }))}
            placeholder="Bearer token or API key"
          />
          <SecretField
            label="OAuth Client Secret"
            value={form.oauth_client_secret || ""}
            onChange={(v) => f("oauth_client_secret", v)}
            placeholder="Only for OAuth CC flow"
          />
          <div className="space-y-1">
            <Label className="text-xs">OAuth Client ID</Label>
            <Input
              value={form.oauth_client_id || ""}
              onChange={(e) => f("oauth_client_id", e.target.value)}
              className="h-9 text-sm"
              placeholder="Optional"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">OAuth Scopes</Label>
            <Input
              value={form.oauth_scopes || ""}
              onChange={(e) => f("oauth_scopes", e.target.value)}
              placeholder="mcp/read"
              className="h-9 text-sm"
            />
          </div>
          {/* Auth info callout */}
          <div className="sm:col-span-2 flex gap-2 p-3 rounded-lg border border-blue-500/20 bg-blue-500/5 text-xs text-blue-400">
            <Shield size={14} className="shrink-0 mt-0.5" />
            <p>Credentials are stored encrypted server-side and never exposed in the client config previews as plain text.</p>
          </div>
        </div>
      )}

      {/* ── Tools section ── */}
      {section === "tools" && (
        <div className="space-y-4">
          <div className="space-y-1">
            <Label className="text-xs">Tool Visibility</Label>
            <div className="grid grid-cols-3 gap-2">
              {(["all", "custom", "none"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => f("tool_visibility", v)}
                  className={cn(
                    "py-2 px-3 rounded-lg border text-xs font-medium transition-colors capitalize",
                    form.tool_visibility === v
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {v === "all" ? "All Tools" : v === "custom" ? "Allowlist" : "No Tools"}
                </button>
              ))}
            </div>
          </div>
          {form.tool_visibility === "custom" && (
            <div className="space-y-1">
              <Label className="text-xs">Allowed Tools (comma-separated)</Label>
              <Input
                value={toolInput}
                onChange={(e) => setToolInput(e.target.value)}
                placeholder="audit_ge_seo, recommend_service, health_check"
                className="h-9 text-sm font-mono"
              />
              <p className="text-[10px] text-muted-foreground">
                Available: audit_ge_seo, recommend_service, generate_geo_actions, health_check, search, fetch
              </p>
            </div>
          )}
          <div className="space-y-1">
            <Label className="text-xs">Connection Notes (internal)</Label>
            <Textarea
              value={form.connection_notes || ""}
              onChange={(e) => f("connection_notes", e.target.value)}
              rows={3}
              placeholder="Internal notes about this config, environment, or usage."
              className="text-sm resize-none"
            />
          </div>
        </div>
      )}

      {/* ── Action bar ── */}
      <div className="mt-5 pt-4 border-t border-border/20 flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleTest}
          disabled={testing || !form.api_endpoint}
          className="gap-1.5"
        >
          {testing
            ? <Loader2 size={13} className="animate-spin" />
            : testResult
              ? testResult.ok ? <CheckCircle2 size={13} className="text-green-500" /> : <XCircle size={13} className="text-destructive" />
              : <RefreshCw size={13} />}
          {testing ? "Testing…" : "Test Connection"}
        </Button>

        {testResult && (
          <span className={cn(
            "text-xs flex items-center gap-1",
            testResult.ok ? "text-green-500" : "text-destructive"
          )}>
            {testResult.message}
          </span>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handlePreview}
          disabled={previewing || !form.api_endpoint}
          className="gap-1.5"
        >
          {previewing ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
          {previewing ? "Generating…" : "Client Config Preview"}
        </Button>

        <div className="flex-1" />
        <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
        <Button size="sm" className="gradient-bg border-0 gap-1.5" onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
          {saving ? "Saving…" : "Save Config"}
        </Button>
      </div>

      {/* ── Preview panel ── */}
      {preview && (
        <div className="mt-5 pt-4 border-t border-border/20">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold">Client Config Snippets</h4>
            <p className="text-[11px] text-muted-foreground">Copy and paste into your AI client</p>
          </div>

          {/* Tab bar */}
          <div className="flex gap-1 overflow-x-auto pb-1 mb-3">
            {PREVIEW_TABS.filter(({ id }) => preview[id]).map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={cn(
                  "shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap",
                  activeTab === id
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Active tab content */}
          {preview[activeTab] && (() => {
            const entry = preview[activeTab];
            return (
              <div className="rounded-xl border border-border/30 bg-background/40 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/20 bg-secondary/30">
                  <div>
                    <p className="text-xs font-semibold">{entry.title}</p>
                    <p className="text-[11px] text-muted-foreground">{entry.note}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copy(entry.content, `preview-${activeTab}`)}
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors border",
                      copiedKey === `preview-${activeTab}`
                        ? "bg-green-500/15 text-green-400 border-green-400/30"
                        : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    {copiedKey === `preview-${activeTab}`
                      ? <><CheckCircle2 size={12} /> Copied!</>
                      : <><Copy size={12} /> Copy</>}
                  </button>
                </div>
                <pre className="p-4 text-[11px] font-mono overflow-x-auto whitespace-pre-wrap break-all text-foreground/80 leading-relaxed max-h-64 overflow-y-auto">
                  {entry.content}
                </pre>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const AdminMcpConfig = () => {
  const { toast } = useToast();
  const [configs, setConfigs] = useState<McpConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<McpConfig>({ ...EMPTY });
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = await adminApi.getMcpConfigs();
      setConfigs(Array.isArray(data) ? data : []);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...EMPTY });
    setShowForm(true);
  };

  const openEdit = (config: McpConfig) => {
    setEditingId(config.id!);
    setForm({
      ...config,
      auth_token: config.auth_token || config.api_key || "",
      visible_tools: config.visible_tools || [],
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...EMPTY });
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast({ title: "Name required", description: "Give this config a name.", variant: "destructive" });
      return;
    }
    const payload = {
      ...form,
      api_key: form.api_key || form.auth_token || "",
      auth_token: form.auth_token || form.api_key || "",
    };
    setSaving(true);
    try {
      if (editingId) {
        await adminApi.updateMcpConfig(editingId, payload);
        toast({ title: "Saved", description: "MCP config updated." });
      } else {
        await adminApi.createMcpConfig(payload);
        toast({ title: "Created", description: "MCP config added." });
      }
      closeForm();
      await load();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this MCP config?")) return;
    try {
      await adminApi.deleteMcpConfig(id);
      toast({ title: "Deleted" });
      await load();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const moveConfig = async (index: number, direction: "up" | "down") => {
    const next = [...configs];
    const swap = direction === "up" ? index - 1 : index + 1;
    if (swap < 0 || swap >= next.length) return;
    [next[index], next[swap]] = [next[swap], next[index]];
    next.forEach((c, i) => (c.priority = i));
    setConfigs([...next]);
    try {
      for (const c of next) {
        if (c.id) await adminApi.updateMcpConfig(c.id, { priority: c.priority } as unknown);
      }
    } catch {
      await load();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* ── Page header ── */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold">MCP Configuration</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Connect AI clients (ChatGPT, Claude, VS Code) to your MCP server at{" "}
            <span className="font-mono text-primary">engineerstechbd.com/mcp</span>
          </p>
        </div>
        {!showForm && (
          <Button onClick={openCreate} size="sm" className="gradient-bg border-0 gap-1.5 shrink-0">
            <Plus size={14} /> Add Config
          </Button>
        )}
      </div>

      {/* ── Info callout (when no form open) ── */}
      {!showForm && (
        <div className="mb-6 flex gap-3 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-xs">
          <AlertTriangle size={15} className="text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-blue-300/80">
            <p className="font-semibold text-blue-400">Direct HTTP MCP — no tunneling required</p>
            <p>
              Your server is live at <span className="font-mono text-blue-300">https://engineerstechbd.com/mcp</span>.
              Supports <span className="font-mono">initialize</span>, <span className="font-mono">tools/list</span>, and <span className="font-mono">tools/call</span> via Streamable HTTP transport (protocol 2025-03-26).
            </p>
            <p>
              Use <strong>Preview Client Configs</strong> in any config form to get ready-to-paste snippets for ChatGPT, Claude Desktop, VS Code, and custom agents.
            </p>
          </div>
        </div>
      )}

      {/* ── Form ── */}
      {showForm && (
        <ConfigForm
          form={form}
          setForm={setForm}
          editingId={editingId}
          onSave={handleSave}
          onCancel={closeForm}
          saving={saving}
        />
      )}

      {/* ── Config list ── */}
      {configs.length === 0 ? (
        <div className="glass-card rounded-xl p-16 text-center border border-border/20">
          <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
            <Plug size={22} className="text-primary-foreground" />
          </div>
          <h3 className="text-base font-semibold mb-1">No MCP configs yet</h3>
          <p className="text-sm text-muted-foreground mb-5 max-w-xs mx-auto">
            Add your first configuration to connect an AI client to the MCP server.
          </p>
          <Button variant="outline" size="sm" onClick={openCreate} className="gap-1.5">
            <Plus size={14} /> Add First Config
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {configs.map((config, index) => (
            <ConfigCard
              key={config.id}
              config={config}
              index={index}
              total={configs.length}
              onEdit={() => openEdit(config)}
              onDelete={() => config.id && handleDelete(config.id)}
              onMoveUp={() => moveConfig(index, "up")}
              onMoveDown={() => moveConfig(index, "down")}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMcpConfig;
