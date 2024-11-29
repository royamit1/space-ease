"use client"
import React from "react"
import { RentHistoryListItem } from "@/components/history-parking-item"
import { Skeleton } from "@/components/ui/skeleton"
import { useRentHistory } from "@/hooks/useRentHistory"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const LoadingSkeleton = () => (
    <>
        <li className="h-24 flex items-center mx-7 my-2">
            <Skeleton className="flex-shrink-0 rounded-lg p-3 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 " />
            <div className="flex flex-col flex-grow space-y-2 pl-4">
                <Skeleton className="w-36 h-4 sm:h-6 lg:h-8 sm:w-64 lg:w-96" />
                <Skeleton className="w-24 h-4 sm:h-6 lg:h-8 sm:w-48 lg:w-64" />
            </div>
        </li>
    </>
)

export const HistoryParkingList: React.FC = () => {
    const { data: rentHistory, error } = useRentHistory()

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

    if (rentHistory) {
        // Calculate the total money balance
        const totalBalance = rentHistory.reduce((sum, item) => sum + item.totalCost, 0)

        return (
            <div className="w-full">
                <ul className="flex-grow flex flex-col w-full p-4 overflow-y-auto space-y-3">
                    {rentHistory.map((history) => (
                        <RentHistoryListItem key={history.id} rentHistory={history} />
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
