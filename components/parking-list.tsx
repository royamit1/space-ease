'use client';
import React from "react";
import {ParkingSpotItem} from "@/components/parking-item";
import {useParkingSpots} from "@/hooks/useParkingSpots";
import {ParkingSpotFilters} from "@/app/actions";
import {AlertCircle} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

interface ParkingListProps {
    filters: ParkingSpotFilters
}

export const ParkingList: React.FC<ParkingListProps> = ({ filters }) => {
    const {data: parkingSpots, error} = useParkingSpots(filters);

    if (error) {
        return <Alert variant="destructive">
            <AlertCircle className="h-4 w-4"/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                An error occurred while fetching parking spots. Please try again later.
            </AlertDescription>
        </Alert>
    }
    if (parkingSpots) {
        return (
            <ul className="flex-grow flex flex-col w-full p-4 overflow-y-auto space-y-3">
                {parkingSpots.map((spot) => (
                    <ParkingSpotItem
                        key={spot.id}
                        spot={spot}
                    />
                ))}
            </ul>
        )
    }

    return <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 font-medium">Loading, please wait...</span>
    </div>
};