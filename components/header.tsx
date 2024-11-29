import React from "react"
import { cn } from "@/utils/cn"
import SearchBar from "@/components/search-bar"
import { ProfileAvatar } from "@/components/profile-avatar"
import { SpaceEaseIcon } from "@/components/ui/app-icon"

interface HeaderProps {
    className?: string
    onSearch: (lat: number, lng: number) => void
}

export const Header: React.FC<HeaderProps> = ({ className, onSearch }) => {
    return (
        <div className={cn("w-full flex flex-row space-x-5 items-center z-10", className)}>
            <div className="flex flex-row items-center space-x-2 text-3xl">
                <SpaceEaseIcon size={70} />
                <h1 className="hidden lg:block text-4xl font-bold bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent">
                    SpaceEase
                </h1>
            </div>
            <div className="flex-grow">
                <SearchBar
                    onSearch={(lat, lng) => {
                        console.log("Header received search:", lat, lng)
                        onSearch(lat, lng)
                    }}
                />
            </div>
            <ProfileAvatar />
        </div>
    )
}
