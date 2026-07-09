import { useEffect, useState } from "react";
import { adminApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Plus, Trash2, Save, X, Plug, Loader2,
  ArrowUp, ArrowDown, CheckCircle, XCircle, Sparkles, BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  settings: Record<string, any> | null;
  created_at?: string;
  updated_at?: string;
}

const defaultConfig: McpConfig = {
  name: "",
  type: "claude",
  api_endpoint: "",
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

const TYPE_OPTIONS = [
  { value: "claude", label: "Claude" },
  { value: "openai", label: "OpenAI" },
  { value: "custom", label: "Custom" },
];

const AdminMcpConfig = () => {
  const { toast } = useToast();
  const [configs, setConfigs] = useState<McpConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<McpConfig>({ ...defaultConfig });
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [preview, setPreview] = useState<Record<string, any> | null>(null);
  const [toolInput, setToolInput] = useState("");

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    try {
      const data = await adminApi.getMcpConfigs();
      setConfigs(Array.isArray(data) ? data : []);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingId(null);
    setForm({ ...defaultConfig });
    setTestResult(null);
    setPreview(null);
    setToolInput("");
    setShowForm(true);
  };

  const handleEdit = (config: McpConfig) => {
    setEditingId(config.id!);
    setForm({ ...config, auth_token: config.auth_token || config.api_key || "", visible_tools: config.visible_tools || [] });
    setTestResult(null);
    setPreview(null);
    setToolInput((config.visible_tools || []).join(", "));
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...defaultConfig });
    setTestResult(null);
    setPreview(null);
    setToolInput("");
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast({ title: "Error", description: "Name is required", variant: "destructive" });
      return;
    }
    const payload = {
      ...form,
      api_key: form.api_key || form.auth_token || "",
      auth_token: form.auth_token || form.api_key || "",
      visible_tools: toolInput.split(",").map((item) => item.trim()).filter(Boolean),
    };
    setSaving(true);
    try {
      if (editingId) {
        await adminApi.updateMcpConfig(editingId, payload);
        toast({ title: "Updated", description: "MCP config updated." });
      } else {
        await adminApi.createMcpConfig(payload);
        toast({ title: "Created", description: "MCP config created." });
      }
      setShowForm(false);
      setEditingId(null);
      setForm({ ...defaultConfig });
      setToolInput("");
      await loadConfigs();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this MCP config?")) return;
    try {
      await adminApi.deleteMcpConfig(id);
      toast({ title: "Deleted", description: "MCP config removed." });
      await loadConfigs();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleTest = async () => {
    if (!form.api_endpoint) {
      toast({ title: "Error", description: "API endpoint is required to test", variant: "destructive" });
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
      toast({ title: "Error", description: "API endpoint is required to preview client configs", variant: "destructive" });
      return;
    }
    setPreviewing(true);
    try {
      const payload = {
        ...form,
        api_key: form.api_key || form.auth_token || "",
        auth_token: form.auth_token || form.api_key || "",
        visible_tools: toolInput.split(",").map((item) => item.trim()).filter(Boolean),
      };
      const res = await adminApi.previewMcpConfig(payload);
      setPreview(res);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setPreviewing(false);
    }
  };

  const moveConfig = async (index: number, direction: "up" | "down") => {
    const newConfigs = [...configs];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newConfigs.length) return;
    [newConfigs[index], newConfigs[swapIndex]] = [newConfigs[swapIndex], newConfigs[index]];
    // Update priorities
    newConfigs.forEach((c, i) => (c.priority = i));
    setConfigs(newConfigs);
    // Save new order
    try {
      for (const c of newConfigs) {
        if (c.id) await adminApi.updateMcpConfig(c.id, { priority: c.priority });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
      await loadConfigs();
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
          <h2 className="text-lg font-bold">MCP Configuration</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Manage Model Context Protocol server connections for AI integrations.
          </p>
        </div>
        {!showForm && (
          <Button onClick={handleCreate} size="sm" className="gradient-bg border-0">
            <Plus size={14} className="mr-1" /> Add Config
          </Button>
        )}
      </div>

      {!showForm && (
        <div className="glass-card rounded-xl p-5 mb-6 border border-border/30">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <BookOpen size={16} />
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold">How to connect MCP to a client</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Use this page to define the endpoint, authentication, and tool visibility for your MCP server, then copy the generated config into ChatGPT, Claude, VS Code, Cursor, WeChat, or a custom agent.
                </p>
              </div>
              <ol className="space-y-2 text-xs text-muted-foreground list-decimal list-inside">
                <li>Enter a clear name and your MCP endpoint such as <span className="font-medium text-foreground">https://your-mcp-host/mcp</span>.</li>
                <li>Select the auth method that matches your server and fill in the token or OAuth credentials.</li>
                <li>Choose which tools should be exposed and save the configuration.</li>
                <li>Use the <span className="font-medium text-foreground">Preview Client Configs</span> button to copy the ready-to-paste snippet for your target client.</li>
              </ol>
              <div className="rounded-lg border border-border/30 bg-background/60 p-3 text-[11px] text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Supported client formats</p>
                <p>ChatGPT / OpenAI-compatible apps, Claude Desktop, VS Code / Cursor, WeChat bots, and generic custom agents.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="glass-card rounded-xl p-5 mb-6 border border-border/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">
              {editingId ? "Edit MCP Config" : "New MCP Config"}
            </h3>
            <button onClick={handleCancel} className="p-1 text-muted-foreground hover:text-foreground rounded">
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs">Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Claude Production"
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Type</Label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as McpConfig["type"] })}
                className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm"
              >
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label className="text-xs">API Endpoint</Label>
              <Input
                value={form.api_endpoint}
                onChange={(e) => setForm({ ...form, api_endpoint: e.target.value })}
                placeholder="https://your-mcp-host/mcp"
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Auth Method</Label>
              <select
                value={form.auth_method}
                onChange={(e) => setForm({ ...form, auth_method: e.target.value as McpConfig["auth_method"] })}
                className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm"
              >
                <option value="bearer">Bearer Token</option>
                <option value="api_key">API Key</option>
                <option value="oauth_client_credentials">OAuth Client Credentials</option>
                <option value="none">None</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Token / API Key</Label>
              <Input
                type="password"
                value={form.auth_token || form.api_key || ""}
                onChange={(e) => {
                  const next = e.target.value;
                  setForm({ ...form, auth_token: next, api_key: next });
                }}
                placeholder="Bearer token or API key"
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">OAuth Client ID</Label>
              <Input
                value={form.oauth_client_id || ""}
                onChange={(e) => setForm({ ...form, oauth_client_id: e.target.value })}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">OAuth Client Secret</Label>
              <Input
                type="password"
                value={form.oauth_client_secret || ""}
                onChange={(e) => setForm({ ...form, oauth_client_secret: e.target.value })}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">OAuth Scopes</Label>
              <Input
                value={form.oauth_scopes || ""}
                onChange={(e) => setForm({ ...form, oauth_scopes: e.target.value })}
                placeholder="mcp/read"
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Model</Label>
              <Input
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                placeholder="claude-3-7-sonnet-latest"
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Tool Visibility</Label>
              <select
                value={form.tool_visibility || "all"}
                onChange={(e) => setForm({ ...form, tool_visibility: e.target.value as McpConfig["tool_visibility"] })}
                className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm"
              >
                <option value="all">All tools</option>
                <option value="custom">Custom allowlist</option>
                <option value="none">No tools</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Priority</Label>
              <Input
                type="number"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: parseInt(e.target.value) || 0 })}
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Enabled</Label>
              <div className="flex items-center gap-3 h-9">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, enabled: !form.enabled })}
                  className={cn(
                    "w-10 h-5 rounded-full transition-colors relative",
                    form.enabled ? "bg-primary" : "bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform",
                      form.enabled ? "translate-x-5" : "translate-x-0.5"
                    )}
                  />
                </button>
                <span className="text-xs text-muted-foreground">{form.enabled ? "Active" : "Disabled"}</span>
              </div>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label className="text-xs">Visible tools</Label>
              <Input
                value={toolInput}
                onChange={(e) => setToolInput(e.target.value)}
                placeholder="audit_ge_seo, recommend_service, health_check"
                className="h-9 text-sm"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label className="text-xs">Connection notes</Label>
              <Textarea
                value={form.connection_notes || ""}
                onChange={(e) => setForm({ ...form, connection_notes: e.target.value })}
                rows={3}
                placeholder="Add internal instructions or notes for the agent connection."
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleTest}
              disabled={testing || !form.api_endpoint}
            >
              {testing ? <Loader2 size={14} className="mr-1 animate-spin" /> : <Plug size={14} className="mr-1" />}
              {testing ? "Testing..." : "Test Connection"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePreview}
              disabled={previewing || !form.api_endpoint}
            >
              {previewing ? <Loader2 size={14} className="mr-1 animate-spin" /> : <Sparkles size={14} className="mr-1" />}
              {previewing ? "Preparing..." : "Preview Client Configs"}
            </Button>
            {testResult && (
              <span className={cn("flex items-center gap-1 text-xs", testResult.ok ? "text-green-500" : "text-destructive")}>
                {testResult.ok ? <CheckCircle size={14} /> : <XCircle size={14} />}
                {testResult.message}
              </span>
            )}
          </div>

          {preview && (
            <div className="mt-4 space-y-3">
              {Object.entries(preview).map(([key, value]: [string, any]) => (
                <div key={key} className="rounded-lg border border-border/40 p-3 bg-background/60">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold capitalize">{value.title || key}</p>
                      <p className="text-[11px] text-muted-foreground">{value.note}</p>
                    </div>
                  </div>
                  <pre className="mt-2 overflow-x-auto text-[11px] whitespace-pre-wrap break-all">{value.content}</pre>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-border/20">
            <Button variant="outline" size="sm" onClick={handleCancel}>Cancel</Button>
            <Button size="sm" className="gradient-bg border-0" onClick={handleSave} disabled={saving}>
              <Save size={14} className="mr-1" /> {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      )}

      {/* List */}
      {configs.length === 0 ? (
        <div className="glass-card rounded-xl p-12 text-center">
          <Plug size={32} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">No MCP configurations yet.</p>
          <Button variant="outline" size="sm" onClick={handleCreate} className="mt-4">
            <Plus size={14} className="mr-1" /> Add First Config
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {configs.map((config, index) => (
            <div
              key={config.id}
              className="glass-card rounded-xl border border-border/30 p-4 flex items-center gap-4"
            >
              {/* Priority arrows */}
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => moveConfig(index, "up")}
                  disabled={index === 0}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-20"
                >
                  <ArrowUp size={12} />
                </button>
                <button
                  onClick={() => moveConfig(index, "down")}
                  disabled={index === configs.length - 1}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-20"
                >
                  <ArrowDown size={12} />
                </button>
              </div>

              {/* Status dot */}
              <div className={cn("w-2.5 h-2.5 rounded-full shrink-0", config.enabled ? "bg-green-500" : "bg-muted")} />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate">{config.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary shrink-0">
                    {config.type}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground truncate mt-0.5">
                  {config.api_endpoint || "No endpoint"} {config.model ? `— ${config.model}` : ""}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(config)} className="h-8 text-xs">
                  Edit
                </Button>
                <button
                  onClick={() => config.id && handleDelete(config.id)}
                  className="p-1.5 text-destructive hover:bg-destructive/10 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMcpConfig;
