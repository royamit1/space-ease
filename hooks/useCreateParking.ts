import { ParkingFormSchema } from "@/schemas/parking-form-schema"

export async function createParkingSpot(parkingFormData: ParkingFormSchema & { imageUrls: string[] }) {
    try {
        // Ensure the request includes `imageUrls` along with other form data
        const response = await fetch("/api/parking/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parkingFormData), // Includes imageUrls in the payload
        })

        if (!response.ok) {
            throw new Error(`Failed to create parking spot: ${response.statusText}`)
        }

        const data = await response.json()
        return data
    } catch (error: any) {
        console.error("Error creating parking spot:", error)
        throw error
    }
}
