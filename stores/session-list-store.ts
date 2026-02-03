import { create } from "zustand";
import { SessionListItem } from "@/types";

export type SortField = "startedAt" | "severity";
export type SortDirection = "asc" | "desc";

export interface SessionFilters {
  jsErrors: boolean;
  failedRequests: boolean;
  pendingRequests: boolean;
  rageClicks: boolean;
  deadClicks: boolean;
  corrupted: boolean;
  routeFilter: string;
  routeFilterIsRegex: boolean;
}

export interface SessionListState {
  filters: SessionFilters;
  sortField: SortField;
  sortDirection: SortDirection;
  scrollPosition: number;
  setFilters: (filters: Partial<SessionFilters>) => void;
  setSort: (field: SortField, direction: SortDirection) => void;
  setScrollPosition: (position: number) => void;
  reset: () => void;
}

const defaultFilters: SessionFilters = {
  jsErrors: false,
  failedRequests: false,
  pendingRequests: false,
  rageClicks: false,
  deadClicks: false,
  corrupted: false,
  routeFilter: "",
  routeFilterIsRegex: false,
};

export const useSessionListStore = create<SessionListState>((set) => ({
  filters: defaultFilters,
  sortField: "startedAt",
  sortDirection: "desc",
  scrollPosition: 0,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  setSort: (field, direction) =>
    set({ sortField: field, sortDirection: direction }),
  setScrollPosition: (position) => set({ scrollPosition: position }),
  reset: () =>
    set({
      filters: defaultFilters,
      sortField: "startedAt",
      sortDirection: "desc",
      scrollPosition: 0,
    }),
}));
