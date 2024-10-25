'use client'
import React, {useState} from "react";
import {Footer, FooterState} from "@/components/footer";
import SlidingButton from "@/components/sliding-button";
import {ParkingList} from "@/components/parking-list";
import FilterSelection, {FilterOption} from "@/components/filter-selection";

interface Parking {
    id: number;
    name: string;
    price: string;
    availability: string;
}

export function SearchFooter() {
    const [footerState, setFooterState] = useState<FooterState>("collapsed")
    const [selectedSortingOption, setSelectedSortingOption] = useState<{ [key in FilterOption]?: string }>({});
    const [selectedParking, setSelectedParking] = useState<Parking | null>(null);

    const addresses = [
        {id: 1, name: 'Dizengoff Street 101, Tel Aviv', price: '$10', availability: 'Available: 9:00 - 16:00'},
        {id: 2, name: 'Rothschild Boulevard 20, Tel Aviv', price: '$15', availability: 'Available: 12:00 - 15:30'},
        {id: 3, name: 'Florentin Street 12, Tel Aviv', price: '$12', availability: 'Available: 10:00 - 20:00'},
    ];

    // Handle sorting option selection
    const handleSortingOptionChange = (filter: FilterOption, event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSortingOption((prev) => ({
            ...prev,
            [filter]: event.target.value,
        }));
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
                <div className="ps-4 pe-4 w-full">
                    <div className="w-full h-40 bg-gray-300 rounded-lg mb-4">
                        <img src={selectedParking.imageUrl} alt="Parking Spot"
                             className="w-full h-full object-cover rounded-lg"/>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{selectedParking.name}</h3>
                    <p className="text-gray-600 mb-1">{selectedParking.availability}</p>
                    <p className="text-gray-600 mb-2">Price: {selectedParking.price}</p>
                    <textarea
                        placeholder="Add a description here..."
                        className="w-full p-2 border border-gray-300 rounded-md resize-none mb-4"
                        rows={3}
                    />
                    <div className="flex justify-between">
                        <SlidingButton onComplete={handleSubmit} buttonText="Book Now"/>
                    </div>
                    <p className="text-center text-sm m-6 cursor-pointer" onClick={() => {
                        setSelectedParking(null); // Reset selected parking to go back to the list
                        setFooterState("open"); // Keep the footer open
                    }}>
                        &times; Close
                    </p>
                </div>
            ) : (
                <ParkingList addresses={addresses} setSelectedParking={setSelectedParking}/>
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