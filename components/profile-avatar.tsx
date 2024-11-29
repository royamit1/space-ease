import React, { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Button } from "./ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useFooterState } from "@/hooks/useFooterState"
import { useProfilePicture } from "@/hooks/useProfilePicture"
import LogoutButton from "@/components/ui/google_logout_btn"
import { createClient } from "@/utils/supabase/client"
import LoginButton from "@/components/ui/google_signin_btn"
import blankPicture from "@/assets/blank-profile.svg"
import Image from "next/image"

export function ProfileAvatar() {
    const [, setFooterState] = useFooterState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const profilePicture = useProfilePicture(isLoggedIn)
    const supabase = createClient()

    // Check login status on component mount
    useEffect(() => {
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getSession()
            if (error) {
                console.error("Error fetching session:", error)
            }
            setIsLoggedIn(!!data.session) // Set to true if a session exists
        }

        checkSession()

        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setIsLoggedIn(!!session)
        })

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [supabase])

    // Function to set footer to "create" mode and "open" size
    const handleCreateParking = () => {
        if (!isLoggedIn) return
        setFooterState({
            mode: { mode: "create" },
            size: "open",
        })
    }

    const handleHistoryParking = () => {
        setFooterState({
            mode: { mode: "history" },
            size: "open",
        })
    }

    const handleWallet = () => {
        setFooterState({
            mode: { mode: "wallet" },
            size: "open",
        })
    }

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className="w-12 h-12 lg:w-16 lg:h-16">
                        {isLoggedIn ? <AvatarImage src={profilePicture} /> : <Image src={blankPicture} alt="" />}
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col">
                    <DropdownMenuItem className="flex justify-center">
                        <ThemeSwitcher />
                    </DropdownMenuItem>
                    {isLoggedIn ? (
                        <>
                            <DialogTrigger asChild>
                                <DropdownMenuItem className="flex justify-center">
                                    <Button
                                        className="w-full"
                                        onClick={handleCreateParking}
                                        disabled={!isLoggedIn} // Make button unclickable
                                        style={{
                                            opacity: !isLoggedIn ? 0.5 : 1, // Optional: Dim the button to indicate it's disabled
                                            cursor: !isLoggedIn ? "not-allowed" : "pointer", // Optional: Show a "not-allowed" cursor
                                        }}
                                    >
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
                                    <Button className="w-full" onClick={handleWallet}>
                                        My Wallet
                                    </Button>
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogTrigger asChild>
                                <DropdownMenuItem className="flex justify-center">
                                    <LogoutButton />
                                </DropdownMenuItem>
                            </DialogTrigger>
                        </>
                    ) : (
                        <DropdownMenuItem className="flex justify-center">
                            <LoginButton />
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </Dialog>
    )
}
