import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import db from "@/lib/db"

export async function POST(req: NextRequest) {
    const supabase = createClient()
    try {
        const { parkingSpotId } = await req.json()

        if (!parkingSpotId) {
            return NextResponse.json({ error: "Parking spot ID is required" }, { status: 400 })
        }

        const { data, error } = await supabase.auth.getUser()
        if (error) throw error

        if (!data || !data.user) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
        }

        const parkingSpot = await db.parkingSpot.findUnique({
            where: { id: parkingSpotId },
        })
        if (!parkingSpot) {
            return NextResponse.json({ error: "Parking spot not found" }, { status: 404 })
        }

        const existingRent = await db.activeRent.findFirst({
            where: { parkingSpotId },
        })

        if (existingRent) {
            return NextResponse.json({ error: "Parking spot unavailable" }, { status: 409 })
        }

        await db.activeRent.create({
            data: {
                userId: data.user.id,
                parkingSpotId,
                hourlyRate: parkingSpot.hourlyRate,
            },
        })

        return NextResponse.json({ message: "Rental started successfully" }, { status: 201 })
    } catch (err: any) {
        console.error(err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
