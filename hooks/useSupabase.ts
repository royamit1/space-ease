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

const fetchAuthUserById = async (userId: string) => {
    try {
        const response = await fetch(`/api/auth/user/${userId}`, {
            method: "GET",
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "Failed to fetch user")
        }

        const { user } = await response.json()
        return user
    } catch (error: any) {
        console.error("Error fetching user:", error.message)
        throw error
    }
}

export const useFetchUserById = (userId: string) => {
    return useQuery({
        queryKey: ["fetchUserById", userId],
        queryFn: () => fetchAuthUserById(userId),
        enabled: !!userId,
    })
}
