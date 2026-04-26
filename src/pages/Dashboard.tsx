import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { MessageCircle, LogOut, Play } from "lucide-react";

type Tone = "friendly" | "professional" | "casual";

interface WhatsReplySettings {
  displayName?: string;
  tone?: Tone;
  signature?: string;
  autoSend?: boolean;
}

const APP_KEY = "whatsreply";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const [settings, setSettings] = useState<WhatsReplySettings>({
    displayName: "",
    tone: "friendly",
    signature: "",
    autoSend: false,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("app_settings")
        .select("settings")
        .eq("app_key", APP_KEY)
        .maybeSingle();
      if (cancelled) return;
      if (error) {
        toast.error("Couldn't load your settings");
      } else if (data?.settings) {
        setSettings({ tone: "friendly", ...(data.settings as WhatsReplySettings) });
      }
      setLoadingSettings(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("app_settings")
      .upsert(
        { user_id: user.id, app_key: APP_KEY, settings },
        { onConflict: "user_id,app_key" }
      );
    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Settings saved");
    }
  };

  const handleTestAction = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("whatsreply-action", {
        body: { hello: "from dashboard", at: new Date().toISOString() },
      });
      if (error) {
        // supabase-js wraps non-2xx into FunctionsHttpError. Try to read the JSON body.
        let msg = error.message ?? "Action failed";
        const status = (error as any).context?.status;
        try {
          const body = await (error as any).context?.json?.();
          if (body?.error) msg = body.error;
          if (status === 401) {
            if (body?.error === "Invalid session.") {
              await supabase.auth.refreshSession();
              toast.error("Session expired — please try again.");
            } else {
              toast.error("Please sign in again.");
              await signOut();
              navigate("/auth");
            }
          } else if (status === 429) {
            toast.error(
              "You've hit this month's WhatsReply limit. Resets next month."
            );
          } else {
            toast.error(msg);
          }
        } catch {
          toast.error(msg);
        }
        setTestResult(JSON.stringify({ error: msg, status }, null, 2));
        return;
      }
      setTestResult(JSON.stringify(data, null, 2));
      toast.success("Action succeeded");
    } finally {
      setTesting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <MessageCircle className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">WhatsReply</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 space-y-8">
        <section>
          <h1 className="text-3xl font-bold">
            Welcome{user?.email ? `, ${user.email}` : ""}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Tune how WhatsReply writes for you, then try a test action.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <form
            onSubmit={handleSave}
            className="rounded-2xl border border-border bg-card p-6 space-y-5"
          >
            <div>
              <h2 className="text-lg font-semibold">Settings</h2>
              <p className="text-sm text-muted-foreground">
                Stored per user in <code className="rounded bg-muted px-1">app_settings</code>.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Display name</Label>
              <Input
                id="displayName"
                value={settings.displayName ?? ""}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, displayName: e.target.value }))
                }
                placeholder="How replies sign off"
                disabled={loadingSettings}
              />
            </div>

            <div className="space-y-2">
              <Label>Tone</Label>
              <Select
                value={settings.tone ?? "friendly"}
                onValueChange={(v: Tone) => setSettings((s) => ({ ...s, tone: v }))}
                disabled={loadingSettings}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signature">Signature</Label>
              <Textarea
                id="signature"
                value={settings.signature ?? ""}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, signature: e.target.value }))
                }
                placeholder="— Sent via WhatsReply"
                rows={3}
                disabled={loadingSettings}
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <div>
                <Label htmlFor="autoSend" className="text-sm">Auto-send</Label>
                <p className="text-xs text-muted-foreground">
                  Send replies without manual review.
                </p>
              </div>
              <Switch
                id="autoSend"
                checked={!!settings.autoSend}
                onCheckedChange={(v) => setSettings((s) => ({ ...s, autoSend: v }))}
                disabled={loadingSettings}
              />
            </div>

            <Button type="submit" disabled={saving || loadingSettings}>
              {saving ? "Saving…" : "Save settings"}
            </Button>
          </form>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
            <div>
              <h2 className="text-lg font-semibold">Test action</h2>
              <p className="text-sm text-muted-foreground">
                Calls the <code className="rounded bg-muted px-1">whatsreply-action</code>{" "}
                edge function. Each call counts toward your monthly quota (500).
              </p>
            </div>

            <Button onClick={handleTestAction} disabled={testing}>
              <Play className="mr-2 h-4 w-4" />
              {testing ? "Running…" : "Run test action"}
            </Button>

            {testResult && (
              <pre className="max-h-64 overflow-auto rounded-xl border border-border bg-muted p-3 text-xs">
                {testResult}
              </pre>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
