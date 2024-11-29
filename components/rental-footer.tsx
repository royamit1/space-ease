import React, { useMemo } from "react"
import { AlertCircle, CheckCircle, Clock, DollarSign, MapPin, XCircle } from "lucide-react"
import { ConfirmationButton } from "@/components/common/confirmation-button"
import { ActiveRent } from "@/prisma/generated/client"
import { formatDistance } from "date-fns"
import { endRenting } from "@/hooks/useRentals"
import { useQueryClient } from "@tanstack/react-query"
import { useFooterStore } from "@/hooks/useFooterState"
import { useNow } from "@/hooks/useNow"
import { calculateTotalCost } from "@/lib/rent"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import wazeIcon from "@/assets/waze-icon.svg"
import googleMapsIcon from "@/assets/google-maps-icon.svg"
import { ParkingSpotImages } from "@/components/parking-spot-images"
import { useParkingSpotById } from "@/hooks/useParkingSpotById"
import Image from "next/image"

export const RentalFooter: React.FC<{ activeRent: ActiveRent }> = ({ activeRent }) => {
    const footerStore = useFooterStore()
    const queryClient = useQueryClient()
    const now = useNow(5000)
    const { data: parkingSpot, isLoading, error } = useParkingSpotById(activeRent.parkingSpotId)

    const [totalCost, rentalDurationText] = useMemo(() => {
        const totalCost = calculateTotalCost(activeRent, now)
        const rentalDurationText = formatDistance(now, activeRent.createdAt)
        return [totalCost, rentalDurationText]
    }, [activeRent, now])

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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary font-semibold">
                    Loading...
                </motion.div>
            </div>
        )
    }

    if (error || !parkingSpot) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6">
                <Card className="p-6 bg-destructive/10">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="w-6 h-6 text-destructive" />
                        <p className="font-semibold text-destructive">
                            {error?.message || "Active parking spot is not found."}
                        </p>
                    </div>
                </Card>
            </motion.div>
        )
    }

    const handleGoogleMapNav = () => {
        window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(parkingSpot.address)}`,
            "_blank",
        )
    }

    const handleWazeNav = () => {
        const { latitude, longitude } = parkingSpot
        window.open(`https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`, "_blank")
    }

    const handleLeaveParking = async () => {
        await endRenting()
        await queryClient.invalidateQueries({ queryKey: ["activeRent"] })
        footerStore.setState({ mode: { mode: "search" }, size: "collapsed" })
    }

    return (
        <div className="w-full h-full flex flex-col px-4">
            <motion.div initial="hidden" animate="show" variants={container}>
                <div className="flex w-full mx-auto items-center justify-center gap-3 p-3">
                    <CheckCircle className="w-12 h-12 text-primary animate-pulse" />
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">Parking Spot Rented!</h3>
                    <div className="flex flex-row gap-2">
                        <Button
                            className="flex w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 lg:w-15 lg:h-15 rounded-full"
                            onClick={handleGoogleMapNav}
                        >
                            <span className="sr-only">Google Maps</span>
                            <Image
                                src={googleMapsIcon}
                                alt=""
                                width={40}
                                height={40}
                                className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 lg:w-15 lg:h-15"
                            />
                        </Button>

                        <Button
                            className="flex w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 lg:w-15 lg:h-15 rounded-full"
                            onClick={handleWazeNav}
                        >
                            <span className="sr-only">Waze</span>
                            <Image
                                src={wazeIcon}
                                alt=""
                                width={40}
                                height={40}
                                className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 lg:w-15 lg:h-15"
                            />
                        </Button>
                    </div>
                </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 ">
                <div className="sm:col-span-1 md:col-span-2">
                    <motion.div initial="hidden" animate="show" variants={container} className="p-3 space-y-2">
                        <motion.div variants={item}>
                            <Card className="relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent group-hover:opacity-75 transition-opacity" />
                                <div className="relative p-3 sm:p-4 lg:p-5">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
                                        <span className="text-sm sm:text-base lg:text-lg font-medium">
                                            {parkingSpot.address}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-2 md:grid-cols-1">
                            <motion.div variants={item}>
                                <Card className="relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent group-hover:opacity-75 transition-opacity" />
                                    <div className="relative p-3 sm:p-4 lg:p-5">
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
                                            <span className="text-sm sm:text-base lg:text-lg font-medium">
                                                {rentalDurationText}
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>

                            <motion.div variants={item}>
                                <Card className="relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent group-hover:opacity-75 transition-opacity" />
                                    <div className="relative p-3 sm:p-4 lg:p-5">
                                        <div className="flex items-center gap-3">
                                            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
                                            <span className="text-sm sm:text-base lg:text-lg font-medium">
                                                $
                                                <AnimatedNumber
                                                    value={totalCost}
                                                    precision={2}
                                                    stiffness={75}
                                                    damping={15}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                <div className="p-3 sm:col-span-1 md:col-span-1">
                    <ParkingSpotImages parkingSpotId={parkingSpot.id} />
                </div>
            </div>
            <div className="flex-grow "></div>
            <div className="flex p-3">
                <ConfirmationButton
                    variant="outline"
                    className="w-full items-center justify-center bg-primary text-primary-foreground"
                    onClick={handleLeaveParking}
                >
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 " />
                    <span className="text-sm sm:text-base lg:text-lg">Leave Parking</span>
                </ConfirmationButton>
            </div>
        </div>
    )
}

export default RentalFooter
