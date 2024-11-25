import React from "react"
import { useParkingImagesById } from "@/hooks/useParkingSpots"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

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

    if (images) {
        return (
            <div className="w-full flex justify-center items-center relative">
                <div className="w-full">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {images.map((image) => (
                                <CarouselItem key={image.id} className="pl-2 md:pl-4 basis-full">
                                    <div className="relative aspect-square overflow-hidden rounded-xl">
                                        <Image
                                            src={image.url}
                                            alt="Parking Spot"
                                            fill
                                            className="object-cover transition-transform duration-300 hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 -left-4 z-10" />
                        <CarouselNext className="absolute top-1/2 -translate-y-1/2 -right-4 z-10" />
                    </Carousel>

                    {/* Mobile Indicator */}
                    <p className="text-xs text-muted-foreground text-center mt-2">Swipe to view more images</p>
                </div>
            </div>
        )
    }

    return <ParkingSpotImagesSkeleton />
}
