import { useQuery } from "@tanstack/react-query"
import { ParkingSpot, RentalHistory } from "@/prisma/generated/client"

export interface RentalHistoryListItem extends RentalHistory {
    parkingSpot: ParkingSpot
}

export const fetchRentHistory = async (): Promise<RentalHistoryListItem[]> => {
    try {
        const response = await fetch("/api/rentals/history", {
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

export const useRentHistory = () => {
    return useQuery({
        queryKey: ["historyParkingSpots"],
        queryFn: () => fetchRentHistory(),
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    })
}
