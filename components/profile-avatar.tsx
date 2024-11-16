import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ThemeSwitcher} from "@/components/theme-switcher";
import React from "react"
import {Button} from "./ui/button";
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useFooterState} from "@/hooks/useFooterState";
import {useProfilePicture} from "@/hooks/useProfilePicture";

export function ProfileAvatar() {
    const [, setFooterState] = useFooterState();
    const profilePicture = useProfilePicture();

    // Function to set footer to "create" mode and "open" size
    const handleCreateParking = () => {
        setFooterState({
            mode: {mode: "create"},
            size: "open",
        });
    };

    const handleHistoryParking = () => {
        setFooterState({
            mode: {mode: "history"},
            size: "open",
        });
    };

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className="w-12 h-12 lg:w-16 lg:h-16">
                        <AvatarImage src={profilePicture}/>
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
                    <DialogTrigger asChild>
                        <DropdownMenuItem className="flex justify-center">
                            <Button className="w-full" onClick={handleHistoryParking}>
                                My History
                            </Button>
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                        <DropdownMenuItem className="flex justify-center">
                            <Button className="w-full">
                                Logout
                            </Button>
                        </DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
        </Dialog>
    );
}