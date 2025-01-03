"use client"
import React from "react"
import { RentHistoryListItem } from "@/components/history-parking-item"
import { Skeleton } from "@/components/ui/skeleton"
import { useWallet } from "@/hooks/useWallet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { WalletListItem } from "./wallet-parking-item"

const LoadingSkeleton = () => (
    <li className="h-24 flex items-center mx-7 my-2">
        <Skeleton className="flex-shrink-0 rounded-lg p-3 h-12 w-12" />
        <div className="flex flex-col flex-grow space-y-2 pl-4">
            <Skeleton className="w-96 h-6" />
            <Skeleton className="w-48 h-4" />
        </div>
    </li>
)

export const WalletParkingList: React.FC = () => {
    const { data: walletHistory, error } = useWallet()

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    An error occurred while fetching parking spots. Please try again later.
                </AlertDescription>
            </Alert>
        )
    }

    if (walletHistory) {
        // Calculate the total money balance
        const totalBalance = walletHistory.reduce((sum, item) => sum + item.totalCost, 0)

        return (
            <div className="w-full">
                <ul className="flex-grow flex flex-col w-full p-4 overflow-y-auto space-y-2">
                    {walletHistory.map((walletHistory) => (
                        <WalletListItem key={walletHistory.id} rentHistory={walletHistory} />
                    ))}
                </ul>
                <div className="p-4 border-t border-gray-200 text-lg font-semibold">
                    Total Balance: ${totalBalance.toFixed(2)}
                </div>
            </div>
        )
    }

    return (
        <ul className="flex flex-col w-full overflow-y-hidden my-2">
            {Array.from({ length: 4 }).map((_, index) => (
                <LoadingSkeleton key={index} />
            ))}
        </ul>
    )
}
