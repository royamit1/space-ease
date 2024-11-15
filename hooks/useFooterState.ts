import {create} from "@/app/zustand-next"

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

interface FooterModeRent {
    mode: "rent";
    id: number;
}

type FooterMode = FooterModeCreate | FooterModeDetail | FooterModeSearch | FooterModeRent;

interface FooterState {
    mode: FooterMode;
    size: "collapsed" | "open" | "full";
}

const store = create<FooterState>(() => ({
    mode: { mode: "search" },
    size: "collapsed",
}));

export const useFooterStore = store.useStore;
export const useFooterState = store.useState;
export const FooterStoreProvider = store.StoreProvider;