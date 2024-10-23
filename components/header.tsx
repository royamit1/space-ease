import React, { useState } from "react";
import {cn} from "@/utils/cn";
import {SquareParking} from "lucide-react";
import SearchBar from "@/components/search-bar";
import {ProfileAvatar} from "@/components/profile-avatar";

interface HeaderProps {
    className?: string;
    onSearch: (lat: number, lng: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ className, onSearch }) => {
    return <div className={cn("w-full flex flex-row space-x-5 items-center z-10", className)}>
        <div className="flex flex-row items-center space-x-2 text-3xl">
            <SquareParking className="size-12 lg:size-16"/>
            <h1 className="hidden lg:block">SpaceEase</h1>
        </div>
        <div className="flex-grow">
            <SearchBar onSearch={onSearch}/>
        </div>
        <ProfileAvatar/>
    </div>;
}