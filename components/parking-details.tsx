import React, { useMemo } from "react"
import { AlertCircle, Clock, DollarSign, Info, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useParkingSpotById } from "@/hooks/useParkingSpots"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ParkingSpotImages, ParkingSpotImagesSkeleton } from "@/components/parking-spot-images"
import { Skeleton } from "@/components/ui/skeleton"
import { calculateDistance } from "@/utils/utils"
import useGeolocation from "react-hook-geolocation"
import { format, isSameDay } from "date-fns"

interface ParkingDetailsProps {
    parkingSpotId: number
}

const LoadingSkeleton = () => (
    <div className="w-full h-full shadow-lg flex flex-col">
        <div className="max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-full">
            <div className="flex-shrink-0 mb-4 ps-4">
                <div className="flex items-center gap-3 mb-2">
                    <Skeleton className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                    <h3>
                        <Skeleton className="w-48 h-4 sm:w-64 sm:h-5 lg:w-96 lg:h-6" />
                    </h3>
                </div>
                <div className="inline-flex items-center px-2.5 py-0.5 mt-2">
                    <Skeleton className="w-16 h-4 sm:w-24 lg:w-32" />
                </div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 p-3 mb-4">
                <div className="sm:col-span-1 md:col-span-2">
                    <div className="border rounded-lg">
                        <div className="relative p-4 sm:p-5 lg:p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Skeleton className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary" />
                                <h4>
                                    <Skeleton className="w-24 h-4 sm:w-32 lg:w-40" />
                                </h4>
                            </div>
                            <div>
                                <Skeleton className="w-36 h-4 sm:w-48 lg:w-64" />
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-lg">
                        <div className="relative p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <Skeleton className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary" />
                                <h4>
                                    <Skeleton className="w-24 h-4 sm:w-32 lg:w-40" />
                                </h4>
                            </div>
                            <div>
                                <Skeleton className="w-36 h-4 sm:w-48 lg:w-64" />
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-lg">
                        <div className="relative p-4 sm:p-5 lg:p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Skeleton className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
                                <h4>
                                    <Skeleton className="w-48 h-4 sm:w-32 lg:w-64" />
                                </h4>
                            </div>
                            <div>
                                <Skeleton className="w-36 h-4 sm:w-48 lg:w-64 mb-2" />
                                <Skeleton className="w-24 h-4 sm:w-36 lg:w-48" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-1 md:col-span-1">
                    <ParkingSpotImages parkingSpotId={0} />
                </div>
            </div>
        </div>
    </div>
)

const ParkingDetails: React.FC<ParkingDetailsProps> = ({ parkingSpotId }) => {
    const geolocation = useGeolocation()
    const { data: parkingSpot, error } = useParkingSpotById(parkingSpotId)

    const distance = useMemo(() => {
        if (!geolocation.longitude) return null
        if (!geolocation.latitude) return null
        if (!parkingSpot) return null
        return calculateDistance(
            geolocation.latitude,
            geolocation.longitude,
            parkingSpot.latitude,
            parkingSpot.longitude,
        )
    }, [geolocation, parkingSpot])

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    An error occurred while fetching parking spot. Please try again later.
                </AlertDescription>
            </Alert>
        )
    }

    if (parkingSpot) {
        return (
            <div className="flex flex-col">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={container}
                    className="max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-full"
                >
                    <motion.div variants={item} className="flex-shrink-0 mb-4 px-4">
                        <div className="flex items-center gap-3 mb-2">
                            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary" />
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                                {parkingSpot.address}
                            </h3>
                        </div>
                        <Badge variant="secondary" className="mx-2 mt-2 px-4 text-sm sm:text-sm lg:text-lg">
                            Available Now
                        </Badge>
                        <Badge variant="secondary" className="mx-2 mt-2 px-4 text-sm sm:text-sm lg:text-lg">
                            {distance !== null ? `${distance.toFixed(2)} km` : "..."}
                        </Badge>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 ">
                        <div className="sm:col-span-1 md:col-span-2">
                            <motion.div initial="hidden" animate="show" variants={container} className="p-3 space-y-1">
                                <motion.div variants={item}>
                                    <Card className="relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent group-hover:opacity-75 transition-opacity" />
                                        <div className="relative p-3 sm:p-4 lg:p-5">
                                            <div className="flex items-center gap-3">
                                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
                                                <span className="text-sm sm:text-base lg:text-lg font-medium">
                                                    {isSameDay(
                                                        new Date(parkingSpot.startTime),
                                                        new Date(parkingSpot.endTime),
                                                    ) ? (
                                                        <>
                                                            {/* Same day: display date once and show time range */}
                                                            {format(
                                                                new Date(parkingSpot.startTime),
                                                                "dd MMM yyyy, HH:mm",
                                                            )}{" "}
                                                            - {format(new Date(parkingSpot.endTime), "HH:mm")}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {/* Different days: display full date and time for both */}
                                                            {format(
                                                                new Date(parkingSpot.startTime),
                                                                "dd MMM yyyy, HH:mm",
                                                            )}{" "}
                                                            -{" "}
                                                            {format(
                                                                new Date(parkingSpot.endTime),
                                                                "dd MMM yyyy, HH:mm",
                                                            )}
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                                <div className="grid grid-cols-1 gap-1 md:grid-cols-1">
                                    <motion.div variants={item}>
                                        <Card className="relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent group-hover:opacity-75 transition-opacity" />
                                            <div className="relative p-3 sm:p-4 lg:p-5">
                                                <div className="flex items-center gap-3">
                                                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
                                                    <span className="text-sm sm:text-base lg:text-lg font-medium">
                                                        {parkingSpot.hourlyRate.toFixed(2)}/hour
                                                    </span>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                    <motion.div variants={item}>
                                        <Card className="relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent group-hover:opacity-75 transition-opacity" />
                                            <div className="relative p-3 sm:p-4 lg:p-5">
                                                <div className="flex items-center gap-3">
                                                    <Info className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
                                                    <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                                                        <span className="text-sm sm:text-base lg:text-lg font-medium">
                                                            {parkingSpot.description || "No description provided."}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="px-3 sm:col-span-1 md:col-span-1 w-full h-48 lg:h-64 xl:h-96 mb-4">
                            <ParkingSpotImages parkingSpotId={parkingSpot.id} />
                        </div>
                    </div>
                </motion.div>
            </div>
        )
    }
    return <LoadingSkeleton />
}

export default ParkingDetails
