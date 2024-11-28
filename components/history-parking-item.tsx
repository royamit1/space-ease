import React from "react"
import { useFooterStore } from "@/hooks/useFooterState"
import { ChevronRightIcon, MapPinIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RentalHistoryListItem } from "@/hooks/useRentHistory"

interface HistoryParkingSpotItemProps {
    rentHistory: RentalHistoryListItem
}

export const RentHistoryListItem: React.FC<HistoryParkingSpotItemProps> = ({ rentHistory }) => {
    const footerStore = useFooterStore()

    const handleItemClick = () => {
        footerStore.setState({
            mode: { mode: "detail", id: rentHistory.parkingSpotId },
            size: "open",
        })
    }

    return (
        <li
            className="group relative flex items-center p-2 sm:p-3 md:p-4 bg-card rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer hover:ring-2 hover:ring-primary/50 h-20 sm:h-24 md:h-28 lg:h-32"
            onClick={handleItemClick}
        >
            {/* Map Icon */}
            <div className="flex-shrink-0 bg-primary/80 text-secondary-foreground rounded-lg p-2 sm:p-3 md:p-4">
                <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-secondary" />
            </div>

            {/* Information Section */}
            <div className="flex flex-col flex-grow pl-3 sm:pl-4 md:pl-5">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-card-foreground group-hover:text-primary/90">
                    {rentHistory.parkingSpot.address}
                </h3>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mt-1">
                    <span className="block font-medium">${rentHistory.totalCost.toFixed(2)}</span>
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
                    <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-muted-foreground group-hover:text-primary" />
                </Button>
            </div>

            {/* Ripple Effect */}
            <span className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-500" />
        </li>
    )
}
