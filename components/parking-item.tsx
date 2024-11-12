import React from "react";
import {ParkingSpot} from "@/prisma/generated/client";
import {useFooterState} from "@/hooks/useFooterState";

interface ParkingSpotItemProps {
    spot: ParkingSpot;
}

export const ParkingSpotItem: React.FC<ParkingSpotItemProps> = ({spot}) => {
    const [_, setFooterState] = useFooterState(state => null);

    const handleItemClick = () => {
        setFooterState({mode: {mode: "detail", id: spot.id}, size: "open"})
    };

    return (
        <li
            className="shadow-md rounded-lg flex items-start gap-4 cursor-pointer"
            onClick={handleItemClick}
        >
            <div>
                <h3 className="text-md font-semibold">{spot.address}</h3>
                <span className="text-xs">Hourly Rate: ${spot.hourlyRate}</span><br/>
                <span className="text-xs">
                    Available from: {new Date(spot.startTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false // Use 24-hour format
                })} - {new Date(spot.endTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false // Use 24-hour format
                })}
                </span>
            </div>
        </li>
    );
};
