import React from "react";
import {useParkingImagesById} from "@/hooks/useParkingSpots";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";
import Image from "next/image";

interface ParkingSpotImagesProps {
    parkingSpotId: number;
}

export const ParkingSpotImages: React.FC<ParkingSpotImagesProps> = ({parkingSpotId}) => {
    const {data: images, error} = useParkingImagesById(parkingSpotId);

    if (error) {
        return <Alert variant="destructive">
            <AlertCircle className="h-4 w-4"/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                An error occurred while fetching images. Please try again later.
            </AlertDescription>
        </Alert>
    }

    if (images) {
        return (
            <div className="mt-4">
                <h4 className="text-lg font-semibold text-[var(--foreground)] mb-2">Parking Spot Images</h4>
                <div className="flex gap-4 overflow-auto">
                    {images.length <= 0 ? (
                        <p className="text-sm text-[var(--muted-foreground)]">
                            No images available for this parking spot.
                        </p>
                    ) : (
                        images.map((image) => (
                            <Image
                                key={image.id}
                                src={image.url}
                                alt="Parking Spot"
                                width={120}
                                height={120}
                                className="rounded object-cover"
                            />
                        ))
                    )}
                </div>
            </div>
        )
    }

    return <div>
        Loading...
    </div>
};