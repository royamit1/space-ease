import React from "react"
import { useParkingImagesById } from "@/hooks/useImages"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

interface ParkingSpotImagesProps {
    parkingSpotId: number
}

export const ParkingSpotImagesSkeleton = () => {
    return (
        <div>
            <h4 className="mb-2">
                <Skeleton className="w-48 h-6 max-w-full" />
            </h4>
            <div className="flex justify-between overflow-auto">
                {Array.from({ length: 1 }).map((_, index) => (
                    <Skeleton key={index} style={{ height: 180, width: 220 }} />
                ))}
            </div>
        </div>
    )
}

export const ParkingSpotImages: React.FC<ParkingSpotImagesProps> = ({ parkingSpotId }) => {
    const { data: images, error } = useParkingImagesById(parkingSpotId)

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>An error occurred while fetching images. Please try again later.</AlertDescription>
            </Alert>
        )
    }

    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            className="w-full h-full"
        >
            <CarouselContent>
                {images ? (
                    images.map((image) => (
                        <CarouselItem key={image.id}>
                            <Image
                                src={image.url}
                                alt="Parking Spot"
                                width={300}
                                height={300}
                                className="mx-auto w-48 h-48 lg:w-64 xl:w-96 lg:h-64 xl:h-96 object-cover"
                            />
                        </CarouselItem>
                    ))
                ) : (
                    <CarouselItem>
                        <Skeleton className="mx-auto w-48 h-48 lg:w-64 xl:w-96 lg:h-64 xl:h-96" />
                    </CarouselItem>
                )}
                {images?.length === 0 && (
                    <CarouselItem>
                        <Card className="mx-auto w-48 h-48 lg:w-64 xl:w-96 lg:h-64 xl:h-96">
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                <span className="text-4xl font-semibold">No Images</span>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                )}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-0 z-10" />
            <CarouselNext className="absolute top-1/2 right-0 z-10" />
        </Carousel>
    )
}
