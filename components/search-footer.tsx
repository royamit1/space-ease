'use client'

import { ParkingList } from "@/components/parking-list";
import { ParkingSpot } from "@/prisma/generated/client";
import React, { useState } from "react";
import FilterSelection, { FilterOption } from "@/components/filter-selection";
import { useParkingSpots } from "@/hooks/useParkingSpots";

interface SearchFooterProps {
    onParkingSelect: (parking: ParkingSpot) => void;
}

export const SearchFooter: React.FC<SearchFooterProps> = ({ onParkingSelect }) => {
    const [selectedSortingOption, setSelectedSortingOption] = useState<{ [key in FilterOption]?: string }>({});
    const { data: parkingSpots, isError, isLoading, error } = useParkingSpots();

    const handleSortingOptionChange = (filter: FilterOption, event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSortingOption((prev) => ({
            ...prev,
            [filter]: event.target.value,
        }));
    };

    if (isLoading) {
        return (<div>Loading...</div>);
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
                        onParkingSelect={onParkingSelect}
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
