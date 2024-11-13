import React from "react";
import {ParkingSpot} from "@/prisma/generated/client";
import {useFooterState} from "@/hooks/useFooterState";
import {CarIcon, ChevronRightIcon, MapPinIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface ParkingSpotItemProps {
    spot: ParkingSpot;
}

export const ParkingSpotItem: React.FC<ParkingSpotItemProps> = ({spot}) => {
    const [_, setFooterState] = useFooterState(state => null);

    const handleItemClick = () => {
        setFooterState({mode: {mode: "detail", id: spot.id}, size: "open"})
    };

    return (
        <li className="flex flex-row items-center space-x-4 bg-card rounded-lg p-3 cursor-pointer shadow-md"
            onClick={handleItemClick}>
            <div className="flex-shrink-0 bg-primary text-secondary-foreground rounded-full p-2">
                <MapPinIcon className="h-6 w-6 "/>
            </div>
            <div className="flex-grow">
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
            <Button
                onClick={handleItemClick}
                className={cn(
                    "bg-primary rounded-full p-2",
                    "focus:outline-none focus:ring-2"
                )}
                aria-label="View Details"
            >
                <div className="flex items-center justify-center bg-white rounded-full w-6 h-6 font-bold">
                    P
                </div> {/* Parking symbol */}
            </Button>
        </li>
    );
};
