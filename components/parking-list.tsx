"use client"
import React from "react"
import { ParkingSpotItem } from "@/components/parking-item"
import { useParkingSpots } from "@/hooks/useParkingSpots"
import { ParkingSpotFilters } from "@/utils/types"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { calculateDistance } from "@/utils/utils"

interface ParkingListProps {
    filters: ParkingSpotFilters
}

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

export const ParkingList: React.FC<ParkingListProps> = ({ filters }) => {
    const { data: parkingSpots, error } = useParkingSpots(filters)

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
        const { latitude, longitude, maxDistance } = filters

        // Add calculated distance to each spot
        const enrichedSpots =
            latitude && longitude
                ? parkingSpots.map((spot) => ({
                      ...spot,
                      distance: calculateDistance(latitude, longitude, spot.latitude, spot.longitude),
                  }))
                : parkingSpots.map((spot) => ({ ...spot, distance: null })) // Set distance to null if user's location is unavailable

        const filteredSpots = maxDistance
            ? enrichedSpots.filter((spot) => spot.distance !== null && spot.distance <= maxDistance)
            : enrichedSpots

        return (
            <ul className="flex flex-col w-full p-4 overflow-y-auto space-y-3">
                {filteredSpots.map((spot) => (
                    <ParkingSpotItem key={spot.id} spot={spot} />
                ))}
            </ul>
        )
    }

    return (
        <ul className="flex flex-col w-full overflow-y-hidden my-2">
            {Array.from({ length: 4 }).map((_, index) => (
                <LoadingSkeleton key={index} /> // Add a key here
            ))}
        </ul>
    )
}
