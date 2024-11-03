'use server';
import db from "@/lib/db";
import { ParkingFormSchema } from "@/schemas/parking-form-schema";
import { createClient } from "@/utils/supabase/server";
import { ParkingSpot } from "@/prisma/generated/client";
import { FooterFilters } from "@/hooks/useFooterState";
import { date } from "zod";

type parkingSpotNDist = {
    id: number
    userId: String
    latitude: number
    longitude: number
    address: String
    description: String
    hourlyRate: number
    startTime: Date
    endTime: Date
    createdAt: Date
    updatedAt: Date
    distance: number
}


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

const fetchParkingSpotById = async (id: number) => {
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

/**
 * 
 * @param filters filters for parking spots include distance, price and availability
 * @param userLat user latitude for user selected location
 * @param userLng user longitude for user selected location
 * @returns filtered parking spots
 */
const fetchFilteredParkingSpots = async (filters: FooterFilters, userLat: number, userLng: number) => {
    const { distance = 5, price, availability = 'all' } = filters

    let whereClause: any = {}

    if (availability) {
        const date = new Date();
        whereClause.endTime = { lte: date }
        whereClause.startTime = { gte: date }
    }

    if (price !== undefined) {
        whereClause.hourlyRate = { lte: price }
    }

    const parkingSpots: parkingSpotNDist[] = await db.$queryRaw`
      SELECT *, 
        ST_Distance(
          ST_MakePoint(longitude, latitude)::geography,
          ST_MakePoint(${userLng}, ${userLat})::geography
        ) as distance
      FROM "ParkingSpot"
      WHERE ${whereClause}
        AND ST_DWithin(
          ST_MakePoint(longitude, latitude)::geography,
          ST_MakePoint(${userLng}, ${userLat})::geography,
          ${distance * 1000}
        )
      ORDER BY distance
    `

    return parkingSpots
}

export { createParkingSpot, fetchAvailableParkingSpots, fetchParkingSpotById, fetchFilteredParkingSpots }
