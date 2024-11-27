"use client"
import {
    fetchAvailableParkingSpots,
    fetchHistoryParkingSpots,
    fetchParkingImagesById,
    fetchParkingSpotById,
} from "@/app/actions"
import { ParkingSpotFilters } from "@/utils/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

const useParkingSpots = (filters: ParkingSpotFilters) => {
    const queryClient = useQueryClient()
    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ["parkingSpots"] })
    }, [filters])
    const parkingSpotsQuery = useQuery({
        queryKey: ["parkingSpots"],
        queryFn: () => fetchAvailableParkingSpots(filters),
        refetchOnWindowFocus: false,
        refetchInterval: 10000, // Refetch every 10 seconds
    })
    return parkingSpotsQuery
}

const useHistoryParkingSpots = () => {
    const historyParkingSpotsQuery = useQuery({
        queryKey: ["historyParkingSpots"],
        queryFn: () => fetchHistoryParkingSpots(),
        refetchOnWindowFocus: false,
    })
    return historyParkingSpotsQuery
}

const useParkingSpotById = (id: number | null) => {
    return useQuery({
        queryKey: ["parkingSpots", id],
        queryFn: () => fetchParkingSpotById(id!),
        enabled: !!id, // Only run if `id` is not null or undefined
    })
}

const useParkingImagesById = (id: number | null) => {
    return useQuery({
        queryKey: ["parkingSpotImages", id],
        queryFn: () => fetchParkingImagesById(id!),
        enabled: !!id,
    })
}

export { useParkingSpots, useParkingSpotById, useHistoryParkingSpots, useParkingImagesById }
