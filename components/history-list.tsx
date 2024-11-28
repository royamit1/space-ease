"use client"
import React from "react"
import { HistoryParkingSpotItem } from "@/components/history-parking-item"
import { Skeleton } from "@/components/ui/skeleton"
import { useRentHistory } from "@/hooks/useRentHistory"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const LoadingSkeleton = () => (
    <>
        <li className="h-24 flex items-center mx-7 my-2">
            <Skeleton className="flex-shrink-0 rounded-lg p-3 h-12 w-12" />
            <div className="flex flex-col flex-grow space-y-2 pl-4">
                <Skeleton className="w-96 h-6" />
                <Skeleton className="w-48 h-4" />
            </div>
        </li>
    </>
)

export const HistoryParkingList: React.FC = () => {
    const { data: parkingSpots, error } = useRentHistory()

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
    if (parkingSpots) {
        return (
            <ul className="flex-grow flex flex-col w-full p-4 overflow-y-auto space-y-3">
                {parkingSpots.map((historyParkingSpot) => (
                    <HistoryParkingSpotItem key={historyParkingSpot.id} historyParkingSpot={historyParkingSpot} />
                ))}
            </ul>
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
