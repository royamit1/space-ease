"use client"

import { HistoryParkingList } from "@/components/history-list"
import React from "react"
import { Separator } from "@/components/ui/separator"
import { WalletParkingList } from "./wallet-list"

export const WalletFooter: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full">
            <h1 className="text-center text-3xl font-semibold first:mt-0 p-2">My Wallet</h1>
            <Separator />
            <WalletParkingList />
        </div>
    )
}
