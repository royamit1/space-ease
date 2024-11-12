'use client'

import { ParkingList } from "@/components/parking-list";
import React, { useState } from "react";
import FilterSelection, { FilterOption } from "@/components/filter-selection";
import { useParkingSpots } from "@/hooks/useParkingSpots";

export const SearchFooter: React.FC = () => {
    const [selectedSortingOption, setSelectedSortingOption] = useState<{ [key in FilterOption]?: string }>({});
    const { data: parkingSpots, isError, isLoading, error } = useParkingSpots();

    const handleSortingOptionChange = (filter: FilterOption, event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSortingOption((prev) => ({
            ...prev,
            [filter]: event.target.value,
        }));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600 font-medium">Loading, please wait...</span>
            </div>
        );
    }

    if (isError) {
        return (<div>{JSON.stringify(error)}</div>)
    }

    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            <div className="shadow-md">
                <FilterSelection
                    selectedSortingOption={selectedSortingOption}
                    handleSortingOptionChange={handleSortingOptionChange}
                />
            </div>
            <div className="flex-grow overflow-y-auto bg-gray-100 flex items-center justify-center">
                {parkingSpots && (
                    <ParkingList
                        parkingSpots={parkingSpots}
                    />
                )}
            </div>

            <div>
                <p className="text-center m-3 text-xs">
                    &copy; 2024 Space-Ease. All rights reserved.
                </p>
            </div>
        </div>
    )
}
