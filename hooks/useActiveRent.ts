import { useQuery } from "@tanstack/react-query"
import { useAuthStatus } from "./useAuthStatus"

export const fetchActiveRent = async () => {
    const response = await fetch("/api/rentals/active", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch active rent")
    }

    const data = await response.json()
    return data.activeRent
}

export const useActiveRent = () => {
    const isLoggedIn = useAuthStatus()

    return useQuery({
        queryKey: ["activeRent"],
        queryFn: () => fetchActiveRent(),
        refetchInterval: 10000,
        enabled: isLoggedIn,
    })
}
