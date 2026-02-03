import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getSessionList, getSessionDetails } from "./endpoints";
import { SessionListItem, SessionDetails } from "@/types";

export function useSessionList(limit: number = 50) {
  return useInfiniteQuery({
    queryKey: ["sessions", limit],
    queryFn: ({ pageParam = 1 }) => getSessionList(pageParam, limit),
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.total / lastPage.limit);
      const nextPage = lastPage.page + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useSessionDetails(id: string) {
  return useQuery({
    queryKey: ["session", id],
    queryFn: () => getSessionDetails(id),
    enabled: !!id,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
