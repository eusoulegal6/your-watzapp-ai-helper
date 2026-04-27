import { useMutation, useQueryClient } from "@tanstack/react-query";
import { callBackend } from "@/lib/sendSmartBackend";
import type { ThreadState } from "./useThreadStates";

interface ThreadStatesCache {
  items: ThreadState[];
}

/**
 * Marks a thread as resolved by sending a `review_resolved` event to the
 * backend's sync-thread-state function. Optimistically removes the row from
 * the local "in review" list.
 */
export function useResolveThreadReview() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (threadStateId: string) => {
      await callBackend("sync-thread-state", {
        method: "POST",
        body: {
          thread_state_id: threadStateId,
          event_type: "review_resolved",
          review_active: false,
          status_value: "resolved",
        },
      });
      return threadStateId;
    },
    onMutate: async (threadStateId) => {
      const keys = [
        ["thread-states", { onlyReview: false }],
        ["thread-states", { onlyReview: true }],
      ] as const;

      await Promise.all(keys.map((k) => qc.cancelQueries({ queryKey: k })));

      const snapshots = keys.map((k) => ({
        key: k,
        data: qc.getQueryData<ThreadStatesCache>(k),
      }));

      for (const { key, data } of snapshots) {
        if (!data) continue;
        qc.setQueryData<ThreadStatesCache>(key, {
          ...data,
          items: data.items.map((i) =>
            i.id === threadStateId
              ? { ...i, review_active: false, status_value: "resolved" }
              : i,
          ),
        });
      }

      return { snapshots };
    },
    onError: (_err, _id, ctx) => {
      ctx?.snapshots?.forEach(({ key, data }) => {
        if (data) qc.setQueryData(key, data);
      });
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["thread-states"] });
      qc.invalidateQueries({ queryKey: ["thread-history"] });
    },
  });
}
