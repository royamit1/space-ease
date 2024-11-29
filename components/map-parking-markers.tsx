import React, { useEffect, useMemo, useState } from "react"
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps"
import { useParkingSpots } from "@/hooks/useParkingSpots"
import { useFooterState } from "@/hooks/useFooterState"
import { motion } from "framer-motion"
import { calculateDistance } from "@/utils/utils"

interface MapParkingMarkersProps {}

export const MapParkingMarkers: React.FC<MapParkingMarkersProps> = () => {
    const map = useMap()
    const [filters, _] = useFooterState((state) => state.filters)
    const { data: parkingSpots } = useParkingSpots(filters)
    const [selectedParkingId, setFooterState] = useFooterState((state) =>
        state.mode.mode === "detail" ? state.mode.id : null,
    )
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null)

    // Get the user's location and save to local storage
    useEffect(() => {
        const storedLocation = localStorage.getItem("userLocation")
        if (storedLocation) {
            setUserLocation(JSON.parse(storedLocation))
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    const location = { latitude, longitude }
                    setUserLocation(location)
                    localStorage.setItem("userLocation", JSON.stringify(location))
                },
                (error) => {
                    console.error("Error fetching user location:", error)
                },
            )
        }
    }, [])

    const selectedParking = useMemo(() => {
        if (parkingSpots && selectedParkingId) {
            return parkingSpots.find((spot) => spot.id === selectedParkingId)
        }
    }, [selectedParkingId, parkingSpots])

    // Move the map to the selected parking spot
    useEffect(() => {
        if (selectedParking && map) {
            map.moveCamera({
                center: {
                    lat: selectedParking.latitude + -0.015,
                    lng: selectedParking.longitude,
                },
                zoom: 14,
            })
        }
    }, [selectedParking, map])

    // Filter parking spots by distance
    const filteredParkingSpots = useMemo(() => {
        if (userLocation && filters.maxDistance) {
            return parkingSpots?.filter((spot) => {
                const distance = calculateDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    spot.latitude,
                    spot.longitude,
                )
                if (filters.maxDistance) {
                    return distance <= filters.maxDistance
                }
            })
        }
        return parkingSpots
    }, [parkingSpots, userLocation, filters.maxDistance])

    // Handle pin click to open DetailFooter
    const handlePinClick = (parkingId: number) => {
        setFooterState({ mode: { mode: "detail", id: parkingId }, size: "open" })
    }

    return filteredParkingSpots?.map((parking) => (
        <AdvancedMarker
            key={parking.id}
            position={{ lat: parking.latitude, lng: parking.longitude }}
            onClick={() => handlePinClick(parking.id)}
        >
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: selectedParkingId === parking.id ? 1.3 : 1,
                    opacity: 1,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <div className="relative">
                    <div className="w-11 h-11 bg-white rounded-full border-2 border-orange-600 shadow-lg flex items-center justify-center">
                        <div className="text-black font-bold text-sm">${parking.hourlyRate}</div>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-orange-800" />
                </div>
            </motion.div>
        </AdvancedMarker>
    ))
}
