'use client'
import React, { useState } from "react";
import { Footer, FooterState } from "@/components/footer";
import { Button } from "@/components/ui/button"

export type FilterOption = 'availability' | 'price' | 'nearby'

export function SearchFooter() {
    const [footerState, setFooterState] = useState<FooterState>("collapsed")
    const [selectedSortingOption, setSelectedSortingOption] = useState<{ [key in FilterOption]?: string }>({});

    const filterOptions: { id: FilterOption; label: string; options: string[] }[] = [
        { id: 'availability', label: 'Availability', options: ['Available Now', 'Available Soon', 'Not Available'] },
        { id: 'price', label: 'Price', options: ['$', '$-$$', '$-$$-$$$'] },
        { id: 'nearby', label: 'Nearby', options: ['< 1 minute', '< 5 minutes', '< 10 minutes'] },
    ];

    const addresses = [
        { id: 1, name: 'Dizengoff Street 101, Tel Aviv', price: '$10', contact: '123-456-7890', image: 'url_to_image_1' },
        { id: 2, name: 'Rothschild Boulevard 20, Tel Aviv', price: '$15', contact: '987-654-3210', image: 'url_to_image_2' },
        { id: 3, name: 'Florentin Street 12, Tel Aviv', price: '$12', contact: '555-123-4567', image: 'url_to_image_3' },
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

    // Render the search footer component with select boxes for filter options and footer state.
    return (
        <Footer header={
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
        } state={footerState} onStateChange={handleFooterStateChange}>
            <div className="flex-grow bg-gray-100 w-full p-3 overflow-y-auto h-60">
                <ul className="space-y-2">
                    {addresses.map((address) => (
                        <li key={address.id} className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4">
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold">{address.name}</h3> {/* Reduced text size */}
                                <p className="text-gray-600 text-xs">Price: {address.price}</p> {/* Reduced text size */}
                            </div>
                            <div className="flex flex-col items-end">
                                <Button
                                    className="mb-1 w-20 text-xs">Navigation</Button> {/* Set width and reduced text size */}
                                <Button className="w-20 text-xs">Rent</Button> {/* Set width and reduced text size */}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <p className="text-center text-sm m-3" onClick={() => setFooterState("collapsed")}>
                &copy; 2024 Space-Ease. All rights reserved.
            </p>
        </Footer>
    );
}