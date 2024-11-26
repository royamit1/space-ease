"use client"
import {
    createParkingSpot,
    fetchAvailableParkingSpots,
    fetchHistoryParkingSpots,
    fetchParkingSpotById,
    fetchParkingImagesById,
} from "@/app/actions"
import { ParkingSpotFilters } from "@/utils/types"
import { ParkingFormSchema } from "@/schemas/parking-form-schema"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const useParkingSpots = (filters?: ParkingSpotFilters) => {
    const parkingSpotsQuery = useQuery({
        queryKey: ["parkingSpots", filters],
        queryFn: () => fetchAvailableParkingSpots(filters || {}),
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

const useParkingMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (parkingFormData: ParkingFormSchema & { imageUrls: string[] }) =>
            createParkingSpot(parkingFormData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["parkingSpots"] })
        },
        onError: (error) => {
            console.error("Error creating parking spot:", error)
        },
    })
}

export { useParkingSpots, useParkingMutation, useParkingSpotById, useHistoryParkingSpots, useParkingImagesById }
