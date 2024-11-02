'use client';

import React, {useEffect, useState} from "react";
import {AdvancedMarker, Map, MapCameraChangedEvent, MapProps, Pin} from "@vis.gl/react-google-maps";
import useGeolocation from "react-hook-geolocation";
import {useTheme} from "next-themes";
import {useFooterState} from "@/hooks/useFooterState";
import {useParkingSpots} from "@/hooks/useParkingSpots";
import {UserMarker} from "@/components/user-marker";
import { motion } from 'framer-motion'

interface MyMapProps extends MapProps {
    children: React.ReactNode;
    searchCoordinates?: { lat: number; lng: number } | null;
}

const initial = {
    lat: 32.07656832175795,
    lng: 34.783993916688004,
    zoom: 14
};

export const MyMap: React.FC<MyMapProps> = ({ children, searchCoordinates, ...props }) => {
    const theme = useTheme();
    const { data: parkingSpots, isLoading, isError, error } = useParkingSpots();  // Call the hook at the top level
    const [selectedParkingId, setFooterState] = useFooterState(state => state.mode.mode === "detail" ? state.mode.id : null);

    const geolocation = useGeolocation();
    const [center, setCenter] = useState<{ lat: number; lng: number }>({
        lat: geolocation.latitude || initial.lat,
        lng: geolocation.longitude || initial.lng,
    });

    useEffect(() => {
        if (parkingSpots === undefined) return;
        const parking = parkingSpots.find(parking => parking.id === selectedParkingId);
        if (parking === undefined) return;
        setCenter({
            lat: parking.latitude,
            lng: parking.longitude,
        })
    }, [selectedParkingId]);

    // Update the map center when new search coordinates are provided
    useEffect(() => {
        if (searchCoordinates) {
            setCenter(searchCoordinates);
        }
    }, [searchCoordinates]);

    // Handle center change to allow user interaction
    const handleBoundsChanged = (event: MapCameraChangedEvent) => {
        const newCenter = event.detail.center;
        if (newCenter) {
            setCenter({ lat: newCenter.lat, lng: newCenter.lng });
        }
    };

    // Function to handle pin click and open DetailFooter
    const handlePinClick = (parkingId: number) => {
        setFooterState({mode: {mode: "detail", id: parkingId}, size: "open"})
    };

    // Collapse the footer when the user interacts with the map
    const handleMapInteraction = () => {
        setFooterState({
            mode: { mode: "search" },
            size: "collapsed",
        });
    };

    if (isLoading) return <div>Loading...</div>;

    if (isError) return <div>Error: {JSON.stringify(error)}</div>;

    return (
        <Map
            style={{ width: '100vw', height: '100vh', zIndex: 0 }}
            mapId="my-map"
            center={center}
            defaultZoom={initial.zoom}
            disableDefaultUI={false}
            colorScheme={theme.resolvedTheme?.toUpperCase()}
            onBoundsChanged={handleBoundsChanged}
            onDragstart={handleMapInteraction}
            onClick={handleMapInteraction}
            {...props}
        >
            <UserMarker />
            {searchCoordinates && (
                <AdvancedMarker position={searchCoordinates}>
                    <Pin />
                </AdvancedMarker>
            )}
            {/* Render markers for each parking spot */}
            {parkingSpots?.map(parking => (
                <AdvancedMarker
                    key={parking.id}
                    position={{ lat: parking.latitude, lng: parking.longitude }}
                    onClick={() => handlePinClick(parking.id)}
                >
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    >
                        <div className="relative">
                            <div
                                className="w-11 h-11 bg-white rounded-full border-2 border-blue-800 shadow-lg flex items-center justify-center"
                            >
                                <div className="text-black font-bold text-sm">
                                    ${parking.hourlyRate}
                                </div>
                            </div>
                            <div
                                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-blue-800"
                            />
                        </div>
                    </motion.div>
                </AdvancedMarker>
            ))}

            {children}
        </Map>
    );
};
