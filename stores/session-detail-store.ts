import { create } from "zustand";
import { EventCategory, Event } from "@/types";

export interface SessionDetailState {
  enabledCategories: Set<EventCategory>;
  selectedEvent: Event | null;
  scrollPosition: number;
  toggleCategory: (category: EventCategory) => void;
  setSelectedEvent: (event: Event | null) => void;
  setScrollPosition: (position: number) => void;
  reset: () => void;
}

const allCategories: EventCategory[] = [
  "Navigation",
  "UI",
  "Network",
  "Errors",
  "Performance",
  "Unknown",
];

export const useSessionDetailStore = create<SessionDetailState>((set) => ({
  enabledCategories: new Set(allCategories),
  selectedEvent: null,
  scrollPosition: 0,
  toggleCategory: (category) =>
    set((state) => {
      const newCategories = new Set(state.enabledCategories);
      if (newCategories.has(category)) {
        newCategories.delete(category);
      } else {
        newCategories.add(category);
      }
      return { enabledCategories: newCategories };
    }),
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  setScrollPosition: (position) => set({ scrollPosition: position }),
  reset: () =>
    set({
      enabledCategories: new Set(allCategories),
      selectedEvent: null,
      scrollPosition: 0,
    }),
}));
