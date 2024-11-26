import React from "react"
import { RentalHistory } from "@/prisma/generated/client"
import { useFooterState } from "@/hooks/useFooterState"
import { AlertCircle, ChevronRightIcon, MapPinIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParkingSpotById } from "@/hooks/useParkingSpots"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface HistoryParkingSpotItemProps {
    historyParkingSpot: RentalHistory
}

export const HistoryParkingSpotItem: React.FC<HistoryParkingSpotItemProps> = ({ historyParkingSpot }) => {
    const [_, setFooterState] = useFooterState((state) => null)
    const { data: parkingSpot, isLoading, error } = useParkingSpotById(historyParkingSpot.parkingSpotId)

    const handleItemClick = () => {
        setFooterState({
            mode: { mode: "detail", id: historyParkingSpot.parkingSpotId },
            size: "open",
        })
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary font-semibold">
                    Loading...
                </motion.div>
            </div>
        )
    }

    if (error || !parkingSpot) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
                <Card className="p-6 bg-destructive/10">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="w-6 h-6 text-destructive" />
                        <p className="font-semibold text-destructive">{error?.message || "No parking spot found."}</p>
                    </div>
                </Card>
            </motion.div>
        )
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
                    {parkingSpot.address}
                </h3>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mt-1">
                    <span className="block font-medium">${historyParkingSpot.totalCost.toFixed(2)}</span>
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
