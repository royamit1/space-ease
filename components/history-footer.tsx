"use client"

import { HistoryParkingList } from "@/components/history-list"
import React from "react"
import { Separator } from "@/components/ui/separator"

export const HistoryFooter: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full">
            <h1 className="text-center text-3xl font-semibold first:mt-0 p-2">Rental History</h1>
            <Separator />
            <HistoryParkingList />
        </div>
    )
}
