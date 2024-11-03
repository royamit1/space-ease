import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ThemeSwitcher} from "@/components/theme-switcher";
import React from "react"
import {Button} from "./ui/button";
import {createClient} from "@/utils/supabase/client";
import {useRouter} from 'next/navigation'
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useFooterState} from "@/hooks/useFooterState";

export function ProfileAvatar() {
    const [, setFooterState] = useFooterState();

    // Function to set footer to "create" mode and "open" size
    const handleCreateParking = () => {
        setFooterState({
            mode: {mode: "create"},
            size: "open",
        });
    };

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className="w-12 h-12 lg:w-16 lg:h-16">
                        <AvatarImage src="https://github.com/shadcn.png"/>
                        <AvatarFallback>YOUR PROFILE NAME</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col">
                    <DropdownMenuItem className="flex justify-center">
                        <ThemeSwitcher/>
                    </DropdownMenuItem>
                    <DialogTrigger asChild>
                        <DropdownMenuItem className="flex justify-center">
                            <Button className="w-full" onClick={handleCreateParking}>
                                Create Parking Spot
                            </Button>
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuItem className="flex justify-center">
                        <Button className="w-full" >
                            My Parking Spots
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex justify-center">
                        <Button className="w-full" >
                            History
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Dialog>
    );
}