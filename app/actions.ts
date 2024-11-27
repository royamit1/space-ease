"use server"
import db from "@/lib/db"
import { createClient } from "@/utils/supabase/server"
import { RentalHistory } from "@/prisma/generated/client"

export const fetchHistoryParkingSpots = async () => {
    try {
        const historyParkingSpots: RentalHistory[] = await db.rentalHistory.findMany({
            orderBy: {
                startDate: "desc",
            },
        })
        return historyParkingSpots
    } catch (error) {
        console.error("Error fetching parking spots:", error)
        throw error // This will allow React Query to handle the error
    }
}

export const fetchUser = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error) {
        console.error("Failed to fetch user on the server:", error)
        return null
    }
    return data.user
}
