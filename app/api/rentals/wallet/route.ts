import { NextResponse } from "next/server"
import db from "@/lib/db"
import { createClient } from "@/utils/supabase/server"

export async function GET(req: Request) {
    try {
        const supabase = createClient()

        // Authenticate the user
        const { data, error } = await supabase.auth.getUser()
        if (error || !data.user) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 })
        }
        const userId = data.user.id
        // Fetch RentalHistory of all parking spots owned by the user
        const rentalHistory = await db.rentalHistory.findMany({
            where: {
                parkingSpot: {
                    userId, // Filter parking spots owned by the current user
                },
            },
            include: {
                parkingSpot: true, // Include details of the related parking spots
            },
        })

        return NextResponse.json(rentalHistory, { status: 200 })
    } catch (error) {
        console.error("Error fetching rental history:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
