'use client';
import React, { useState, useEffect } from "react";
import {
    AdvancedMarker,
    Map,
    MapCameraChangedEvent,
    MapProps,
    Pin
} from "@vis.gl/react-google-maps";
import useGeolocation from "react-hook-geolocation";
import { useTheme } from "next-themes";
import { useFooterState } from "@/hooks/useFooterState";
import { useParkingSpots } from "@/hooks/useParkingSpots";

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
    const geolocation = useGeolocation();
    const theme = useTheme();
    const { data: parkingSpots, isLoading, isError, error } = useParkingSpots();  // Call the hook at the top level
    const [, setFooterState] = useFooterState();
    const [center, setCenter] = useState<{ lat: number; lng: number }>({
        lat: geolocation.latitude || initial.lat,
        lng: geolocation.longitude || initial.lng,
    });

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
        if (!parkingSpots) {
            return null;
        }
        
        const parkingSpot = parkingSpots.find(spot => spot.id === parkingId);
        if (parkingSpot) {
            console.log(parkingSpot);
            const constantOffset = 0.008; // Constant value to offset the pin lower
            setCenter({
                lat: parkingSpot.latitude - constantOffset, // Adjust latitude downwards with a constant offset
                lng: parkingSpot.longitude // Keep the longitude the same for horizontal centering
            });
            setFooterState(prev => ({
                mode: { mode: "detail", id: parkingId },
                size: prev.size === "collapsed" ? "open" : prev.size // Open only if it was collapsed
            }));
        }
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
            {/* User location marker */}
            {geolocation.latitude && geolocation.longitude && (
                <AdvancedMarker position={{ lat: geolocation.latitude, lng: geolocation.longitude }}>
                    <Pin />
                </AdvancedMarker>
            )}
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
                    <Pin />
                </AdvancedMarker>
            ))}
            {children}
        </Map>
    );
};
