'use client'

import React from "react";
import {MyMap} from "@/components/my-map";
import {APIProvider} from "@vis.gl/react-google-maps";
import {SquareParking} from "lucide-react";
import SearchBar from "@/components/search-bar";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {ThemeSwitcher} from "@/components/theme-switcher";

export default function Index() {
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}>
            <MyMap disableDefaultUI={true}>
                <div className="fixed top-0 px-7 pt-3 w-full flex flex-row space-x-5 items-center z-10">
                    <div className="flex flex-row items-center space-x-2 text-3xl">
                        <SquareParking className="size-12 lg:size-16"/>
                        <h1 className="hidden lg:block">SpaceEase</h1>
                    </div>
                    <div className="flex-grow">
                        <SearchBar/>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="w-12 h-12 lg:w-16 lg:h-16">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>YOUR PROFILE NAME</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <ThemeSwitcher />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </MyMap>
        </APIProvider>
    )
}
