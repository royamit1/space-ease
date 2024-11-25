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
    const isLoggedIn = useAuthStatus() // Use the custom hook

    const handlePriceToggle = (value: string | null | undefined) => {
        onPriceChange(value || null) // Ensures `null` is passed instead of `undefined`
    }

    const handleMyParkingToggle = () => {
        if (!isLoggedIn) return // Prevent toggling if the user is not logged in

        const newToggleState = !myParkingToggled
        setMyParkingToggled(newToggleState)
        onMyParkingToggle(newToggleState)
    }

    return (
        <div className="w-full flex flex-row space-x-4 justify-center p-3 overflow-x-auto hide-scrollbar">
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
            <Toggle pressed={myParkingToggled} onClick={handleMyParkingToggle} disabled={!isLoggedIn}>
                <span>My Parkings</span>
            </Toggle>
            {!isLoggedIn && <p className="text-sm text-red-500"></p>}
            <Separator orientation="vertical" className="mx-8" />
            <div className="flex flex-col space-y-2">
                <select
                    id="distance"
                    onChange={(e) => onDistanceChange(e.target.value === "0" ? null : Number(e.target.value))}
                    className="border p-2 rounded"
                >
                    <option value="0">None</option>
                    <option value="1">1 km</option>
                    <option value="5">5 km</option>
                    <option value="10">10 km</option>
                </select>
            </div>
        </div>
    )
}

export default FilterSelection
