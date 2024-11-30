"use client"

import React from "react"
import { MapPinIcon } from "lucide-react"
import { format, isSameDay } from "date-fns"
import { RentalHistoryListItem } from "@/hooks/useRentHistory"
import { useFetchUserById } from "@/hooks/useSupabase"

interface HistoryParkingSpotItemProps {
    rentHistory: RentalHistoryListItem
}

export const WalletListItem: React.FC<HistoryParkingSpotItemProps> = ({ rentHistory }) => {
    // Fetch the user's email based on the userId
    const { data: user, isLoading, error } = useFetchUserById(rentHistory.userId)

    // Convert the string dates to Date objects
    const startDate = new Date(rentHistory.startDate)
    const endDate = new Date(rentHistory.endDate)

    // Format the dates using date-fns with 24-hour time
    const dateFormat = "MMM dd, HH:mm" // Example: Dec 01, 15:00
    const startDateString = format(startDate, dateFormat)
    const endDateString = format(endDate, dateFormat)

    // Display only time if start and end are on the same day
    const formattedDates = isSameDay(startDate, endDate)
        ? `${startDateString} - ${format(endDate, "HH:mm")}`
        : `${startDateString} - ${endDateString}`

    return (
        <li className="relative flex items-center p-2 sm:p-3 md:p-4 bg-card rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 h-20 sm:h-24 md:h-28 lg:h-32">
            {/* Map Icon */}
            <div className="flex-shrink-0 bg-primary/80 text-secondary-foreground rounded-lg p-2 sm:p-3 md:p-4">
                <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-secondary" />
            </div>

            {/* Information Section */}
            <div className="flex flex-col flex-grow pl-3 sm:pl-4 md:pl-5">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-card-foreground">
                    {isLoading ? "Loading..." : error ? "Error loading user" : user?.email}
                </h3>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mt-1">
                    <span className="block">{formattedDates}</span>
                </div>
            </div>

            {/* Price Section */}
            <div className="flex-shrink-0 pl-3 sm:pl-4 md:pl-5 text-right">
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-card-foreground">
                    ${rentHistory.totalCost.toFixed(2)}
                </span>
            </div>
        </li>
    )
}
