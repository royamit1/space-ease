'use client';

import { ParkingList } from "@/components/parking-list";
import React, { useState } from "react";
import FilterSelection from "@/components/filter-selection";
import { useParkingSpots } from "@/hooks/useParkingSpots";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { fetchUser } from "@/app/actions";

export const SearchFooter: React.FC = () => {
    const [selectedFilters, setSelectedFilters] = useState<{ priceRange?: string; userId?: string }>({});
    const { data: parkingSpots, error } = useParkingSpots(selectedFilters);

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
            {parkingSpots && <ParkingList parkingSpots={parkingSpots} />}
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        An error occurred while fetching parking spots. Please try again later.
                    </AlertDescription>
                </Alert>
            )}
            {!parkingSpots && !error && (
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600 font-medium">Loading, please wait...</span>
                </div>
            )}
        </div>
    )
}