import React from "react";
import {FilterOption} from "@/components/search-footer";

const filterOptions = [
    {id: "availability", label: "Availability", options: ["Available Now", "Available Soon", "Not Available"]},
    {id: "price", label: "Price", options: ["$", "$-$$", "$-$$-$$$"]},
    {id: "nearby", label: "Nearby", options: ["< 1 minute", "< 5 minutes", "< 10 minutes"]},
];

export const FilterSelection = ({selectedSortingOption, handleSortingOptionChange}: {
    selectedSortingOption: { [key in FilterOption]?: string },
    handleSortingOptionChange: (filter: FilterOption, event: React.ChangeEvent<HTMLSelectElement>) => void
}) => (
    <div className="flex gap-2 justify-between w-full px-4 mb-3">
        {filterOptions.map(option => (
            <div key={option.id} className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {option.label}
                </label>
                <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    onChange={(event) => handleSortingOptionChange(option.id as FilterOption, event)}
                    value={selectedSortingOption[option.id as FilterOption] || ""}
                >
                    <option value="" disabled>Select {option.label}</option>
                    {option.options.map(sortOption => (
                        <option key={sortOption} value={sortOption}>
                            {sortOption}
                        </option>
                    ))}
                </select>
            </div>
        ))}
    </div>
);