import { useQuery } from "@tanstack/react-query"
import { ParkingSpot } from "@/prisma/generated/client"

export const fetchParkingSpotById = async (id: number): Promise<ParkingSpot> => {
    try {
        const response = await fetch(`/api/parking/${id}`, {
            method: "GET",
        })

        if (!response.ok) {
            throw new Error(`Error fetching parking spot: ${response.statusText}`)
        }

        return await response.json()
    } catch (error: any) {
        console.error("Error in fetchParkingSpotById:", error)
        throw error
    }
}
export const useParkingSpotById = (id: number | null) => {
    return useQuery({
        queryKey: ["parkingSpots", id],
        queryFn: async () => await fetchParkingSpotById(id!),
        enabled: !!id, // Only run if `id` is not null or undefined
    })
}
