import { ActiveRent } from "@/prisma/generated/client"
import { differenceInMilliseconds } from "date-fns"

export const calculateTotalCost = (activeRent: ActiveRent, now: Date) => {
    const rentDuration = differenceInMilliseconds(now, activeRent.createdAt)
    return activeRent.hourlyRate * (rentDuration / 1000 / 60 / 60)
}
