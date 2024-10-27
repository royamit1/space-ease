import React from "react";
import {ParkingSpot} from "@prisma/client";

interface ParkingSpotItemProps {
    spot: ParkingSpot;
    setSelectedParking: (spot: ParkingSpot) => void;
}

export function ParkingSpotItem({spot, setSelectedParking}: ParkingSpotItemProps) {
    return (
        <li
            className="bg-white shadow-md p-4 rounded-lg flex items-start gap-4 cursor-pointer hover:bg-gray-200 transition duration-200"
            onClick={() => setSelectedParking(spot)}
        >
            <div className="flex-1">
                <h3 className="text-md font-semibold ">{spot.address}</h3>
                <p className="text-gray-600 text-xs">Hourly Rate: ${spot.hourlyRate}</p>
                <p className="text-gray-600 text-xs">
                    Available from: {new Date(spot.startTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false // Use 24-hour format
                })} - {new Date(spot.endTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false // Use 24-hour format
                })}
                </p>
            </div>
        </li>
    );
}
