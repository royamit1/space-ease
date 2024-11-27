import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params

    if (!id) {
        return NextResponse.json({ message: "Missing id parameter" }, { status: 400 })
    }

    try {
        const parkingImages = await db.parkingImage.findMany({
            where: {
                parkingSpotId: parseInt(id, 10),
            },
        })

        return NextResponse.json(parkingImages, { status: 200 })
    } catch (error: any) {
        console.error("Error fetching parking spot images by id:", error)
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
    }
}
