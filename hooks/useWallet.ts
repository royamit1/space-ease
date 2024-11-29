import { ParkingSpot, RentalHistory } from "@/prisma/generated/client"
import { useQuery } from "@tanstack/react-query"

export interface WalletListItem extends RentalHistory {
    parkingSpot: ParkingSpot
}

export const fetchOwnedRentalHistory = async (): Promise<WalletListItem[]> => {
    const response = await fetch("/api/rentals/wallet", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!response.ok) {
        throw new Error("Failed to fetch rental history")
    }

    return response.json()
}

export function useWallet() {
    return useQuery({
        queryKey: ["ownedRentalHistory"],
        queryFn: () => fetchOwnedRentalHistory(),
    })
}
