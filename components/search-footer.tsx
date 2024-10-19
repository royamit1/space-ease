'use client'
import React, { useState } from "react";
import { Footer, FooterState } from "@/components/footer";
import { Button } from "@/components/ui/button"

export type FilterOption = 'availability' | 'price' | 'nearby'

export function SearchFooter() {
    const [footerState, setFooterState] = useState<FooterState>("collapsed")
    const [selectedFilter, setSelectedFilter] = useState<FilterOption | null>(null)

    const filterOptions: { id: FilterOption; label: string }[] = [
        { id: 'availability', label: 'Availability' },
        { id: 'price', label: 'Price' },
        { id: 'nearby', label: 'Nearby' },
    ]

    // Handle filter click and update selected filter and footer state accordingly.
    const handleFilterClick = (filter: FilterOption) => {
        // Open the footer if it's collapsed
        if (footerState === "collapsed") {
            setFooterState("open");
            setSelectedFilter(filter); // Set the filter immediately after opening
        } else {
            // Toggle the selected filter only if the footer is not collapsed
            setSelectedFilter(prevFilter => (prevFilter === filter ? null : filter));
        }
    }


    // Handle footer state change and update selected filter if necessary.
    const handleFooterStateChange = (newState: FooterState) => {
        if (newState === "collapsed") {
            setSelectedFilter(null)
        }
        setFooterState(newState);
    }

    // Render the search footer component with filter options and footer state.
    return <Footer header={
        <div className="flex gap-2 justify-between w-full px-4 mb-3">
            {filterOptions.map((option) => (
                <Button
                    key={option.id}
                    variant={selectedFilter === option.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleFilterClick(option.id)}
                    className="flex-1 h-10 border border-solid border-gray-300" // Makes buttons equal width
                >
                    {option.label}
                </Button>
            ))}
        </div>
    } state={footerState} onStateChange={handleFooterStateChange}
    >
        <div className="flex-grow bg-green-500 w-full"/>
        <p className="text-center text-sm m-3" onClick={() => setFooterState("collapsed")}>
            &copy; 2024 Space-Ease. All rights reserved.
        </p>
    </Footer>;
}