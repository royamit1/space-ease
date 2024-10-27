'use client'

import {ParkingList} from "@/components/parking-list";
import {ParkingSpot} from "@prisma/client";
import React, {useState, useEffect} from "react";
import FilterSelection, {FilterOption} from "@/components/filter-selection";
import {useFooterState} from "@/hooks/useFooterState";
import {fetchAvailableParkingSpots} from "@/app/actions";

export function SearchFooter() {
    const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
    const [selectedParking, setSelectedParking] = useState<ParkingSpot | null>(null);
    const [selectedSortingOption, setSelectedSortingOption] = useState<{ [key in FilterOption]?: string }>({});
    const [, setFooterState] = useFooterState(); // Zustand state setter
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch available parking spots on mount
    useEffect(() => {
        const fetchParkingSpots = async () => {
            try {
                const spots = await fetchAvailableParkingSpots();
                setParkingSpots(spots);
            } catch (err) {
                setError("Failed to load parking spots");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchParkingSpots();
    }, []);

    // Handle sorting option selection
    const handleSortingOptionChange = (filter: FilterOption, event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSortingOption((prev) => ({
            ...prev,
            [filter]: event.target.value,
        }));
    };

    // Handle parking spot click
    const handleParkingSpotClick = (parkingSpot: ParkingSpot) => {
        setSelectedParking(parkingSpot);
        setFooterState({mode: {mode: "detail", id: parkingSpot.id}, size: "open"}); // Update footer state
    };

    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            {/* Filter Selection fixed at the top */}
            <div className="shadow-md">
                <FilterSelection
                    selectedSortingOption={selectedSortingOption}
                    handleSortingOptionChange={handleSortingOptionChange}
                />
            </div>
            <div className="flex-grow overflow-y-auto bg-gray-100">
                {loading ? (
                    <p>Loading parking spots...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <ParkingList
                        parkingSpots={parkingSpots}
                        setSelectedParking={handleParkingSpotClick}
                    />
                )}
            </div>
            {/* Copyright text fixed at the bottom */}
            <div>
                <p className="text-center m-3 text-xs">
                    &copy; 2024 Space-Ease. All rights reserved.
                </p>
            </div>
        </div>
    )
}