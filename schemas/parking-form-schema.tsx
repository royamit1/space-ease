import { z } from "zod"

export const parkingFormSchema = z
    .object({
        address: z.string().min(1).max(256),
        longitude: z.number(),
        latitude: z.number(),
        availableFrom: z.string().datetime(),
        availableUntil: z.string().datetime(),
        price: z.coerce.number().positive(),
        description: z.string().max(256),
    })
    .refine((data) => data.availableFrom <= data.availableUntil, {
        message: "Available until must be after available from",
        path: ["availableFrom", "availableUntil"],
    })
export type ParkingFormSchema = z.infer<typeof parkingFormSchema>
