import { useQuery } from "@tanstack/react-query"

export const fetchUser = async (): Promise<any | null> => {
    try {
        const response = await fetch("/api/auth/user", {
            method: "GET",
            credentials: "include", // Ensures cookies are included in the request
        })

        if (!response.ok) {
            throw new Error(`Error fetching user: ${response.statusText}`)
        }

        return await response.json()
    } catch (error: any) {
        console.error("Error in fetchUser:", error)
        return null
    }
}

export const useUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => fetchUser(),
        refetchOnWindowFocus: false, // Prevent refetching on window focus
    })
}
