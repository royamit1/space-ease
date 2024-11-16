import React from "react";
import {RentalHistory} from "@/prisma/generated/client";
import {useFooterState} from "@/hooks/useFooterState";
import {ChevronRightIcon, MapPinIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

interface HistoryParkingSpotItemProps {
    historyParkingSpot: RentalHistory;
}

export const HistoryParkingSpotItem: React.FC<HistoryParkingSpotItemProps> = ({historyParkingSpot}) => {
    const [_, setFooterState] = useFooterState(state => null);

    const handleItemClick = () => {
        setFooterState({mode: {mode: "detail", id: historyParkingSpot.id}, size: "open"})
    };

    return (
        <li className="flex flex-row items-center space-x-4 bg-card rounded-lg p-3 cursor-pointer shadow-md"
            onClick={handleItemClick}>
            <div className="flex-shrink-0 bg-primary text-secondary-foreground rounded-full p-2">
                <MapPinIcon className="h-6 w-6 "/>
            </div>
            <div className="flex-grow">
                <h3 className="text-md font-semibold">{historyParkingSpot.totalCost.toFixed(2)}</h3>
                <span className="text-xs">{historyParkingSpot.parkingSpotId}</span><br/>
                <span className="text-xs">HELLO</span>
            </div>
            <div className="flex-shrink-0">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleItemClick}
                    className="rounded-full hover:bg-secondary/80"
                    aria-label="View parking spot details"
                >
                    <ChevronRightIcon className="h-5 w-5"/>
                </Button>
            </div>
        </li>
    );
};
