import React from 'react';
import SlidingButton from "@/components/sliding-button";
import {Parking} from "@/hooks/useParkingSpots";

interface ParkingDetailsProps {
    parking: Parking;
    onClose: () => void;
    onSubmit: () => void;
}

const ParkingDetails: React.FC<ParkingDetailsProps> = ({parking, onClose, onSubmit}) => {
    return (
        <div className="ps-4 pe-4 w-full">
            <div className="w-full h-40 bg-gray-300 rounded-lg mb-4">
                {parking.imageUrl && (  // Only render image if available
                    <img src={parking.imageUrl} alt="Parking Spot" className="w-full h-full object-cover rounded-lg"/>
                )}
            </div>
            <h3 className="text-lg font-semibold mb-1">{parking.name}</h3>
            <p className="text-gray-600 mb-1">{parking.availability}</p>
            <p className="text-gray-600 mb-2">Price: {parking.price}</p>
            <textarea
                placeholder="Add a description here..."
                className="w-full p-2 border border-gray-300 rounded-md resize-none mb-4"
                rows={3}
            />
            <div className="flex justify-between">
                <SlidingButton onComplete={onSubmit} buttonText="Book Now"/>
            </div>
            <p className="text-center text-sm m-6 cursor-pointer" onClick={onClose}>
                &times; Close
            </p>
        </div>
    );
};

export default ParkingDetails;
