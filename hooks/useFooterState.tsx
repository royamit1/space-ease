import { create } from "@/app/zustand-next"

interface FooterModeCreate {
  mode: "create";
}

interface FooterModeDetail {
  mode: "detail";
  id: number;
}

interface FooterModeSearch {
  mode: "search";
}

export interface FooterFilters {
  distance?: number;
  price?: number;
  availability?: Boolean;
}

type FooterMode = FooterModeCreate | FooterModeDetail | FooterModeSearch;

interface FooterState {
  mode: FooterMode;
  size: "collapsed" | "open" | "full";
  setModeAndSize: (mode: FooterMode, size: FooterState["size"]) => void;
}

const store = create<FooterState>((set) => ({
  mode: { mode: "search" },
  size: "collapsed",
  setModeAndSize: (mode, size) => set({ mode, size }),
}));

export const useFooterStore = store.useStore;
export const useFooterState = store.useState;
export const FooterStoreProvider = store.StoreProvider;