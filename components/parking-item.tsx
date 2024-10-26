import React from "react";
import {Parking} from "@/hooks/useParkingSpots";

interface ParkingSpotItemProps {
    parking: Parking;
}

export const ParkingSpotItem: React.FC<ParkingSpotItemProps> = ({parking}) => {
    return (
        <div>
            <h3 className="text-sm font-semibold">{parking.name}</h3>
            <p className="text-gray-600 text-xs">{parking.availability}</p>
            <p className="text-gray-600 text-xs">Price: {parking.price}</p>
        </div>
    );
};
