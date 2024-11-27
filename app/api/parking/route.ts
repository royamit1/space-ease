import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const north = searchParams.get("north")
        const south = searchParams.get("south")
        const east = searchParams.get("east")
        const west = searchParams.get("west")
        const priceRange = searchParams.get("priceRange")
        const userId = searchParams.get("userId")

        if (!(north && south && west && east)) {
            return NextResponse.json({ message: "Missing bounds parameter" }, { status: 400 })
        }

        const now = new Date()

        const whereClause: any = {
            startTime: { lte: now },
            endTime: { gte: now },
            latitude: { lte: Number.parseFloat(north), gte: Number.parseFloat(south) },
            longitude: { lte: Number.parseFloat(east), gte: Number.parseFloat(west) },
            ActiveRent: { none: {} },
        }

        // Add price range filter
        if (priceRange) {
            switch (priceRange) {
                case "$":
                    whereClause.hourlyRate = { lt: 20 }
                    break
                case "$$":
                    whereClause.hourlyRate = { gte: 20, lt: 50 }
                    break
                case "$$$":
                    whereClause.hourlyRate = { gte: 50 }
                    break
                default:
                    return NextResponse.json({ message: "Invalid price range" }, { status: 400 })
            }
        }

        // Add user-owned parking spots filter
        if (userId) {
            whereClause.userId = parseInt(userId, 10)
        }

        const parkingSpots = await db.parkingSpot.findMany({
            where: whereClause,
        })

        return NextResponse.json(parkingSpots, { status: 200 })
    } catch (error: any) {
        console.error("Error fetching parking spots:", error)
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
    }
}
