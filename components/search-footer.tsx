"use client"

import { ParkingList } from "@/components/parking-list"
import React, { useState, useEffect } from "react"
import FilterSelection from "@/components/filter-selection"
import { Separator } from "@/components/ui/separator"
import { ParkingSpotFilters } from "@/utils/types"
import { fetchUser } from "@/app/actions"
import { useFooterState } from "@/hooks/useFooterState"

const LOCATION_STORAGE_KEY = "userLocation"

export const SearchFooter: React.FC = () => {
    const [selectedFilters, setFooterState] = useFooterState((state) => state.filters)

    function setFilters(filters: ParkingSpotFilters) {
        setFooterState((state) => ({
            filters: {
                ...state.filters,
                ...filters,
            },
        }))
    }

    useEffect(() => {
        // Check if location exists in localStorage
        const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY)
        if (savedLocation) {
            const { latitude, longitude } = JSON.parse(savedLocation)
            setFilters({ latitude, longitude })
            return // Skip fetching if we already have a saved location
        }

        // Fetch location if not saved
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    setFilters({ latitude, longitude })

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
        setFilters({ priceRange: priceRange || undefined })
    }

    const handleMyParkingToggle = async (isToggled: boolean) => {
        const user = await fetchUser()
        const userId = isToggled && user ? user.id : undefined
        setFilters({
            userId,
        })
    }

    const handleDistanceFilterChange = (distance: number | null) => {
        setFilters({
            maxDistance: distance || undefined,
        })
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
