import useGeolocation from "react-hook-geolocation";
import {AdvancedMarker} from "@vis.gl/react-google-maps";
import React from "react";
import { motion } from 'framer-motion'

export const UserMarker = () => {
    const geolocation = useGeolocation();

    if (!(geolocation.latitude && geolocation.longitude)) return;

    return (
        <AdvancedMarker position={{lat: geolocation.latitude, lng: geolocation.longitude}}>
            <motion.div
                initial={{scale: 0, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{type: 'spring', stiffness: 260, damping: 20}}
            >
                <div className="relative">
                    <div className="absolute -top-1 -left-1 w-8 h-8 bg-blue-500 rounded-full opacity-30 animate-ping"/>
                    <div className="relative w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg">
                        <div
                            className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"/>
                    </div>
                </div>
            </motion.div>
        </AdvancedMarker>
    )
}