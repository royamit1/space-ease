import { ParkingImage } from "@/prisma/generated/client"
import { useQuery } from "@tanstack/react-query"

export const fetchParkingImagesById = async (id: number): Promise<ParkingImage[]> => {
    try {
        const response = await fetch(`/api/parking/${id}/images`, {
            method: "GET",
        })

        if (!response.ok) {
            throw new Error(`Error fetching parking images: ${response.statusText}`)
        }

        return await response.json()
    } catch (error: any) {
        console.error("Error in fetchParkingImagesById:", error)
        throw error
    }
}

export const useParkingImagesById = (id: number | null) => {
    return useQuery({
        queryKey: ["parkingSpotImages", id],
        queryFn: async () => await fetchParkingImagesById(id!),
        enabled: !!id, // Query runs only if id is defined
    })
}
