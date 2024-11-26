import { create } from "@/app/zustand-next"
import { ParkingSpotFilters } from "@/utils/types"

interface FooterModeCreate {
    mode: "create"
}

interface FooterModeDetail {
    mode: "detail"
    id: number
}

interface FooterModeSearch {
    mode: "search"
}

interface FooterModeHistory {
    mode: "history"
}

type FooterMode = FooterModeCreate | FooterModeDetail | FooterModeSearch | FooterModeHistory

interface FooterState {
    mode: FooterMode
    size: "collapsed" | "open" | "full"
    filters: ParkingSpotFilters
}

const store = create<FooterState>(() => ({
    mode: { mode: "search" },
    size: "collapsed",
    filters: {},
}))

export const useFooterStore = store.useStore
export const useFooterState = store.useState
export const FooterStoreProvider = store.StoreProvider
