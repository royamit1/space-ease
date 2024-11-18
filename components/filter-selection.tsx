import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DollarSignIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";

interface FilterSelectionProps {
    onPriceChange: (priceRange: string | null) => void;
    onMyParkingToggle: (isToggled: boolean) => void;
}

const FilterSelection: React.FC<FilterSelectionProps> = ({
    onPriceChange,
    onMyParkingToggle,
}) => {
    const [myParkingToggled, setMyParkingToggled] = useState(false);

    const handlePriceToggle = (value: string | null) => {
        onPriceChange(value);
    };

    const handleMyParkingToggle = () => {
        const newToggleState = !myParkingToggled;
        setMyParkingToggled(newToggleState);
        onMyParkingToggle(newToggleState);
    };

    return (
        <div className="w-full h-36 flex flex-row space-x-4 justify-center items-center p-3 overflow-x-auto hide-scrollbar">
            <ToggleGroup type="multiple" onValueChange={handlePriceToggle}>
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
            <Toggle
                pressed={myParkingToggled}
                onClick={handleMyParkingToggle}
            >
                <span>My Parkings</span>
            </Toggle>
        </div>
    );
};

export default FilterSelection;
