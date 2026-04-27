import { useQuery } from "@tanstack/react-query";
import { callBackend, BackendUnavailableError } from "@/lib/sendSmartBackend";

export interface ThreadHistoryEntry {
  id: string;
  thread_state_id: string;
  event_type: string;
  decision: string | null;
  occurred_at: string;
  subject: string | null;
  sender_email: string | null;
  sender_name: string | null;
  provider: string | null;
  thread_url: string | null;
}

interface ThreadHistoryResponse {
  items: ThreadHistoryEntry[];
}

export function useThreadHistory(limit = 25) {
  const query = useQuery<ThreadHistoryResponse>({
    queryKey: ["thread-history", { limit }],
    refetchInterval: (q) =>
      q.state.error instanceof BackendUnavailableError ? false : 10_000,
    refetchOnWindowFocus: (q) =>
      !(q.state.error instanceof BackendUnavailableError),
    retry: (failureCount, err) =>
      err instanceof BackendUnavailableError ? false : failureCount < 1,
    staleTime: 5_000,
    queryFn: () =>
      callBackend<ThreadHistoryResponse>("thread-history-list", {
        method: "GET",
        query: { limit },
      }),
  });

  return {
    items: query.data?.items ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}
