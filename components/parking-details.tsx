import React from 'react';
import {ParkingSpot} from "@/prisma/generated/client";
import {FaClock, FaDollarSign, FaInfoCircle} from 'react-icons/fa';

interface ParkingDetailsProps {
    parkingSpot: ParkingSpot;
}

const ParkingDetails: React.FC<ParkingDetailsProps> = ({parkingSpot}) => {
    return (
        <div className="space-y-2 p-2">
            <h3 className="text-3xl font-semibold mb-4 text-[var(--foreground)]">{parkingSpot.address}</h3>
            <div
                className="flex items-center space-x-3 bg-[var(--secondary)] rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow duration-200">
                <FaClock className="text-[var(--primary)] w-5 h-5"/>
                <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
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
            <div
                className="flex items-center space-x-3 bg-[var(--accent)] rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow duration-200">
                <FaDollarSign className="text-[var(--primary)] w-5 h-5"/>
                <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                        {parkingSpot.hourlyRate.toFixed(2)}
                    </p>
                </div>
            </div>
            <div className="bg-[var(--muted)] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <h4 className="text-lg font-semibold text-[var(--foreground)] flex items-center mb-2">
                    <FaInfoCircle className="text-[var(--primary)] w-5 h-5 mr-2"/>
                    Description
                </h4>
                <p className="text-sm text-[var(--muted-foreground)]">{parkingSpot.description || "No description provided."}</p>
            </div>
        </div>
    );
};

export default ParkingDetails;
