import { NextResponse } from "next/server"
import db from "@/lib/db"
import { createClient } from "@/utils/supabase/server"

export async function GET() {
    try {
        const supabase = createClient()

        // Authenticate the user
        const { data: user, error } = await supabase.auth.getUser()
        if (error || !user) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 })
        }
        const historyParkingSpots = await db.rentalHistory.findMany({
            where: { userId: user.user.id },
            orderBy: {
                startDate: "desc",
            },
        })

        return NextResponse.json(historyParkingSpots, { status: 200 })
    } catch (error: any) {
        console.error("Error fetching history parking spots:", error)
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
    }
}
