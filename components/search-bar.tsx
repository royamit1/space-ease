'use client'

import React from 'react';
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
    className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', onSearch, className }) => {
    return (
        <div className={cn("relative w-full", className)}>
            <input
                type="text"
                placeholder={placeholder}
                className={cn(
                    'w-full py-2 pl-10 pr-4 bg-background border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    'transition duration-300 ease-in-out',
                )}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && onSearch) {
                        onSearch(e.currentTarget.value);
                    }
                }}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon className="h-5 w-5" />
            </div>
        </div>
    );
};

export default SearchBar;
