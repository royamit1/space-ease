import React from 'react';
import SlidingButton from "@/components/sliding-button";
import {ParkingSpot} from "@prisma/client";

interface ParkingDetailsProps {
    parkingSpot: ParkingSpot;
    onClose: () => void;
    onSubmit: () => void;
}

const ParkingDetails: React.FC<ParkingDetailsProps> = ({parkingSpot, onClose, onSubmit}) => {
    return (
        <div className="ps-4 pe-4 w-full">
            <div className="w-full h-40 bg-gray-300 rounded-lg mb-4">
                {parkingSpot.imageUrl && (  // Only render image if available
                    <img src={parkingSpot.imageUrl} alt="Parking Spot"
                         className="w-full h-full object-cover rounded-lg"/>
                )}
            </div>
            <h3 className="text-lg font-semibold mb-1">{parkingSpot.address}</h3>
            <p className="text-gray-600 mb-1">from: {new Date(parkingSpot.startTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })} - {new Date(parkingSpot.endTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })}</p>
            <p className="text-gray-600 mb-2">Price: {parkingSpot.hourlyRate}</p>
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
