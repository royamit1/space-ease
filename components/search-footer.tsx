"use client"

import { ParkingList } from "@/components/parking-list"
import React, { useState, useEffect } from "react"
import FilterSelection from "@/components/filter-selection"
import { Separator } from "@/components/ui/separator"
import { ParkingSpotFilters } from "@/utils/types"
import { fetchUser } from "@/app/actions"

const LOCATION_STORAGE_KEY = "userLocation"

export const SearchFooter: React.FC = () => {
    const [selectedFilters, setSelectedFilters] = useState<ParkingSpotFilters>({})

    useEffect(() => {
        // Check if location exists in localStorage
        const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY)
        if (savedLocation) {
            const { latitude, longitude } = JSON.parse(savedLocation)
            setSelectedFilters((prev) => ({
                ...prev,
                latitude,
                longitude,
            }))
            return // Skip fetching if we already have a saved location
        }

        // Fetch location if not saved
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    setSelectedFilters((prev) => ({
                        ...prev,
                        latitude,
                        longitude,
                    }))

                    // Save location in localStorage
                    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify({ latitude, longitude }))
                },
                (error) => {
                    console.error("Error fetching user location:", error.message)
                },
            )
        } else {
            console.warn("Geolocation is not supported by this browser.")
        }
    }, [])

    const handlePriceFilterChange = (priceRange: string | null) => {
        setSelectedFilters((prev) => ({
            ...prev,
            priceRange: priceRange || undefined,
        }))
    }

    const handleMyParkingToggle = async (isToggled: boolean) => {
        const user = await fetchUser()
        const userId = isToggled && user ? user.id : undefined
        setSelectedFilters((prev) => ({
            ...prev,
            userId,
        }))
    }

    const handleDistanceFilterChange = (distance: number | null) => {
        setSelectedFilters((prev) => ({
            ...prev,
            maxDistance: distance || undefined,
        }))
    }

    return (
        <div className="w-full h-full">
            <FilterSelection
                onPriceChange={handlePriceFilterChange}
                onMyParkingToggle={handleMyParkingToggle}
                onDistanceChange={handleDistanceFilterChange}
            />
            <Separator />
            <ParkingList filters={selectedFilters} />
        </div>
    )
}
