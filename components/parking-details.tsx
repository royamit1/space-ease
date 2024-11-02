import React from 'react';
import {ParkingSpot} from "@/prisma/generated/client";
import {FaClock, FaDollarSign, FaInfoCircle} from 'react-icons/fa';

interface ParkingDetailsProps {
    parkingSpot: ParkingSpot;
}

const ParkingDetails: React.FC<ParkingDetailsProps> = ({parkingSpot}) => {
    return (
        <div className="ps-4 pe-4 w-full space-y-5">
            {/*<div className="w-full h-40 bg-gray-300 rounded-lg mb-4">*/}
            {/*    {parkingSpot.imageUrl && (  // Only render image if available*/}
            {/*        <img src={parkingSpot.imageUrl} alt="Parking Spot"*/}
            {/*             className="w-full h-full object-cover rounded-lg"/>*/}
            {/*    )}*/}
            {/*</div>*/}
            <h3 className="text-xl font-semibold mb-3">{parkingSpot.address}</h3>
            <div className="flex items-center space-x-4">
                <div className="bg-blue-100 rounded-full p-2">
                    <FaClock className="text-blue-600 w-4 h-4"/>
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-medium">Available Time</p>
                    <p className="text-sm font-semibold text-gray-800">
                        {new Date(parkingSpot.startTime).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })} - {new Date(parkingSpot.endTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                    </p>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="bg-green-100 rounded-full p-2">
                    <FaDollarSign className="text-green-600 w-4 h-4"/>
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-medium">Hourly Rate</p>
                    <p className="text-sm font-semibold text-gray-800">
                        ${parkingSpot.hourlyRate}
                    </p>
                </div>
            </div>

            <hr className="my-4 border-gray-300"/>

            <div className="overflow-y-auto max-h-48">
                <h4 className="text flex items-center">
                    <FaInfoCircle className="text-gray-400 mr-2"/>
                    Description:
                </h4>
                <p className="text-gray-800">{parkingSpot.description}</p>
            </div>
        </div>
    );
};

export default ParkingDetails;
