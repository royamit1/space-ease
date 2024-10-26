import React from "react";
import {Parking} from "@/hooks/useParkingSpots";
import {ParkingSpotItem} from "@/components/parking-item";

interface ParkingListProps {
    addresses: Parking[];
    // setSelectedParking: React.Dispatch<React.SetStateAction<Parking | null>>;
    onParkingSpotClick: (parking: Parking) => void; // Add prop for click handler

}

export function ParkingList({addresses, onParkingSpotClick}: ParkingListProps) {
    return (
        <div className="flex-grow bg-gray-100 w-full p-3 overflow-y-auto h-60">
            <ul className="space-y-2">
                {addresses.map((address) => (
                    <li
                        key={address.id}
                        className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-gray-200"
                        onClick={() => onParkingSpotClick(address)} // Directly call setSelectedParking
                    >
                        <ParkingSpotItem parking={address}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}