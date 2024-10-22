'use server'

import {ParkingFormSchema} from "@/schemas/parking-form-schema";

export async function createParkingSpot(data: ParkingFormSchema) {
    console.log(data)
}