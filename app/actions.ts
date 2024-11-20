'use server';
import db from "@/lib/db";
import { ParkingFormSchema } from "@/schemas/parking-form-schema";
import { createClient } from "@/utils/supabase/server";
import { ActiveRent, ParkingSpot, RentalHistory } from "@/prisma/generated/client";
import { calculateTotalCost } from "@/lib/rent";

const supabase = createClient();

export const createParkingSpot = async (parkingFormData: ParkingFormSchema & { imageUrls: string[] }) => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error("User not authenticated");

    try {
        const parkingSpot = await db.parkingSpot.create({
            data: {
                userId: data.user.id,
                latitude: parkingFormData.latitude,
                longitude: parkingFormData.longitude,
                address: parkingFormData.address,
                description: parkingFormData.description,
                hourlyRate: parkingFormData.price,
                startTime: new Date(parkingFormData.availableFrom),
                endTime: new Date(parkingFormData.availableUntil),
            },
        });

        // Add parking images
        if (parkingFormData.imageUrls?.length) {
            await db.parkingImage.createMany({
                data: parkingFormData.imageUrls.map((url) => ({
                    parkingSpotId: parkingSpot.id,
                    url,
                })),
            });
        }

        return { parkingSpot };
    } catch (err) {
        console.error("Error creating parking spot:", err);
        throw new Error("Failed to create parking spot");
    }
};


export const fetchAvailableParkingSpots = async (filters?: { priceRange?: string; userId?: string }) => {
    try {
        // filter by available parking spots
        const now = new Date();
        const whereClause: any = {
            startTime: { lte: now },
            endTime: { gte: now },
        };

        // Add price range filter
        if (filters?.priceRange) {
            switch (filters.priceRange) {
                case "$":
                    whereClause.hourlyRate = { lt: 20 }; // Example: Cheap (< $20)
                    break;
                case "$$":
                    whereClause.hourlyRate = { gte: 20, lt: 50 }; // Example: Moderate ($20-$50)
                    break;
                case "$$$":
                    whereClause.hourlyRate = { gte: 50 }; // Example: Expensive (>= $50)
                    break;
            }
        }

        // Add user-owned parking spots filter
        if (filters?.userId) {
            whereClause.userId = filters.userId;
        }

        const parkingSpots: ParkingSpot[] = await db.parkingSpot.findMany({ where: whereClause });
        return parkingSpots;
    } catch (error) {
        console.error("Error fetching parking spots:", error);
        throw error;
    }
};


export const fetchHistoryParkingSpots = async () => {
    try {
        const historyParkingSpots: RentalHistory[] = await db.rentalHistory.findMany({
            orderBy: {
                startDate: 'desc',
            },
        });
        return historyParkingSpots;
    } catch (error) {
        console.error("Error fetching parking spots:", error);
        throw error; // This will allow React Query to handle the error
    }
};

export const fetchParkingSpotById = async (id: number) => {
    try {
        const singleParking = await db.parkingSpot.findUnique({
            where: {
                id: id
            },
        })
        return singleParking;
    } catch (error) {
        console.error("Error fetching parking spot by id : ", error);
        throw error;
    }
}

export const fetchParkingImagesById = async (id: number) => {
    try {
        const parkingImages = await db.parkingImage.findMany({
            where: {
                parkingSpotId: id
            },
        })
        return parkingImages;
    } catch (error) {
        console.error("error fetching parking spot images by id", error);
        throw error;
    }
}

export const startRenting = async (parkingSpotId: number) => {
    const { data, error } = await supabase.auth.getUser();
    if (error)
        throw error;

    if (!data || !data.user)
        throw new Error("User not authenticated");

    const parkingSpot = await db.parkingSpot.findUnique({ where: { id: parkingSpotId } })
    if (!parkingSpot)
        throw new Error("Parking spot not found");

    await db.activeRent.create({
        data: {
            userId: data.user.id,
            parkingSpotId,
            hourlyRate: parkingSpot.hourlyRate,
        },
    })
}


export const endRenting = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error)
        throw error;

    if (!data || !data.user)
        throw new Error("User not authenticated");

    const activeRent = await db.activeRent.delete({ where: { userId: data.user.id } })
    const totalCost = calculateTotalCost(activeRent, new Date())

    await db.rentalHistory.create({
        data: {
            userId: activeRent.userId,
            parkingSpotId: activeRent.parkingSpotId,
            startDate: activeRent.createdAt,
            totalCost: totalCost,
        }
    })
}

export const getActiveRent = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error)
        return null

    if (!data || !data.user)
        return null

    return db.activeRent.findUnique({ where: { userId: data.user.id } });
}

export const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.error("Failed to fetch user on the server:", error);
        return null;
    }
    return data.user;
};