import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Clock, Check, Loader2, ExternalLink } from "lucide-react";
import { useResolveThreadReview } from "@/hooks/useResolveThreadReview";
import { useToast } from "@/hooks/use-toast";
import type { ThreadState } from "@/hooks/useThreadStates";
import { cn } from "@/lib/utils";

const dtf = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});
const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

function ageInfo(iso: string) {
  const created = new Date(iso).getTime();
  const diffMs = Date.now() - created;
  const hours = diffMs / 3_600_000;
  const days = hours / 24;

  let label: string;
  if (hours < 1) {
    const mins = Math.max(1, Math.round(diffMs / 60_000));
    label = rtf.format(-mins, "minute");
  } else if (hours < 24) {
    label = rtf.format(-Math.round(hours), "hour");
  } else {
    label = rtf.format(-Math.round(days), "day");
  }

  let badgeClass: string;
  let borderClass: string;
  if (days > 3) {
    badgeClass = "bg-destructive/10 text-destructive border-destructive/20";
    borderClass = "border-l-destructive";
  } else if (days >= 1) {
    badgeClass =
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    borderClass = "border-l-amber-500";
  } else {
    badgeClass = "bg-secondary text-secondary-foreground border-transparent";
    borderClass = "border-l-border";
  }

  return { label, badgeClass, borderClass };
}

export default function ReviewThreadCard({ thread }: { thread: ThreadState }) {
  const { label, badgeClass, borderClass } = ageInfo(thread.last_event_at);
  const displayName =
    thread.sender_name?.trim() || thread.sender_email || "Unknown sender";
  const link = thread.thread_url || thread.source_url;
  const resolve = useResolveThreadReview();
  const { toast } = useToast();

  const handleResolve = () => {
    resolve.mutate(thread.id, {
      onSuccess: () =>
        toast({
          title: "Marked as resolved",
          description: "Removed from the review queue.",
        }),
      onError: (err) =>
        toast({
          title: "Couldn't resolve",
          description: err instanceof Error ? err.message : "Try again.",
          variant: "destructive",
        }),
    });
  };

  const body =
    thread.review_summary ||
    thread.review_reason ||
    thread.preview ||
    "Flagged for your review.";

  return (
    <Card
      className={cn(
        "border-l-4 transition-colors hover:border-primary/40",
        borderClass,
      )}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-sm font-medium truncate">
              <MessageCircle size={14} className="text-muted-foreground shrink-0" />
              <span className="truncate">{displayName}</span>
            </div>
            {thread.sender_name && thread.sender_email && (
              <p className="text-xs text-muted-foreground truncate">
                {thread.sender_email}
              </p>
            )}
          </div>
          <span
            className={cn(
              "shrink-0 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium",
              badgeClass,
            )}
          >
            <Clock size={11} />
            {label}
          </span>
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-sm leading-snug line-clamp-1">
            {thread.subject || "(no subject)"}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
            {body}
          </p>
          {thread.review_reason && thread.review_summary && (
            <p className="text-[11px] text-muted-foreground/80 italic line-clamp-2">
              Reason: {thread.review_reason}
            </p>
          )}
        </div>

        <div className="pt-1 border-t border-border/50 flex items-center justify-between gap-2">
          <span className="text-[11px] text-muted-foreground">
            Updated {dtf.format(new Date(thread.last_event_at))}
          </span>
          <div className="flex items-center gap-1">
            {link && (
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs"
                asChild
              >
                <a href={link} target="_blank" rel="noreferrer">
                  <ExternalLink size={12} />
                  Open
                </a>
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2 text-xs"
              onClick={handleResolve}
              disabled={resolve.isPending}
            >
              {resolve.isPending ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Check size={12} />
              )}
              Resolve
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
