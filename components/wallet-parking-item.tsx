import React from "react"
import { MapPinIcon } from "lucide-react"
import { RentalHistoryListItem } from "@/hooks/useRentHistory"

interface HistoryParkingSpotItemProps {
    rentHistory: RentalHistoryListItem
}

export const WalletListItem: React.FC<HistoryParkingSpotItemProps> = ({ rentHistory }) => {
    // Convert the string dates to Date objects
    const startDate = new Date(rentHistory.startDate)
    const endDate = new Date(rentHistory.endDate)

    // Optionally, format the dates as strings (e.g., using toLocaleString for readable format)
    const startDateString = startDate.toLocaleString()
    const endDateString = endDate.toLocaleString()

    return (
        <li className="relative flex items-center p-2 sm:p-3 md:p-4 bg-card rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 h-20 sm:h-24 md:h-28 lg:h-32">
            {/* Map Icon */}
            <div className="flex-shrink-0 bg-primary/80 text-secondary-foreground rounded-lg p-2 sm:p-3 md:p-4">
                <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-secondary" />
            </div>

            {/* Information Section */}
            <div className="flex flex-col flex-grow pl-3 sm:pl-4 md:pl-5">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-card-foreground">
                    {rentHistory.parkingSpot.address}
                </h3>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mt-1">
                    <span className="block">
                        {startDateString} - {endDateString}
                    </span>
                    <span className="block">${rentHistory.totalCost.toFixed(2)}</span>
                </div>
            </div>
        </li>
    )
}
