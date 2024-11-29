"use client"

import React, { useState } from "react"
import ParkingDetails from "@/components/parking-details"
import { useQueryClient } from "@tanstack/react-query"
import { startRenting } from "@/hooks/useRentals"
import { ConfirmationButton } from "@/components/common/confirmation-button"
import { useAuthStatus } from "@/hooks/useAuthStatus"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DetailFooterProps {
    selectedParkingSpot: number
}

export const DetailFooter: React.FC<DetailFooterProps> = ({ selectedParkingSpot }) => {
    const queryClient = useQueryClient()
    const isLoggedIn = useAuthStatus() // Use custom hook
    const [err, setErr] = useState(false)

    const handleRent = async () => {
        try {
            await startRenting(selectedParkingSpot)
            await queryClient.invalidateQueries({ queryKey: ["activeRent"] })
            setErr(false) // Reset error if successful
        } catch (err: any) {
            if (err.message === "unavailable") {
                setErr(true)
            } else {
                console.error("An unexpected error occurred:", err)
                alert("An unexpected error occurred. Please try again later.")
            }
        }
    }

    return (
        <div className="flex flex-col min-h-full p-4">
            <ParkingDetails parkingSpotId={selectedParkingSpot} />
            <div className="flex-grow p-2" />
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="w-full">
                            {err && (
                                <div className="mb-4 text-center text-sm text-red-600 border border-red-500 rounded p-2 bg-red-50">
                                    Sorry, this parking spot is currently being rented. Please choose a different spot.
                                </div>
                            )}
                            <ConfirmationButton
                                className="w-full text-md z-10"
                                onClick={handleRent}
                                disabled={!isLoggedIn || err}
                            >
                                Rent Now
                            </ConfirmationButton>
                        </div>
                    </TooltipTrigger>
                    {!isLoggedIn && <TooltipContent>Please log in to rent a parking spot</TooltipContent>}
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}
