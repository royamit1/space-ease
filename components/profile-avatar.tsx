import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ThemeSwitcher} from "@/components/theme-switcher";
import React from "react";

export function ProfileAvatar() {
    return <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar className="w-12 h-12 lg:w-16 lg:h-16">
                <AvatarImage src="https://github.com/shadcn.png"/>
                <AvatarFallback>YOUR PROFILE NAME</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
                <ThemeSwitcher/>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>;
}