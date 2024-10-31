import React, { useEffect, useState } from "react";
import { ParkingSpot } from "@/prisma/generated/client";
import ParkingDetails from "@/components/parking-details";

interface DetailFooterProps {
    parkingSpot: ParkingSpot;
}

export const DetailFooter: React.FC<DetailFooterProps> = ({ parkingSpot }) => {

    return (
        <div>
            <ParkingDetails
                parkingSpot={parkingSpot}
            />
        </div>
    );
};
