import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Appointment {
  id: string;
  thread_id: string | null;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  booked_at: string;
  created_at?: string;
}

export function useAppointments() {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState<Appointment[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIsLoading(false);
      setError(new Error("Please sign in to view appointments."));
      return;
    }

    let cancelled = false;
    (async () => {
      setIsFetching(true);
      const { data, error } = await (supabase as any)
        .from("appointments")
        .select("id, name, phone, service, date, time, booked_at, thread_id, created_at")
        .order("booked_at", { ascending: false });

      if (cancelled) return;
      if (error) {
        setError(new Error(error.message));
        setItems([]);
      } else {
        setError(null);
        setItems((data ?? []) as Appointment[]);
      }
      setIsLoading(false);
      setIsFetching(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user?.id, reloadKey]);

  return {
    items,
    isLoading,
    error,
    isFetching,
    refetch: () => setReloadKey((k) => k + 1),
  };
}
