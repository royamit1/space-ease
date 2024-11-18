'use client';
import {
    createParkingSpot,
    fetchAvailableParkingSpots,
    fetchHistoryParkingSpots,
    fetchParkingSpotById
} from "@/app/actions";
import {ParkingFormSchema} from "@/schemas/parking-form-schema";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"


const useParkingSpots = (filters?: { priceRange?: string; userId?: string }) => {
    const parkingSpotsQuery = useQuery({
        queryKey: ['parkingSpots', filters],
        queryFn: () => fetchAvailableParkingSpots(filters),
        refetchOnWindowFocus: false,
    });
    return parkingSpotsQuery;
};


const useHistoryParkingSpots = () => {
    const historyParkingSpotsQuery = useQuery({
        queryKey: ['historyParkingSpots'],
        queryFn: () => fetchHistoryParkingSpots(),
        refetchOnWindowFocus: false,
    })
    return historyParkingSpotsQuery;
}

const useParkingSpotById = (id: number | null) => {
    return useQuery({
        queryKey: ['parkingSpots', id],
        queryFn: () => fetchParkingSpotById(id!),
        enabled: !!id,  // Only run if `id` is not null or undefined
    });
};


const useParkingMutation = () => {
    const queryClient = useQueryClient();
    const newParkingMutation = useMutation({
        mutationFn: (parkingFormData: ParkingFormSchema) => {
            return createParkingSpot(parkingFormData);
        },
        onSuccess: () => {
            console.log("created parking with react query !");
            queryClient.invalidateQueries({queryKey: ["parkingSpots"]});
        },
        onError: (error) => {
            console.error("Error creating parking spot: ", error)
        }
    })

    return newParkingMutation;
}

export {useParkingSpots, useParkingMutation, useParkingSpotById, useHistoryParkingSpots};