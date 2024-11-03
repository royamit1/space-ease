import React from "react";
import ParkingDetails from "@/components/parking-details";
import {useFooterState} from "@/hooks/useFooterState";
import {useParkingSpotById} from "@/hooks/useParkingSpots";


export const DetailFooter: React.FC = () => {
    const [selectedParkingId, setFooterState] = useFooterState(state => state.mode.mode === "detail" ? state.mode.id : null);
    const {data: parkingSpot, isLoading, error} = useParkingSpotById(selectedParkingId)

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!parkingSpot) {
        return <div>No parking spot found.</div>;
    }

    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            <div className="flex-grow overflow-y-auto">
                <ParkingDetails parkingSpot={parkingSpot}/>
            </div>

            <div className="flex-grow bg-gray-100 flex items-center justify-center">
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                    Rent Now
                </button>
            </div>
        </div>
    );
};
