'use client';
import React, {useState} from "react";
import {Footer, FooterState} from "@/components/footer";
import {FilterSelection} from "@/components/filter-selection";
import {ParkingDetails} from "@/components/parking-details";
import {ParkingList} from "@/components/parking-list";

export type FilterOption = 'availability' | 'price' | 'nearby'

export interface Parking {
    id: number;
    name: string;
    price: string;
    availability: string;
    imageUrl?: string;
    lat: number;
    lng: number;
}

const addresses: Parking[] = [
    {
        id: 1,
        name: 'Dizengoff Street 101, Tel Aviv',
        price: '$10',
        availability: 'Available: 9:00 - 16:00',
        lat: 32.080480,
        lng: 34.780527
    },
    {
        id: 2,
        name: 'Rothschild Boulevard 20, Tel Aviv',
        price: '$15',
        availability: 'Available: 12:00 - 15:30',
        lat: 32.065556,
        lng: 34.775361
    },
    {
        id: 3,
        name: 'Florentin Street 12, Tel Aviv',
        price: '$12',
        availability: 'Available: 10:00 - 20:00',
        lat: 32.056210,
        lng: 34.769918
    },
];


export const SearchFooter: React.FC = () => {
    const [footerState, setFooterState] = useState<FooterState>("collapsed");
    const [selectedSortingOption, setSelectedSortingOption] = useState<{ [key in FilterOption]?: string; }>({});
    const [selectedParking, setSelectedParking] = useState<Parking | null>(null);

    // Handle footer state change and update selected filter if necessary.
    const handleFooterStateChange = (newState: FooterState) => {
        setFooterState(newState);
    };

    // Handle sorting option selection
    const handleSortingOptionChange = (filter: FilterOption, event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSortingOption((prev) => ({
            ...prev,
            [filter]: event.target.value,
        }));
    };

    // Handle clicking on a parking item to show details
    const handleParkingClick = (parking: any) => {
        setSelectedParking(parking);
        setFooterState("open"); // Change state to full to show details
    };

    const handleClose = () => {
        setSelectedParking(null);
        setFooterState("open");
    };

    const handleSubmit = () => {
        console.log('Form submitted')
        // Here you would typically send the data to your server
    }

    // Render the search footer component with select boxes for filter options and footer state.
    return (
        <Footer
            header={
                selectedParking ? null : <FilterSelection selectedSortingOption={selectedSortingOption}
                                                          handleSortingOptionChange={handleSortingOptionChange}/>
            }
            state={footerState}
            onStateChange={handleFooterStateChange}
        >
            {selectedParking ? (
                <ParkingDetails selectedParking={selectedParking} handleSubmit={handleSubmit} onClose={handleClose}/>
            ) : (
                <ParkingList addresses={addresses} onParkingClick={handleParkingClick}/>
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