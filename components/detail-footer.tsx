"use client"

import React from "react"
import ParkingDetails from "@/components/parking-details"
import { useQueryClient } from "@tanstack/react-query"
import { startRenting } from "@/app/actions"
import { ConfirmationButton } from "@/components/common/confirmation-button"
import { useAuthStatus } from "@/hooks/useAuthStatus"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DetailFooterProps {
    selectedParkingSpot: number
}

export const DetailFooter: React.FC<DetailFooterProps> = ({ selectedParkingSpot }) => {
    const queryClient = useQueryClient()
    const isLoggedIn = useAuthStatus() // Use custom hook

    const handleRent = async () => {
        try {
            await startRenting(selectedParkingSpot)
        } catch (err) {
            console.error(err)
            return
        }
        await queryClient.invalidateQueries({ queryKey: ["activeRent"] })
    }

    return (
        <div className="flex flex-col h-full p-4">
            <ParkingDetails parkingSpotId={selectedParkingSpot} />
            <div className="flex-grow" />
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="w-full">
                            <ConfirmationButton className="w-full" onClick={handleRent} disabled={!isLoggedIn}>
                                Rent Now
                            </ConfirmationButton>
                        </div>
                    </TooltipTrigger>
                    {!isLoggedIn && (
                        <TooltipContent>
                            <p>Please log in to rent a parking spot.</p>
                        </TooltipContent>
                    )}
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}
