import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ThemeSwitcher} from "@/components/theme-switcher";
import React, { use, useState } from "react";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation'

export function ProfileAvatar() {
    const router = useRouter()
    const handleSignOut = async () => {
        const supabase = createClient()
        let { error } = await supabase.auth.signOut();
        if (error){            
            console.log(error)
        } else{
            router.push('/sign-in')
        }
      };

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
                <Button onClick={handleSignOut}>LOGOUT</Button>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>;
}