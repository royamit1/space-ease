import React from "react";
import {Parking} from "@/components/search-footer";

interface ParkingListProps {
    addresses: Parking[];
    setSelectedParking: React.Dispatch<React.SetStateAction<Parking | null>>;
}

export function ParkingList({addresses, setSelectedParking}: ParkingListProps) {
    return (
        <div className="flex-grow bg-gray-100 w-full p-3 overflow-y-auto h-60">
            <ul className="space-y-2">
                {addresses.map((address) => (
                    <li
                        key={address.id}
                        className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-gray-200"
                        onClick={() => setSelectedParking(address)} // Directly call setSelectedParking
                    >
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold">{address.name}</h3>
                            <p className="text-gray-600 text-xs">{address.availability}</p>
                            <p className="text-gray-600 text-xs">Price: {address.price}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
