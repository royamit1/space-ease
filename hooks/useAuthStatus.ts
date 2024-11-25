"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"

export const useAuthStatus = () => {
    const supabase = createClient()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const checkAuthStatus = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser()
        setIsLoggedIn(!!user) // Update login state
    }

    useEffect(() => {
        // Run authentication check on mount
        checkAuthStatus()

        // Subscribe to auth state changes
        const { data: subscription } = supabase.auth.onAuthStateChange(() => {
            checkAuthStatus()
        })

        return () => {
            subscription?.subscription.unsubscribe()
        }
    }, []) // Empty dependency array to run once on mount

    return isLoggedIn
}
