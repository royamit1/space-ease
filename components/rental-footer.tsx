import React from "react";
import {useFooterState} from "@/hooks/useFooterState";
import {useParkingSpotById} from "@/hooks/useParkingSpots";
import {AlertCircle, Info} from "lucide-react";

export const RentalFooter: React.FC = () => {
    const [selectedParkingId, setFooterState] = useFooterState(state => state.mode.mode === "rent" ? state.mode.id : null);
    const {data: parkingSpot, isLoading, error} = useParkingSpotById(selectedParkingId);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-blue-50 text-blue-700 p-4 rounded-lg shadow-md">
                <span className="font-semibold">Loading...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-red-50 text-red-700 p-4 rounded-lg shadow-md">
                <AlertCircle className="w-6 h-6 mr-2 text-red-600" />
                <span className="font-semibold">Error:</span>
                <span className="ml-1">{error.message || "An unexpected error occurred."}</span>
            </div>
        );
    }

    if (!parkingSpot) {
        return (
            <div className="flex items-center justify-center h-screen bg-yellow-50 text-yellow-700 p-4 rounded-lg shadow-md">
                <Info className="w-6 h-6 mr-2 text-yellow-600" />
                <span className="font-semibold">Notice:</span>
                <span className="ml-1">No parking spot found.</span>
            </div>
        );
    }

    return (
        <div className="create-footer">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{parkingSpot.address}</h3>
        </div>
    );
};