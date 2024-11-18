import React from "react";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";
import {DollarSignIcon} from "lucide-react";
import {Toggle} from "@/components/ui/toggle";
import {Separator} from "@/components/ui/separator";

export type FilterOption = 'availability' | 'price' | 'nearby' | 'parkingType';

interface FilterSelectionProps {
    onPriceChange: (priceRange: string | null) => void;
    onMyParkingToggle: (isToggled: boolean) => void;
}

const FilterSelection: React.FC<FilterSelectionProps> = ({ onPriceChange, onMyParkingToggle }) => {
    const handlePriceToggle = (value: string | null) => {
        onPriceChange(value);
    };

    const handleMyParkingToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        onMyParkingToggle(event.target.checked);
    };

    return (
        <div className="w-full h-36 flex flex-row space-x-4 justify-center items-center mx-4 overflow-x-auto hide-scrollbar">
            <ToggleGroup type="single" onValueChange={handlePriceToggle}>
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
            <Separator orientation="vertical" className="h-8" />
            <Toggle>
                <span>
                    My Parkings
                </span>
                <input type="checkbox" onChange={handleMyParkingToggle} />
            </Toggle>
        </div>
    );
};

export default FilterSelection;

