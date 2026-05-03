import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { sendSmartBackend, SEND_SMART_URL, SEND_SMART_ANON_KEY } from "@/integrations/supabase/backend";

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
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["appointments"],
    staleTime: 30_000,
    queryFn: async (): Promise<Appointment[]> => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("Not signed in");

      // Bridge dashboard JWT into send-smart backend client for RLS
      const res = await fetch(
        `${SEND_SMART_URL}/rest/v1/appointments?select=*&order=booked_at.desc`,
        {
          headers: {
            apikey: SEND_SMART_ANON_KEY,
            Authorization: `Bearer ${session.access_token}`,
          },
        },
      );
      if (!res.ok) {
        let msg = `Request failed (${res.status})`;
        try {
          const b = await res.json();
          if (b?.message) msg = b.message;
        } catch {}
        throw new Error(msg);
      }
      return (await res.json()) as Appointment[];
    },
  });

  // Realtime: refresh when appointments change
  useEffect(() => {
    let cancelled = false;
    let channel: ReturnType<typeof sendSmartBackend.channel> | null = null;
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (cancelled || !session) return;
      try {
        await sendSmartBackend.realtime.setAuth(session.access_token);
      } catch {}
      channel = sendSmartBackend
        .channel(`appointments:${session.user.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "appointments",
            filter: `user_id=eq.${session.user.id}`,
          },
          () => qc.invalidateQueries({ queryKey: ["appointments"] }),
        )
        .subscribe();
    })();
    return () => {
      cancelled = true;
      if (channel) sendSmartBackend.removeChannel(channel);
    };
  }, [qc]);

  return {
    items: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error as Error | null,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
}
