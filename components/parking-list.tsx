import React from "react";
import {ParkingSpot} from "@prisma/client";

interface ParkingListProps {
    parkingSpots: ParkingSpot[];
    setSelectedParking: React.Dispatch<React.SetStateAction<ParkingSpot | null>>;
}

export function ParkingList({parkingSpots, setSelectedParking}: ParkingListProps) {
    return (
        <div className="flex-grow bg-gray-100 w-full p-3 overflow-y-auto h-60">
            <ul className="space-y-2">
                {parkingSpots.map((ParkingSpot) => (
                    <li
                        key={ParkingSpot.id}
                        className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-gray-200"
                        onClick={() => setSelectedParking(ParkingSpot)} // Directly call setSelectedParking
                    >
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold">{ParkingSpot.address}</h3>
                            <p className="text-gray-600 text-xs"> Available
                                from: {new Date(ParkingSpot.startTime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })} - {new Date(ParkingSpot.endTime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                            <p className="text-gray-600 text-xs">Price: {ParkingSpot.hourlyRate}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
