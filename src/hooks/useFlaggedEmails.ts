import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const SEND_SMART_URL =
  "https://ocpphyjkstvfespxrajk.supabase.co/functions/v1/review-list";
const SEND_SMART_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jcHBoeWprc3R2ZmVzcHhyYWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxODExMzUsImV4cCI6MjA5Mjc1NzEzNX0.wcqrpSVkgDZRPet_4yLcF5YYISsWqRacVNOHf_eW8uY";

export interface FlaggedEmail {
  id: string;
  createdAt: string;
  senderEmail: string;
  senderName: string | null;
  subject: string;
  snippet: string;
  reason?: string;
}

interface FlaggedEmailsResponse {
  items: FlaggedEmail[];
}

export function useFlaggedEmails() {
  const query = useQuery<FlaggedEmailsResponse>({
    queryKey: ["flagged-emails"],
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    retry: false,
    queryFn: async () => {
      // Flagged-emails edge function lives on a different backend that
      // cannot validate this project's auth tokens. Return empty until
      // the function is migrated to this project's Cloud.
      return { items: [] };
    },
  });

  return {
    items: query.data?.items ?? [],
    isLoading: query.isLoading,
    error: query.error as Error | null,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
}
