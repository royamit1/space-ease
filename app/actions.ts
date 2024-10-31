'use server';
import db from "@/lib/db";
import { ParkingFormSchema } from "@/schemas/parking-form-schema";
import { createClient } from "@/utils/supabase/server";
import { ParkingSpot } from "@/prisma/generated/client";
import { date } from "zod";


const createParkingSpot = async (parkingFormData: ParkingFormSchema) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.error(error)
    } else {

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
            //     // Return the parking spot data to the front-end
            console.log(parkingSpot)
            return { parkingSpot };
        } catch (err) {
            console.error("Error creating parking spot:", err);
            return { error: "Failed to create parking spot" };
        }
    }
}

const fetchAvailableParkingSpots = async () => {
    try {
        const now = new Date();
        const parkingSpots: ParkingSpot[] = await db.parkingSpot.findMany({
            where: {
                startTime: { lte: now },
                endTime: { gte: now },
            },
        });
        return parkingSpots;
    } catch (error) {
        console.error("Error fetching parking spots:", error);
        throw error; // This will allow React Query to handle the error
    }
};

export { createParkingSpot, fetchAvailableParkingSpots }
