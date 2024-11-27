import { useQuery } from "@tanstack/react-query"
import { RentalHistory } from "@/prisma/generated/client"

export const fetchHistoryParkingSpots = async (): Promise<RentalHistory[]> => {
    try {
        const response = await fetch("/api/parking/history", {
            method: "GET",
        })

        if (!response.ok) {
            throw new Error(`Error fetching history parking spots: ${response.statusText}`)
        }

        return await response.json()
    } catch (error: any) {
        console.error("Error in fetchHistoryParkingSpots:", error)
        throw error
    }
}

export const useHistoryParkingSpots = () => {
    return useQuery({
        queryKey: ["historyParkingSpots"],
        queryFn: () => fetchHistoryParkingSpots(),
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    })
}
