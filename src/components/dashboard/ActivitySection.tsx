import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Activity, AlertCircle, RefreshCw, MessageSquare } from "lucide-react";
import { useSendSmartUsage } from "@/hooks/useSendSmartUsage";
import { useThreadHistory } from "@/hooks/useThreadHistory";

const formatPeriod = (period?: string) => {
  if (!period) return "";
  const [y, m] = period.split("-").map(Number);
  if (!y || !m) return period;
  return new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  }).format(new Date(y, m - 1, 1));
};

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

const decisionTone: Record<string, string> = {
  reply: "bg-primary/15 text-primary",
  sent: "bg-primary/15 text-primary",
  reply_sent: "bg-primary/15 text-primary",
  review: "bg-accent/15 text-accent",
  review_flagged: "bg-accent/15 text-accent",
  review_ready: "bg-accent/15 text-accent",
  flagged: "bg-accent/15 text-accent",
  skip: "bg-muted text-muted-foreground",
  skipped: "bg-muted text-muted-foreground",
  review_resolved: "bg-secondary text-secondary-foreground",
  resolved: "bg-secondary text-secondary-foreground",
  draft_saved: "bg-muted text-muted-foreground",
  thread_opened: "bg-muted text-muted-foreground",
};

const labelFor = (eventType: string, decision: string | null) => {
  const raw = decision || eventType;
  return raw.split("_").join(" ");
};

const ActivitySection = () => {
  const usage = useSendSmartUsage();
  const history = useThreadHistory(15);

  const replied = usage.data?.used.emails ?? 0;
  const repliedQuota = usage.data?.quota.emails ?? 0;
  const repliedPct =
    repliedQuota > 0 ? Math.min((replied / repliedQuota) * 100, 100) : 0;

  const tokensUsed =
    (usage.data?.used.inputTokens ?? 0) + (usage.data?.used.outputTokens ?? 0);
  const tokensQuota =
    (usage.data?.quota.inputTokens ?? 0) + (usage.data?.quota.outputTokens ?? 0);
  const tokensPct =
    tokensQuota > 0 ? Math.min((tokensUsed / tokensQuota) * 100, 100) : 0;

  const refreshAll = () => {
    usage.refetch();
    history.refetch();
  };

  const isBusy = usage.isLoading || history.isFetching;

  return (
    <section id="activity" className="rounded-2xl border bg-card overflow-hidden">
      <header className="flex items-center justify-between gap-3 p-5 border-b">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-primary" />
          <h2 className="font-semibold">Activity</h2>
          {usage.data?.period && (
            <span className="text-sm text-muted-foreground">
              · {formatPeriod(usage.data.period)}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={refreshAll}
          disabled={isBusy}
          className="gap-1.5"
        >
          <RefreshCw size={14} className={isBusy ? "animate-spin" : ""} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </header>

      <div className="p-5 space-y-6">
        {/* Usage bars */}
        {usage.isLoading && !usage.data ? (
          <div className="space-y-4">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        ) : usage.error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Couldn't load usage</AlertTitle>
            <AlertDescription className="flex items-center justify-between gap-4">
              <span>{usage.error.message}</span>
              <Button size="sm" variant="outline" onClick={() => usage.refetch()}>
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        ) : usage.data ? (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-muted/40 p-4">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs text-muted-foreground">Messages</span>
                <span className="text-sm font-medium tabular-nums">
                  {replied.toLocaleString()} / {repliedQuota.toLocaleString()}
                </span>
              </div>
              <Progress value={repliedPct} className="h-1.5" />
            </div>
            <div className="rounded-xl bg-muted/40 p-4">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs text-muted-foreground">AI tokens</span>
                <span className="text-sm font-medium tabular-nums">
                  {tokensUsed.toLocaleString()} / {tokensQuota.toLocaleString()}
                </span>
              </div>
              <Progress value={tokensPct} className="h-1.5" />
            </div>
          </div>
        ) : null}

        {/* Recent activity stream from thread_state_history */}
        <div>
          <h3 className="text-sm font-medium mb-3">Recent activity</h3>

          {history.isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : history.error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between gap-4">
                <span>{history.error.message}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => history.refetch()}
                >
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          ) : history.items.length === 0 ? (
            <div className="rounded-xl border border-dashed py-10 flex flex-col items-center justify-center text-center">
              <MessageSquare className="h-7 w-7 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                No recent activity yet.
              </p>
            </div>
          ) : (
            <ol className="relative border-l border-border ml-2 space-y-4">
              {history.items.slice(0, 10).map((entry) => {
                const sender =
                  entry.sender_name?.trim() ||
                  entry.sender_email ||
                  "Unknown sender";
                const tone =
                  decisionTone[entry.decision ?? ""] ??
                  decisionTone[entry.event_type] ??
                  "bg-muted text-muted-foreground";
                return (
                  <li key={entry.id} className="pl-4 relative">
                    <span className="absolute -left-1.5 top-2 h-3 w-3 rounded-full border-2 border-background bg-primary" />
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <span
                        className="text-sm font-medium truncate max-w-[60%]"
                        title={sender}
                      >
                        {sender}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${tone}`}
                        >
                          {labelFor(entry.event_type, entry.decision)}
                        </span>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {formatDate(entry.occurred_at)}
                        </span>
                      </div>
                    </div>
                    <p
                      className="text-sm text-muted-foreground mt-1 line-clamp-1"
                      title={entry.subject ?? ""}
                    >
                      {entry.subject || "(no subject)"}
                    </p>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
};

export default ActivitySection;
