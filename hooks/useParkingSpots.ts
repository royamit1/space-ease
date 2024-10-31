'use client';
import { fetchAvailableParkingSpots } from "@/app/actions";
import { useQuery } from "@tanstack/react-query"

const useParkingSpots = () => {
    const result = useQuery({
        queryKey: ['parkingSpots'],
        queryFn: () => fetchAvailableParkingSpots(),
    })

    return result;
}

export default useParkingSpots