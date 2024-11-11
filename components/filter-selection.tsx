import React from "react";

export type FilterOption = 'availability' | 'price' | 'nearby' | 'parkingType';

interface FilterSelectionProps {
    selectedSortingOption: { [key in FilterOption]?: string };
    handleSortingOptionChange: (filter: FilterOption, event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterSelection: React.FC<FilterSelectionProps> = ({
                                                             selectedSortingOption,
                                                             handleSortingOptionChange,
                                                         }) => {

    const filterOptions: { id: FilterOption; label: string; options: string[] }[] = [
        {id: 'availability', label: 'Availability', options: ['Available Now', 'Available Soon', 'Not Available']},
        {id: 'price', label: 'Price', options: ['$', '$-$$', '$-$$-$$$']},
        {id: 'nearby', label: 'Nearby', options: ['< 1 minute', '< 5 minutes', '< 10 minutes']},
        {id: 'parkingType', label: 'Parking Type', options: ['All Parking Spots', 'My Parking Spots']},
    ];

    return (
        <div className="w-full px-4 mb-3">
            <div className="flex gap-2 justify-start overflow-x-auto hide-scrollbar mx-auto max-w-lg">
                {filterOptions.map((option) => (
                    <div key={option.id} className="flex-none">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {option.label}
                        </label>
                        <select
                            className="inline-block p-2 border border-gray-300 rounded-md whitespace-nowrap"
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
        </div>
    );
};

export default FilterSelection;
