import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import db from "@/lib/db"
import { calculateTotalCost } from "@/lib/rent"

export async function POST(req: NextRequest) {
    const supabase = createClient()
    try {
        // Access cookies to retrieve session
        const { data, error } = await supabase.auth.getUser()

        if (error || !data || !data.user) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
        }

        // Find and delete the active rental
        const activeRent = await db.activeRent.delete({
            where: { userId: data.user.id },
        })

        if (!activeRent) {
            return NextResponse.json({ error: "No active rental found" }, { status: 404 })
        }

        // Calculate the total cost
        const totalCost = calculateTotalCost(activeRent, new Date())

        // Create a rental history entry
        await db.rentalHistory.create({
            data: {
                userId: activeRent.userId,
                parkingSpotId: activeRent.parkingSpotId,
                startDate: activeRent.createdAt,
                totalCost: totalCost,
            },
        })

        return NextResponse.json({ message: "Rental ended successfully", totalCost }, { status: 200 })
    } catch (err: any) {
        console.error(err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
