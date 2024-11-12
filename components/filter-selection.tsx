import React from "react";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {DollarSignIcon} from "lucide-react";
import {Toggle} from "@/components/ui/toggle";
import {Separator} from "@/components/ui/separator";

export type FilterOption = 'availability' | 'price' | 'nearby' | 'parkingType';

interface FilterSelectionProps {
    selectedSortingOption: { [key in FilterOption]?: string };
    handleSortingOptionChange: (filter: FilterOption, event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterSelection: React.FC<FilterSelectionProps> = ({}) => {

    return (
        <div className="w-full h-36 flex flex-row space-x-4 justify-center items-center mx-4 overflow-x-auto hide-scrollbar">
            <ToggleGroup type="multiple">
                <ToggleGroupItem value="$" arial-label="Cheap">
                    <DollarSignIcon className="h-4 w-4 -m-0.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="$$" arial-label="Moderate">
                    <DollarSignIcon className="h-4 w-4 -m-0.5" />
                    <DollarSignIcon className="h-4 w-4 -m-0.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="$$$" arial-label="Expensive">
                    <DollarSignIcon className="h-4 w-4 -m-0.5" />
                    <DollarSignIcon className="h-4 w-4 -m-0.5" />
                    <DollarSignIcon className="h-4 w-4 -m-0.5" />
                </ToggleGroupItem>
            </ToggleGroup>
            <Separator orientation="vertical" className="h-12"/>
            <Toggle>
                <span>
                    My Parkings
                </span>
            </Toggle>
        </div>
    );
};

export default FilterSelection;
