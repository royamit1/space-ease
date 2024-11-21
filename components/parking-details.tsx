import React from 'react';
import {Clock, DollarSign, Info, MapPin} from 'lucide-react';
import {motion} from 'framer-motion';
import {Card} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import { ParkingImage, ParkingSpot } from "@/prisma/generated/client";
import Image from "next/image";

interface ParkingDetailsProps {
    parkingSpot: ParkingSpot;
    parkingImages: ParkingImage[] | undefined;
}

const ParkingDetails: React.FC<ParkingDetailsProps> = ({parkingSpot, parkingImages}) => {
    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const container = {
        hidden: {opacity: 0},
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: {y: 20, opacity: 0},
        show: {y: 0, opacity: 1}
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="max-w-2xl mx-auto p-6"
        >
            {/* Header Section */}
            <motion.div variants={item} className="flex-shrink-0 mb-4">
                <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-6 h-6 text-primary"/>
                    <h3 className="text-2xl font-bold tracking-tight">{parkingSpot.address}</h3>
                </div>
                <Badge variant="secondary" className="mt-2">
                    Available Now
                </Badge>
            </motion.div>

            {/* Two-column Grid for Parking Spot Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Left Column: Available Hours */}
                <motion.div variants={item}>
                    <Card className="relative overflow-hidden group">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent group-hover:opacity-75 transition-opacity"
                        />
                        <div className="relative p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Clock className="w-5 h-5 text-primary"/>
                                <h4 className="font-semibold">Available Hours</h4>
                            </div>
                            <p className="text-lg font-medium">
                                {formatTime(parkingSpot.startTime)} - {formatTime(parkingSpot.endTime)}
                            </p>
                        </div>
                    </Card>
                </motion.div>

                {/* Right Column: Hourly Rate */}
                <motion.div variants={item}>
                    <Card className="relative overflow-hidden group">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent group-hover:opacity-75 transition-opacity"
                        />
                        <div className="relative p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <DollarSign className="w-5 h-5 text-primary"/>
                                <h4 className="font-semibold">Hourly Rate</h4>
                            </div>
                            <p className="text-lg font-medium">
                                ${parkingSpot.hourlyRate.toFixed(2)}/hour
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Full-width Spot Details Section */}
            <motion.div variants={item}>
                <Card className="relative overflow-hidden group">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent group-hover:opacity-75 transition-opacity"
                    />
                    <div className="relative p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Info className="w-5 h-5 text-primary"/>
                            <h4 className="font-semibold">Spot Details</h4>
                        </div>
                        <div className="prose prose-sm max-w-none">
                            <p className="text-muted-foreground leading-relaxed">
                                {parkingSpot.description || "No description provided."}
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.div>

            <div className="mt-4">
                <h4 className="text-lg font-semibold text-[var(--foreground)] mb-2">Parking Spot Images</h4>
                <div className="flex gap-4 overflow-auto">
                    {Array.isArray(parkingImages) && parkingImages.length > 0 ? (
                        parkingImages.map((image) => (
                            <Image
                                key={image.id}
                                src={image.url}
                                alt="Parking Spot"
                                width={120}
                                height={120}
                                className="rounded object-cover"
                            />
                        ))
                    ) : (
                        <p className="text-sm text-[var(--muted-foreground)]">
                            No images available for this parking spot.
                        </p>
                    )}
                </div>
            </div>


        </motion.div>


    );
};

export default ParkingDetails;
