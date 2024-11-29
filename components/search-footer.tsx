"use client"

import { ParkingList } from "@/components/parking-list"
import React from "react"
import FilterSelection from "@/components/filter-selection"
import { Separator } from "@/components/ui/separator"
import { ParkingSpotFilters } from "@/utils/types"
import { fetchUser } from "@/hooks/useSupabase"
import { useFooterState } from "@/hooks/useFooterState"

export const SearchFooter: React.FC = () => {
    const [selectedFilters, setFooterState] = useFooterState((state) => state.filters)

    function setFilters(filters: Partial<ParkingSpotFilters>) {
        setFooterState((state) => ({
            filters: {
                ...state.filters,
                ...filters,
            },
        }))
    }

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

    return (
        <div className="w-full h-full">
            <FilterSelection onPriceChange={handlePriceFilterChange} onMyParkingToggle={handleMyParkingToggle} />
            <Separator />
            <ParkingList />
        </div>
    )
}
