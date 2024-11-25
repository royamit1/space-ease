"use client"

import { HistoryParkingList } from "@/components/history-list"
import React from "react"
import GradualSpacing from "@/components/ui/gradual-spacing"
import { Separator } from "@/components/ui/separator"

export const HistoryFooter: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="p-3">
                <GradualSpacing
                    className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight"
                    text="History of Parking Spots"
                    delayMultiple={0.03}
                />
            </div>
            <Separator />
            <HistoryParkingList />
        </div>
    )
}
