'use client'

import {ParkingList} from "@/components/parking-list";
import React, {useState} from "react";
import FilterSelection, {FilterOption} from "@/components/filter-selection";
import {useParkingSpots} from "@/hooks/useParkingSpots";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";
import {Separator} from "@/components/ui/separator";

export const SearchFooter: React.FC = () => {
    const [selectedSortingOption, setSelectedSortingOption] = useState<{ [key in FilterOption]?: string }>({});
    const {data: parkingSpots, error} = useParkingSpots();

    const handleSortingOptionChange = (filter: FilterOption, event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSortingOption((prev) => ({
            ...prev,
            [filter]: event.target.value,
        }));
    };

    return (
        <div className="flex flex-col w-full h-full">
            <FilterSelection
                selectedSortingOption={selectedSortingOption}
                handleSortingOptionChange={handleSortingOptionChange}
            />
            <Separator/>
            {parkingSpots && (
                <ParkingList
                    parkingSpots={parkingSpots}
                />
            )}
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