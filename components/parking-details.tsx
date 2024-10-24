import SlidingButton from "@/components/sliding-button";
import React from "react";
import {Parking} from "@/components/search-footer";

export const ParkingDetails = ({selectedParking, handleSubmit, onClose}: {
    selectedParking: Parking | null,
    handleSubmit: () => void,
    onClose: () => void
}) => (
    <div className="ps-4 pe-4 w-full">
        <div className="w-full h-40 bg-gray-300 rounded-lg mb-4">
            <img src={selectedParking?.imageUrl} alt="Parking Spot" className="w-full h-full object-cover rounded-lg"/>
        </div>
        <h3 className="text-lg font-semibold mb-1">{selectedParking?.name}</h3>
        <p className="text-gray-600 mb-1">{selectedParking?.availability}</p>
        <p className="text-gray-600 mb-2">Price: {selectedParking?.price}</p>
        <textarea
            placeholder="Add a description here..."
            className="w-full p-2 border border-gray-300 rounded-md resize-none mb-4"
            rows={3}
        />
        <div className="flex justify-between">
            <SlidingButton onComplete={handleSubmit} buttonText="Book Now"/>
        </div>
        <p className="text-center text-sm m-6 cursor-pointer" onClick={onClose}>
            &times; Close
        </p>
    </div>
);