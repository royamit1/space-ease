import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ThemeSwitcher} from "@/components/theme-switcher";
import React from "react";
import {Button} from "./ui/button";
import {createClient} from "@/utils/supabase/client";
import {useRouter} from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function ProfileAvatar() {
    const router = useRouter()

    const handleSignOut = async () => {
        const supabase = createClient()
        let {error} = await supabase.auth.signOut();
        if (error) {
            console.log(error)
        } else {
            router.push('/sign-in')
        }
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
                            <Button className="w-full">
                                Create Parking Spot
                            </Button>
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuItem className="flex justify-center">
                        <Button className="w-full" onClick={() => {/* Add user info logic here */
                        }}>
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new Parking Spot</DialogTitle>
                    <DialogDescription>
                        Add your vehicle details, location, and payment method.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}