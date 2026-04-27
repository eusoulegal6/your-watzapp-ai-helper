import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle2, RefreshCw, Flag, Clock } from "lucide-react";
import { useThreadStates } from "@/hooks/useThreadStates";
import { BackendUnavailableError } from "@/lib/sendSmartBackend";
import ReviewThreadCard from "./ReviewThreadCard";
import { cn } from "@/lib/utils";

export default function FlaggedReviewSection() {
  const { reviewItems, isLoading, error, refetch, isFetching } =
    useThreadStates({ onlyReview: true });

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Flag size={18} className="text-primary" />
          <h2 className="text-xl font-semibold">In review</h2>
          {!isLoading && !error && (
            <Badge variant="secondary" className="ml-1">
              {reviewItems.length}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="gap-1.5"
        >
          <RefreshCw size={14} className={cn(isFetching && "animate-spin")} />
          <span className="hidden sm:inline">Refresh</span>
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Couldn't load review queue: {error.message}
          </AlertDescription>
        </Alert>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && !error && reviewItems.length === 0 && (
        <Card>
          <CardContent className="p-8 flex flex-col items-center justify-center text-center gap-2">
            <CheckCircle2 className="h-8 w-8 text-primary" />
            <p className="font-medium">No threads in review</p>
            <p className="text-sm text-muted-foreground">
              When the extension flags a message for your attention, it will
              show up here.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && reviewItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviewItems.map((item) => (
            <ReviewThreadCard key={item.id} thread={item} />
          ))}
        </div>
      )}
    </section>
  );
}
