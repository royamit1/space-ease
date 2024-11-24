import React from "react"
import ParkingDetails from "@/components/parking-details"
import { ConfirmationButton } from "@/components/common/confirmation-button"
import { startRenting } from "@/app/actions"
import { useQueryClient } from "@tanstack/react-query"

interface DetailFooterProps {
    selectedParkingSpot: number
}

export const DetailFooter: React.FC<DetailFooterProps> = ({ selectedParkingSpot }) => {
    const queryClient = useQueryClient()

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
            <ConfirmationButton className="w-full" onClick={handleRent}>
                Rent Now
            </ConfirmationButton>
        </div>
    )
}
