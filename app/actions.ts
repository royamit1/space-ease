"use server"
import db from "@/lib/db"
import { createClient } from "@/utils/supabase/server"
import { RentalHistory } from "@/prisma/generated/client"
import { calculateTotalCost } from "@/lib/rent"

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

export const endRenting = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error

    if (!data || !data.user) throw new Error("User not authenticated")

    const activeRent = await db.activeRent.delete({
        where: { userId: data.user.id },
    })
    const totalCost = calculateTotalCost(activeRent, new Date())

    await db.rentalHistory.create({
        data: {
            userId: activeRent.userId,
            parkingSpotId: activeRent.parkingSpotId,
            startDate: activeRent.createdAt,
            totalCost: totalCost,
        },
    })
}

export const getActiveRent = async () => {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error) return null

    if (!data || !data.user) return null

    return db.activeRent.findUnique({ where: { userId: data.user.id } })
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
