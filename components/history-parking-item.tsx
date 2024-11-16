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
        <li
            className="group relative flex items-center p-3 bg-card rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer hover:ring-2 hover:ring-primary/50"
            onClick={handleItemClick}
        >
            {/* Map Icon */}
            <div className="flex-shrink-0 bg-primary/80 text-secondary-foreground rounded-lg p-3">
                <MapPinIcon className="h-7 w-7 text-secondary" />
            </div>

            {/* Information Section */}
            <div className="flex flex-col flex-grow pl-4">
                <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary/90">
                    ${historyParkingSpot.totalCost.toFixed(2)}
                </h3>
                <div className="text-sm text-muted-foreground mt-1">
                    <span className="block font-medium">Parking Spot ID: {historyParkingSpot.parkingSpotId}</span>
                    <span className="text-xs">HELLO</span>
                </div>
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleItemClick}
                    className="group-hover:bg-secondary/20 rounded-full"
                    aria-label="View parking spot details"
                >
                    <ChevronRightIcon className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                </Button>
            </div>

            {/* Ripple Effect */}
            <span className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-500" />
        </li>
    );
};
