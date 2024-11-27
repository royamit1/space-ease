export const startRenting = async (parkingSpotId: number) => {
    try {
        const response = await fetch("/api/rentals/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ parkingSpotId }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "Failed to start renting")
        }

        return await response.json()
    } catch (error) {
        console.error("Error starting rental:", error)
        throw error
    }
}
