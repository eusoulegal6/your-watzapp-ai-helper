import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const APPOINTMENTS_URL =
  "https://ocpphyjkstvfespxrajk.supabase.co/functions/v1/appointments-list";

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
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token;
        if (!token) throw new Error("Not authenticated");

        const res = await fetch(APPOINTMENTS_URL, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok || !json?.ok) {
          throw new Error(json?.error || `Request failed (${res.status})`);
        }
        setError(null);
        setItems((json.appointments ?? []) as Appointment[]);
      } catch (e: any) {
        if (cancelled) return;
        setError(e instanceof Error ? e : new Error(String(e)));
        setItems([]);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          setIsFetching(false);
        }
      }
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
