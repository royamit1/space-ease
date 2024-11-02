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
        <ParkingDetails
            parkingSpot={parkingSpot}
        />
    );
};
