import React from 'react';
import {ParkingSpot} from "@/prisma/generated/client";
import {FaClock, FaDollarSign, FaInfoCircle} from 'react-icons/fa';

interface ParkingDetailsProps {
    parkingSpot: ParkingSpot;
}

const ParkingDetails: React.FC<ParkingDetailsProps> = ({parkingSpot}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ps-4 pe-4 pb-5">
            <h3 className="text-xl font-semibold mb-2">{parkingSpot.address}</h3>
            <div className="bg-blue-50 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                {/*<div className="w-full h-40 bg-gray-300 rounded-lg mb-4">*/}
                {/*    {parkingSpot.imageUrl && (  // Only render image if available*/}
                {/*        <img src={parkingSpot.imageUrl} alt="Parking Spot"*/}
                {/*             className="w-full h-full object-cover rounded-lg"/>*/}
                {/*    )}*/}
                {/*</div>*/}
                <div className="flex items-center space-x-2">
                    <FaClock className="text-blue-600 w-5 h-5"/>
                    <div>
                        <p className="text-xs text-gray-600 font-medium">Available Time</p>
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
            </div>

            <div className="bg-green-50 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center space-x-2">
                    <FaDollarSign className="text-green-600 w-5 h-5"/>
                    <div>
                        <p className="text-xs text-gray-600 font-medium">Hourly Rate</p>
                        <p className="text-sm font-semibold text-gray-800">
                            ${parkingSpot.hourlyRate}
                        </p>
                    </div>
                </div>
            </div>

            <div
                className="bg-yellow-50 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 col-span-1 md:col-span-2">
                <h4 className="font-semibold text-gray-800 flex items-center mb-2">
                    <FaInfoCircle className="text-yellow-400 w-5 h-5 mr-2"/>
                    Description:
                </h4>
                <p className="text-gray-700">{parkingSpot.description}</p>
            </div>
        </div>
    );
};

export default ParkingDetails;
