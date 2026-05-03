import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CalendarDays, RefreshCw, Phone, User, Sparkles } from "lucide-react";
import { useAppointments } from "@/hooks/useAppointments";
import { cn } from "@/lib/utils";

function formatDate(d: string) {
  try {
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  } catch {
    return d;
  }
}

export default function AppointmentsSection() {
  const { items, isLoading, error, refetch, isFetching } = useAppointments();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-primary" />
          <h2 className="text-xl font-semibold">Appointments booked by your agent</h2>
          {!isLoading && !error && (
            <Badge variant="secondary" className="ml-1">
              {items.length}
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
          <AlertDescription>Couldn't load appointments: {error.message}</AlertDescription>
        </Alert>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && !error && items.length === 0 && (
        <Card>
          <CardContent className="p-8 flex flex-col items-center justify-center text-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <p className="font-medium">No appointments yet</p>
            <p className="text-sm text-muted-foreground">
              When your agent books an appointment, it'll show up here.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((a) => (
            <Card key={a.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <User size={14} className="text-muted-foreground shrink-0" />
                    <span className="font-medium truncate">{a.name}</span>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {a.service}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays size={14} />
                  <span>{formatDate(a.date)}</span>
                  <span className="text-foreground font-medium">{a.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone size={14} />
                  <a href={`tel:${a.phone}`} className="hover:text-primary truncate">
                    {a.phone}
                  </a>
                </div>
                <p className="text-xs text-muted-foreground">
                  Booked {new Date(a.booked_at).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
