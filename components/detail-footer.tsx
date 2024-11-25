"use client"

import React, { useEffect, useState } from "react"
import ParkingDetails from "@/components/parking-details"
import { useQueryClient } from "@tanstack/react-query"
import { startRenting } from "@/app/actions"
import { ConfirmationButton } from "@/components/common/confirmation-button"
import { Location } from "@/utils/types"
import { useAuthStatus } from "@/hooks/useAuthStatus"

interface DetailFooterProps {
    selectedParkingSpot: number
}

const LOCATION_STORAGE_KEY = "userLocation"

export const DetailFooter: React.FC<DetailFooterProps> = ({ selectedParkingSpot }) => {
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null)
    const queryClient = useQueryClient()
    const isLoggedIn = useAuthStatus() // Use custom hook

    useEffect(() => {
        // Check if location is saved in localStorage
        const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY)
        if (savedLocation) {
            setCurrentLocation(JSON.parse(savedLocation))
        } else if (navigator.geolocation) {
            // Fetch current location if not saved
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    const location = { latitude, longitude }
                    setCurrentLocation(location)
                    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location)) // Save for later use
                },
                (error) => {
                    console.error("Error fetching user location:", error.message)
                },
            )
        }
    }, [])

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
            {currentLocation ? (
                <ParkingDetails parkingSpotId={selectedParkingSpot} userLocation={currentLocation} />
            ) : (
                <div className="text-center text-muted-foreground">Loading location to calculate distance...</div>
            )}
            <div className="flex-grow" />
            <ConfirmationButton className="w-full" onClick={handleRent} disabled={!isLoggedIn}>
                Rent Now
            </ConfirmationButton>
            {!isLoggedIn && <p className="text-center text-red-500">Please log in to rent a parking spot.</p>}
        </div>
    )
}
