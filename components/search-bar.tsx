'use client'

import React, { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (lat: number, lng: number) => void;
    className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', onSearch, className }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
                types: ['geocode'],  // Restrict autocomplete to address-like results
            });

            // Add listener for place selection
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();
                    onSearch?.(lat, lng);  // Pass coordinates to parent
                }
            });
        }
    }, []);

    return (
        <div className={cn("relative w-full", className)}>
            <input
                type="text"
                ref={inputRef}
                placeholder={placeholder}
                className={cn(
                    'w-full py-2 pl-10 pr-4 bg-background border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    'transition duration-300 ease-in-out',
                )}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon className="h-5 w-5" />
            </div>
        </div>
    );
};

export default SearchBar;
