'use client';
import { createParkingSpot, fetchAvailableParkingSpots, fetchParkingSpotById } from "@/app/actions";
import { ParkingFormSchema } from "@/schemas/parking-form-schema";
import { ParkingSpot } from "@/prisma/generated/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"



const useParkingSpots = () => {
    const parkingSpotsQuery = useQuery({
        queryKey: ['parkingSpots'],
        queryFn: () => fetchAvailableParkingSpots(),
        refetchOnWindowFocus: false,
    })
    return parkingSpotsQuery;
}

const useParkingSpotById = (id: number | null) => {
    return useQuery({
        queryKey: ['parkingSpots', id],
        queryFn: () => fetchParkingSpotById(id!),
        enabled: !!id,  // Only run if `id` is not null or undefined
    });
};

/**
 * react query to fetch filtered parking spots and listen to changes on filter dependency
 * @returns filtered parking spots
 */
// const useParkingSpots = (filters: FooterFilters, geolocation: { latitude: number, longitude: number }) => {
//     return useQuery({
//       queryKey: ['parkingSpots', filters, geolocation.latitude, geolocation.longitude],
//       queryFn: () => fetchFilteredParkingSpots(
//         filters,
//         geolocation.latitude || 0,
//         geolocation.longitude || 0
//       ),
//       refetchOnWindowFocus: false,
//       enabled: !!geolocation.latitude && !!geolocation.longitude, // Only run the query when we have the user's location
//     });
//   }


const useParkingMutation = () => {
    const queryClient = useQueryClient();
    const newParkingMutation = useMutation({
        mutationFn: (parkingFormData: ParkingFormSchema) => {
            return createParkingSpot(parkingFormData);
        },
        onSuccess: () => {
            console.log("created parking with react query !");
            queryClient.invalidateQueries({ queryKey: ["parkingSpots"] });
        },
        onError: (error) => {
            console.error("Error creating parking spot: ", error)
        }
    })

    return newParkingMutation;
}

export { useParkingSpots, useParkingMutation, useParkingSpotById };