import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params

    if (!id) {
        return NextResponse.json({ message: "Missing id parameter" }, { status: 400 })
    }

    try {
        const parkingSpot = await db.parkingSpot.findUnique({
            where: {
                id: parseInt(id, 10),
            },
        })

        if (!parkingSpot) {
            return NextResponse.json({ message: "Parking spot not found" }, { status: 404 })
        }

        return NextResponse.json(parkingSpot, { status: 200 })
    } catch (error: any) {
        console.error("Error fetching parking spot by id: ", error)
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
    }
}
