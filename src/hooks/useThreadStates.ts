import { useQuery } from "@tanstack/react-query";
import { callBackend, BackendUnavailableError } from "@/lib/sendSmartBackend";

export interface ThreadState {
  id: string;
  provider: string;
  thread_id: string;
  subject: string | null;
  sender_email: string | null;
  sender_name: string | null;
  preview: string | null;
  status_value: string;
  review_active: boolean;
  review_summary: string | null;
  review_reason: string | null;
  thread_url: string | null;
  source_url: string | null;
  last_event_at: string;
  last_event_type: string | null;
}

interface ThreadStatesResponse {
  items: ThreadState[];
}

export function useThreadStates(opts?: { onlyReview?: boolean }) {
  const onlyReview = opts?.onlyReview ?? false;

  const query = useQuery<ThreadStatesResponse>({
    queryKey: ["thread-states", { onlyReview }],
    // Stop polling/retrying once we know the backend isn't ready yet.
    refetchInterval: (q) =>
      q.state.error instanceof BackendUnavailableError ? false : 10_000,
    refetchOnWindowFocus: (q) =>
      !(q.state.error instanceof BackendUnavailableError),
    retry: (failureCount, err) =>
      err instanceof BackendUnavailableError ? false : failureCount < 1,
    staleTime: 5_000,
    queryFn: () =>
      callBackend<ThreadStatesResponse>("thread-states-list", {
        method: "GET",
        query: onlyReview ? { review: "active" } : undefined,
      }),
  });

  const items = query.data?.items ?? [];
  const reviewItems = items.filter(
    (i) => i.review_active && i.status_value === "review_ready",
  );

  return {
    items,
    reviewItems,
    reviewCount: reviewItems.length,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}
