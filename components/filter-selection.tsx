"use client"

import React, { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DollarSignIcon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Separator } from "@/components/ui/separator"
import { useAuthStatus } from "@/hooks/useAuthStatus"

interface FilterSelectionProps {
    onPriceChange: (priceRange: string | null) => void
    onMyParkingToggle: (isToggled: boolean) => void
    onDistanceChange: (maxDistance: number | null) => void
}

const FilterSelection: React.FC<FilterSelectionProps> = ({ onPriceChange, onMyParkingToggle, onDistanceChange }) => {
    const [myParkingToggled, setMyParkingToggled] = useState(false)
    const [nearbyToggled, setNearbyToggled] = useState(false)
    const isLoggedIn = useAuthStatus() // Use the custom hook
    const NEARBY_DISTANCE = 5

    // Handle price range toggling
    const handlePriceToggle = (value: string | null | undefined) => {
        onPriceChange(value || null) // Ensures `null` is passed instead of `undefined`
    }

    // Handle toggling "My Parking"
    const handleMyParkingToggle = () => {
        if (!isLoggedIn) return // Prevent toggling if the user is not logged in

        const newToggleState = !myParkingToggled
        setMyParkingToggled(newToggleState)
        onMyParkingToggle(newToggleState)
    }

    // Handle toggling "Nearby"
    const handleDistanceToggle = () => {
        const newToggleState = !nearbyToggled
        setNearbyToggled(newToggleState)

        // Adjust the distance filter based on the new toggle state
        if (newToggleState) {
            onDistanceChange(NEARBY_DISTANCE)
        } else {
            onDistanceChange(null)
        }
    }

    return (
        <div className="w-full flex flex-row space-x-4 justify-center p-3 overflow-x-auto hide-scrollbar">
            {/* Price Range Selection */}
            <ToggleGroup type="single" onValueChange={handlePriceToggle}>
                <ToggleGroupItem value="$" aria-label="Cheap">
                    <DollarSignIcon className="h-4 w-4 -m-0.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="$$" aria-label="Moderate">
                    <DollarSignIcon className="h-4 w-4 -m-0.5" />
                    <DollarSignIcon className="h-4 w-4 -m-0.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="$$$" aria-label="Expensive">
                    <DollarSignIcon className="h-4 w-4 -m-0.5" />
                    <DollarSignIcon className="h-4 w-4 -m-0.5" />
                    <DollarSignIcon className="h-4 w-4 -m-0.5" />
                </ToggleGroupItem>
            </ToggleGroup>

            <Separator orientation="vertical" className="mx-8" />

            {/* Nearby Parking Toggle */}
            <Toggle pressed={nearbyToggled} onClick={handleDistanceToggle}>
                <span>Nearby</span>
            </Toggle>

            <Separator orientation="vertical" className="mx-8" />

            {/* My Parkings Toggle */}
            <Toggle pressed={myParkingToggled} onClick={handleMyParkingToggle} disabled={!isLoggedIn}>
                <span>My Parkings</span>
            </Toggle>

            {/* Show error message if user is not logged in */}
        </div>
    )
}

export default FilterSelection
