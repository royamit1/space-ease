"use client"

import { ParkingList } from "@/components/parking-list"
import React, { useState } from "react"
import FilterSelection from "@/components/filter-selection"
import { useParkingSpots } from "@/hooks/useParkingSpots"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ParkingSpotFilters } from "@/utils/types"
import { fetchUser } from "@/app/actions"
import { useEffect } from "react"

export const SearchFooter: React.FC = () => {
    const [selectedFilters, setSelectedFilters] = useState<ParkingSpotFilters>({})

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("got current position: \n", position)
                    setSelectedFilters((prev) => ({
                        ...prev,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }))
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
