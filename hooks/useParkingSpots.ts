"use client"
import { fetchHistoryParkingSpots, fetchParkingImagesById } from "@/app/actions"
import { ParkingSpotFilters } from "@/utils/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { ParkingSpot } from "@/prisma/generated/client"

export async function fetchAvailableParkingSpots(
    filters: ParkingSpotFilters,
    signal: AbortSignal,
): Promise<ParkingSpot[]> {
    try {
        const queryParams = new URLSearchParams()
        queryParams.set("north", filters.bounds.north.toString())
        queryParams.set("south", filters.bounds.south.toString())
        queryParams.set("east", filters.bounds.east.toString())
        queryParams.set("west", filters.bounds.west.toString())

        if (filters.priceRange) {
            queryParams.set("priceRange", filters.priceRange)
        }
        if (filters.userId) {
            queryParams.set("userId", filters.userId.toString())
        }
        const response = await fetch(`/api/parking?${queryParams.toString()}`, {
            method: "GET",
            signal,
        })

        if (!response.ok) {
            throw new Error(`Error fetching parking spots: ${response.statusText}`)
        }

        return await response.json()
    } catch (error: any) {
        console.error("Error in fetchAvailableParkingSpots:", error)
        throw error
    }
}

export const useParkingSpots = (filters: ParkingSpotFilters) => {
    const queryClient = useQueryClient()
    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ["parkingSpots"] })
    }, [filters])
    const parkingSpotsQuery = useQuery({
        queryKey: ["parkingSpots"],
        queryFn: async ({ signal }) => await fetchAvailableParkingSpots(filters, signal),
        refetchOnWindowFocus: false,
        refetchInterval: 10000, // Refetch every 10 seconds
    })
    return parkingSpotsQuery
}

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

export const useParkingImagesById = (id: number | null) => {
    return useQuery({
        queryKey: ["parkingSpotImages", id],
        queryFn: async () => await fetchParkingImagesById(id!),
        enabled: !!id,
    })
}

export const useHistoryParkingSpots = () => {
    const historyParkingSpotsQuery = useQuery({
        queryKey: ["historyParkingSpots"],
        queryFn: async () => await fetchHistoryParkingSpots(),
        refetchOnWindowFocus: false,
    })
    return historyParkingSpotsQuery
}
