import React, { useEffect } from "react"
import { useFooterState } from "@/hooks/useFooterState"
import { CreateFooter } from "@/components/create-footer"
import { DetailFooter } from "@/components/detail-footer"
import { SearchFooter } from "@/components/search-footer"
import { RentalFooter } from "@/components/rental-footer"
import { HistoryFooter } from "@/components/history-footer"
import { useActiveRent } from "@/hooks/useActiveRent"
import { WalletFooter } from "./wallet-footer"

export const FooterContent: React.FC = () => {
    const [footerMode, setFooterState] = useFooterState((state) => state.mode)
    const activeRent = useActiveRent()

    useEffect(() => {
        if (activeRent.data)
            setFooterState((state) => ({
                size: state.size !== "collapsed" ? "open" : "collapsed",
            }))
    }, [activeRent.data])

    if (activeRent.data) {
        return <RentalFooter activeRent={activeRent.data} />
    }

    switch (footerMode.mode) {
        case "create":
            return <CreateFooter />
        case "detail":
            return <DetailFooter selectedParkingSpot={footerMode.id} />
        case "search":
            return <SearchFooter />
        case "history":
            return <HistoryFooter />
        case "wallet":
            return <WalletFooter />
    }
}
