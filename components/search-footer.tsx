import {ParkingList} from "@/components/parking-list";
import {ParkingSpot} from "@/prisma/generated/client";
import React, {useState, useEffect} from "react";
import FilterSelection, {FilterOption} from "@/components/filter-selection";
import {fetchAvailableParkingSpots} from "@/app/actions";

interface SearchFooterProps {
    onParkingSelect: (parking: ParkingSpot) => void; // Change type to accept ParkingSpot
}

export const SearchFooter: React.FC<SearchFooterProps> = ({onParkingSelect}) => {
    const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
    const [selectedSortingOption, setSelectedSortingOption] = useState<{ [key in FilterOption]?: string }>({});
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

    // Handle parking spot selection
    const handleParkingSelect = (parkingSpot: ParkingSpot) => {
        onParkingSelect(parkingSpot); // Pass the selected parking spot to the parent
    };

    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            <div className="shadow-md">
                <FilterSelection
                    selectedSortingOption={selectedSortingOption}
                    handleSortingOptionChange={handleSortingOptionChange}
                />
            </div>
            <div className="flex-grow overflow-y-auto bg-gray-100 flex items-center justify-center">
                {loading ? (
                    <p className="text-lg font-semibold animate-pulse">Loading parking spots...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : parkingSpots.length === 0 ? (
                    <p className="text-gray-600">No parking spots available at the moment.</p>
                ) : (
                    <ParkingList
                        parkingSpots={parkingSpots}
                        onParkingSelect={handleParkingSelect}
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