import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ThemeSwitcher} from "@/components/theme-switcher";
import React from "react";
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

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="w-12 h-12 lg:w-16 lg:h-16">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>YOUR PROFILE NAME</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col">
                <DropdownMenuItem className="flex justify-center">
                    <ThemeSwitcher />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex justify-center">
                    <Button className="w-full" onClick={() => {/* Add your create parking spot logic here */}}>
                        Create Parking Spot
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex justify-center">
                    <Button className="w-full" onClick={() => {/* Add user info logic here */}}>
                        User Info
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex justify-center">
                    <Button className="w-full" onClick={handleSignOut}>
                        Logout
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}