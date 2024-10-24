'use server';
import { getSession } from "@/hooks/useSupabase";
import db from "@/lib/db";
import { ParkingFormSchema } from "@/schemas/parking-form-schema";
import { createClient } from "@/utils/supabase/server";
export async function createParkingSpot(parkingFormData: ParkingFormSchema) {
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
                    hourlyRate: parkingFormData.price,
                    description: parkingFormData.description,
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
