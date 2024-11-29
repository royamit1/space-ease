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

interface FooterModeWallet {
    mode: "wallet"
}

type FooterMode = FooterModeCreate | FooterModeDetail | FooterModeSearch | FooterModeHistory | FooterModeWallet

interface FooterState {
    mode: FooterMode
    size: "collapsed" | "open" | "full"
    filters: ParkingSpotFilters
}

const store = create<FooterState>(() => ({
    mode: { mode: "search" },
    size: "collapsed",
    filters: {
        bounds: {
            north: 0,
            south: 0,
            east: 0,
            west: 0,
        },
    },
}))

export const useFooterStore = store.useStore
export const useFooterState = store.useState
export const FooterStoreProvider = store.StoreProvider
