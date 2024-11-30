"use client"

import React from "react"
import { ParkingSpot } from "@/prisma/generated/client"
import { useFooterState } from "@/hooks/useFooterState"
import { ChevronRightIcon, MapPinIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format, isSameDay } from "date-fns"

interface ParkingSpotItemProps {
    spot: ParkingSpot & { distance?: number | null }
}

export const ParkingSpotItem: React.FC<ParkingSpotItemProps> = ({ spot }) => {
    const [_, setFooterState] = useFooterState((state) => null)

    const handleItemClick = () => {
        setFooterState({ mode: { mode: "detail", id: spot.id }, size: "open" })
    }

    return (
        <li
            className="group relative flex items-center p-3 bg-card rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer hover:ring-2 hover:ring-primary/50"
            onClick={handleItemClick}
        >
            <div className="flex-shrink-0 bg-primary/80 text-secondary-foreground rounded-lg p-2 sm:p-3 md:p-4">
                <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-secondary" />
            </div>

            <div className="flex flex-col flex-grow min-w-0 pl-3 sm:pl-4 md:pl-5">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-card-foreground group-hover:text-primary/90 truncate">
                    {spot.address}
                </h3>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mt-1">
                    <span className="block truncate">
                        {isSameDay(new Date(spot.startTime), new Date(spot.endTime)) ? (
                            <>
                                {format(new Date(spot.startTime), "dd MMM yyyy, HH:mm")} -{" "}
                                {format(new Date(spot.endTime), "HH:mm")}
                            </>
                        ) : (
                            <>
                                {format(new Date(spot.startTime), "dd MMM yyyy, HH:mm")} -{" "}
                                {format(new Date(spot.endTime), "dd MMM yyyy, HH:mm")}
                            </>
                        )}
                    </span>
                    <span className="block font-medium truncate">${spot.hourlyRate.toFixed(2)} per hour</span>
                </div>
            </div>

            {spot.distance && (
                <div className="flex-shrink-0 px-3 text-right">
                    <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-muted-foreground truncate">
                        {spot.distance.toFixed(2)} km
                    </span>
                </div>
            )}

            <div className="flex-shrink-0">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleItemClick}
                    className="group-hover:bg-secondary/20 rounded-full"
                    aria-label="View parking spot details"
                >
                    <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-muted-foreground group-hover:text-primary" />
                </Button>
            </div>

            <span className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-500" />
        </li>
    )
}
