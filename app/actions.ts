'use server'

import {ParkingFormSchema} from "@/schemas/parking-form-schema";
import {db} from "@/db";
import {parkingTable} from "@/db/schema";

export async function createParkingSpot(data: ParkingFormSchema) {
    // @ts-ignore
    await db.insert(parkingTable).values({
        address: "Dan is the king",
        longitude: 0,
        latitude: 0,
        availableFrom: new Date(),
        availableUntil: new Date(),
        price: 10,
    })
}