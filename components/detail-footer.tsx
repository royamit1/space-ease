import React, {useState} from "react";
import ParkingDetails from "@/components/parking-details";
import {useFooterState} from "@/hooks/useFooterState";
import {useParkingSpotById} from "@/hooks/useParkingSpots";
import {AlertCircle, Info} from "lucide-react";
import {ConfirmationButton} from "@/components/common/confirmation-button";
import {startRenting} from "@/app/actions";
import {useQueryClient} from "@tanstack/react-query";

export const DetailFooter: React.FC = () => {
    const [selectedParkingId] = useFooterState(state => state.mode.mode === "detail" ? state.mode.id : null);
    const queryClient = useQueryClient()
    const {data: parkingSpot, isLoading, error} = useParkingSpotById(selectedParkingId)

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600 font-medium">Loading, please wait...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-red-50 text-red-700 p-4 rounded-lg shadow-md">
                <AlertCircle className="w-6 h-6 mr-2 text-red-600"/>
                <span className="font-semibold">Error:</span>
                <span className="ml-1">{error.message || "An unexpected error occurred."}</span>
            </div>
        );
    }

    if (!parkingSpot) {
        return (
            <div
                className="flex items-center justify-center h-screen bg-yellow-50 text-yellow-700 p-4 rounded-lg shadow-md">
                <Info className="w-6 h-6 mr-2 text-yellow-600"/>
                <span className="font-semibold">Notice:</span>
                <span className="ml-1">No parking spot found.</span>
            </div>
        );
    }

    const handleRent = async () => {
        try {
            await startRenting(parkingSpot.id)
        } catch (err) {
            console.error(err)
            return
        }
        await queryClient.invalidateQueries({ queryKey: ["activeRent"] })
    };

    return (
        <div className="flex flex-col space-y-2 h-full p-5">
            <ParkingDetails parkingSpot={parkingSpot}/>
            <div className="flex-grow"/>
            <ConfirmationButton
                className="w-full"
                onClick={handleRent}
            >
                Rent Now
            </ConfirmationButton>
        </div>
    );
};
