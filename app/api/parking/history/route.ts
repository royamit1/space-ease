import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
    try {
        const historyParkingSpots = await db.rentalHistory.findMany({
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
