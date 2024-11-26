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
    const [err, setErr] = useState<Boolean>(false)

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
        <div className="flex flex-col h-full p-4">
            {currentLocation ? (
                <ParkingDetails parkingSpotId={selectedParkingSpot} userLocation={currentLocation} />
            ) : (
                <div className="text-center text-muted-foreground">Loading location to calculate distance...</div>
            )}
            <div className="flex-grow" />
            {err ? (
                <div className="mb-4 text-center text-sm text-red-600 border border-red-500 rounded p-2 bg-red-50">
                    Sorry, this parking spot is currently being rented. Please choose a different spot.
                </div>
            ) : (
                <ConfirmationButton className="w-full" onClick={handleRent} disabled={!isLoggedIn}>
                    Rent Now
                </ConfirmationButton>
            )}

            {!isLoggedIn && <p className="text-center text-red-500">Please log in to rent a parking spot.</p>}
        </div>
    )
}
