import { NextResponse } from "next/server"
import db from "@/lib/db"
import { createClient } from "@/utils/supabase/server"

// POST request handler for creating a parking spot
export async function POST(req: Request) {
    try {
        const supabase = createClient()

        // Parse incoming request data
        const parkingFormData = await req.json()

        // Authenticate the user
        const { data: user, error } = await supabase.auth.getUser()
        if (error || !user) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 })
        }

        // Create a new parking spot in the database
        const parkingSpot = await db.parkingSpot.create({
            data: {
                userId: user.user.id,
                latitude: parkingFormData.latitude,
                longitude: parkingFormData.longitude,
                address: parkingFormData.address,
                description: parkingFormData.description,
                hourlyRate: parkingFormData.price,
                startTime: new Date(parkingFormData.availableFrom),
                endTime: new Date(parkingFormData.availableUntil),
            },
        })

        // Add parking images, if any
        if (parkingFormData.imageUrls?.length) {
            await db.parkingImage.createMany({
                data: parkingFormData.imageUrls.map((url: string) => ({
                    parkingSpotId: parkingSpot.id,
                    url,
                })),
            })
        }

        return NextResponse.json({ parkingSpot }, { status: 201 })
    } catch (err: any) {
        console.error("Error creating parking spot:", err)
        return NextResponse.json({ message: "Failed to create parking spot", error: err.message }, { status: 500 })
    }
}
