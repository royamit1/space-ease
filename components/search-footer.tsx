'use client'
import React, {useState} from "react";
import {Footer, FooterState} from "@/components/footer";
import {Button} from "@/components/ui/button"

export type FilterOption = 'availability' | 'price' | 'nearby'

interface Parking {
    id: number;
    name: string;
    price: string;
    availability: string;
}

export function SearchFooter() {
    const [footerState, setFooterState] = useState<FooterState>("collapsed")
    const [selectedSortingOption, setSelectedSortingOption] = useState<{ [key in FilterOption]?: string }>({});
    const [selectedParking, setSelectedParking] = useState<any>(null); // State to track the selected parking item

    const filterOptions: { id: FilterOption; label: string; options: string[] }[] = [
        {id: 'availability', label: 'Availability', options: ['Available Now', 'Available Soon', 'Not Available']},
        {id: 'price', label: 'Price', options: ['$', '$-$$', '$-$$-$$$']},
        {id: 'nearby', label: 'Nearby', options: ['< 1 minute', '< 5 minutes', '< 10 minutes']},
    ];

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

    // Handle clicking on a parking item to show details
    const handleParkingClick = (parking: any) => {
        setSelectedParking(parking);
        setFooterState("open"); // Change state to full to show details
    };

    // Render the search footer component with select boxes for filter options and footer state.
    return (
        <Footer
            header={
                selectedParking ? null : (
                    <div className="flex gap-2 justify-between w-full px-4 mb-3">
                        {filterOptions.map((option) => (
                            <div key={option.id} className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {option.label}
                                </label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    onChange={(event) => handleSortingOptionChange(option.id, event)}
                                    value={selectedSortingOption[option.id] || ""}
                                >
                                    <option value="" disabled>Select {option.label}</option>
                                    {option.options.map((sortOption) => (
                                        <option key={sortOption} value={sortOption}>
                                            {sortOption}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                )
            }
            state={footerState}
            onStateChange={handleFooterStateChange}
        >
            {selectedParking ? ( // Display the selected parking details if available
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{selectedParking.name}</h3>
                    <p className="text-gray-600">Price: {selectedParking.price}</p>
                    <p className="text-gray-600">{selectedParking.availability}</p>
                    <div className="flex justify-end">
                        <Button className="mr-2">Navigation</Button>
                        <Button>Book Now</Button>
                    </div>
                    <p className="text-center text-sm m-3 cursor-pointer" onClick={() => {
                        setSelectedParking(null); // Reset selected parking to go back to the list
                        setFooterState("open");
                    }}>
                        &times; Close
                    </p>
                </div>
            ) : (
                <div className="flex-grow bg-gray-100 w-full p-3 overflow-y-auto h-60">
                    <ul className="space-y-2">
                        {addresses.map((address) => (
                            <li
                                key={address.id}
                                className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleParkingClick(address)} // Handle item click
                            >
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold">{address.name}</h3>
                                    <p className="text-gray-600 text-xs">{address.availability}</p>
                                    <p className="text-gray-600 text-xs">Price: {address.price}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Footer>
    );
}


// <div className="flex-grow bg-gray-100 w-full p-3 overflow-y-auto h-60">
//     <ul className="space-y-2">
//         {addresses.map((address) => (
//             <li key={address.id} className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4">
//                 <div className="flex-1">
//                     <h3 className="text-sm font-semibold">{address.name}</h3>
//                     <p className="text-gray-600 text-xs">{address.availability}</p>
//                     <p className="text-gray-600 text-xs">Price: {address.price}</p>
//                 </div>
//                 <div className="flex flex-col items-end">
//                     <Button
//                         className="mb-2 w-full h-8 text-xs">Navigation</Button>
//                     <Button className="h-8 w-full text-xs">Book Now</Button>
//                 </div>
//             </li>
//         ))}
//     </ul>
// </div>
// <p className="text-center text-sm m-3" onClick={() => setFooterState("collapsed")}>
//     &copy; 2024 Space-Ease. All rights reserved.
// </p>