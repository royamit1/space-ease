import React from "react";
import {Parking} from "@/components/search-footer";


export const ParkingList = ({addresses, onParkingClick}: {
    addresses: Parking[],
    onParkingClick: (parking: Parking) => void
}) => (
    <div className="flex-grow bg-gray-100 w-full p-3 overflow-y-auto h-60">
        <ul className="space-y-2">
            {addresses.map(address => (
                <li
                    key={address.id}
                    className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-gray-200"
                    onClick={() => onParkingClick(address)}
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