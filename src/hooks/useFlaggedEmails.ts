import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEND_SMART_URL, SEND_SMART_ANON_KEY } from "@/integrations/supabase/backend";

const REVIEW_LIST_URL = `${SEND_SMART_URL}/functions/v1/review-list`;

export interface FlaggedEmail {
  id: string;          // synthetic = `${provider}:${thread_id}`
  threadId: string;
  provider: string;
  createdAt: string;   // review_opened_at || updated_at
  senderEmail: string;
  senderName: string | null;
  subject: string;
  snippet: string;
  reason?: string;
  summary?: string;
  statusValue?: string;
  threadUrl?: string;
}

interface RawReviewItem {
  thread_id: string;
  provider: string;
  subject?: string | null;
  sender?: string | null;
  preview?: string | null;
  review_reason?: string | null;
  review_summary?: string | null;
  review_opened_at?: string | null;
  updated_at?: string | null;
  status_value?: string | null;
  thread_url?: string | null;
}

interface ReviewListResponse {
  items: RawReviewItem[];
}

function parseSender(raw: string | null | undefined): { email: string; name: string | null } {
  if (!raw) return { email: "Unknown sender", name: null };
  const m = raw.match(/^\s*(.+?)\s*<([^>]+)>\s*$/);
  if (m) return { name: m[1].replace(/^"|"$/g, "").trim() || null, email: m[2].trim() };
  return { email: raw.trim(), name: null };
}

export function useFlaggedEmails() {
  const query = useQuery({
    queryKey: ["review-list"],
    staleTime: 0,
    refetchOnWindowFocus: true,
    queryFn: async (): Promise<{ items: FlaggedEmail[] }> => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("Not signed in");

      const res = await fetch(REVIEW_LIST_URL, {
        method: "GET",
        headers: {
          apikey: SEND_SMART_ANON_KEY,
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!res.ok) {
        let message = `Request failed (${res.status})`;
        try {
          const body = await res.json();
          if (body?.error) message = body.error;
        } catch {
          // ignore
        }
        throw new Error(message);
      }

      const body = (await res.json()) as ReviewListResponse;
      const items = (body.items ?? [])
        .map<FlaggedEmail>((r) => {
          const sender = parseSender(r.sender);
          const createdAt = r.review_opened_at || r.updated_at || new Date().toISOString();
          return {
            id: `${r.provider}:${r.thread_id}`,
            threadId: r.thread_id,
            provider: r.provider,
            createdAt,
            senderEmail: sender.email,
            senderName: sender.name,
            subject: r.subject ?? "",
            snippet: r.preview ?? "",
            reason: r.review_reason ?? undefined,
            summary: r.review_summary ?? undefined,
            statusValue: r.status_value ?? undefined,
            threadUrl: r.thread_url ?? undefined,
          };
        })
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      return { items };
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
