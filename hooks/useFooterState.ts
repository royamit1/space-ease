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

type FooterMode = FooterModeCreate | FooterModeDetail | FooterModeSearch;

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