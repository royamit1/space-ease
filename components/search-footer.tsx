'use client';

import { ParkingList } from "@/components/parking-list";
import React, { useState } from "react";
import FilterSelection from "@/components/filter-selection";
import { useParkingSpots } from "@/hooks/useParkingSpots";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {fetchUser, ParkingSpotFilters} from "@/app/actions";

export const SearchFooter: React.FC = () => {
    const [selectedFilters, setSelectedFilters] = useState<ParkingSpotFilters>({});

    const handlePriceFilterChange = (priceRange: string | null) => {
        setSelectedFilters((prev) => ({
            ...prev,
            priceRange: priceRange || undefined,
        }));
    };

    const handleMyParkingToggle = async (isToggled: boolean) => {
        const user = await fetchUser();
        const userId = isToggled && user ? user.id : undefined;
        setSelectedFilters((prev) => ({
            ...prev,
            userId,
        }));
    };

    return (
        <div className="w-full h-full">
            <FilterSelection
                onPriceChange={handlePriceFilterChange}
                onMyParkingToggle={handleMyParkingToggle}
            />
            <Separator />
            <ParkingList filters={selectedFilters}  />
        </div>
    )
}