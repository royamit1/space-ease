'use client';
import { createParkingSpot, fetchAvailableParkingSpots } from "@/app/actions";
import { ParkingFormSchema } from "@/schemas/parking-form-schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"



const useParkingSpots = () => {
    const result = useQuery({
        queryKey: ['parkingSpots'],
        queryFn: () => fetchAvailableParkingSpots(),
        refetchOnWindowFocus: false,
    })
    return result;
}

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

export { useParkingSpots, useParkingMutation };