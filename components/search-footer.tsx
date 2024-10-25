'use client'
import React, {useState} from "react";
import {Footer, FooterState} from "@/components/footer";
import {ParkingList} from "@/components/parking-list";
import FilterSelection, {FilterOption} from "@/components/filter-selection";
import ParkingDetails from "@/components/parking-details";
import {Parking, useParkingSpots} from "@/hooks/useParkingSpots"; // Import your custom hook

export function SearchFooter() {
    const parkingSpots = useParkingSpots(); // Get parking spots from the hook
    const [footerState, setFooterState] = useState<FooterState>("collapsed")
    const [selectedSortingOption, setSelectedSortingOption] = useState<{ [key in FilterOption]?: string }>({});
    const [selectedParking, setSelectedParking] = useState<Parking | null>(null);

    // Handle sorting option selection
    const handleSortingOptionChange = (filter: FilterOption, event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSortingOption((prev) => ({
            ...prev,
            [filter]: event.target.value,
        }));
    };

    const handleCloseParkingDetails = () => {
        setSelectedParking(null); // Reset selected parking
        setFooterState("open"); // Open the footer
    };

    // Handle footer state change and update selected filter if necessary.
    const handleFooterStateChange = (newState: FooterState) => {
        setFooterState(newState);
    };

    const handleSubmit = () => {
        console.log('Form submitted')
        // Here you would typically send the data to your server
    }

    // Render the search footer component with select boxes for filter options and footer state.
    return (
        <Footer
            header={
                selectedParking ? null : (
                    <FilterSelection
                        selectedSortingOption={selectedSortingOption}
                        handleSortingOptionChange={handleSortingOptionChange}
                    />
                )
            }
            state={footerState}
            onStateChange={handleFooterStateChange}
        >
            {selectedParking ? ( // Display the selected parking details if available
                <ParkingDetails
                    parking={selectedParking}
                    onClose={handleCloseParkingDetails}
                    onSubmit={handleSubmit}
                />
            ) : (
                <ParkingList
                    addresses={parkingSpots}
                    setSelectedParking={setSelectedParking}/>
            )}
            {/* Conditionally render the copyright text based on selectedParking state */}
            {!selectedParking && (
                <p className="text-center text-sm m-3" onClick={() => setFooterState("collapsed")}>
                    &copy; 2024 Space-Ease. All rights reserved.
                </p>
            )}
        </Footer>
    );


}