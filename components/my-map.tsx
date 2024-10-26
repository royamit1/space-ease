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
import { fetchAvailableParkingSpots } from "@/app/actions";
import { createClient } from "@/utils/supabase/client";
import { ParkingSpot } from "@prisma/client";

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
    const { resolvedTheme } = useTheme();
    const supabase = createClient();

    const [center, setCenter] = useState<{ lat: number; lng: number }>({
        lat: geolocation.latitude || initial.lat,
        lng: geolocation.longitude || initial.lng,
    });

    // State to store parking spots
    const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);

    // Fetch initial parking spots and set up Supabase subscription
    useEffect(() => {

        const fetchSpots = async () => {
            const spots = await fetchAvailableParkingSpots();
            setParkingSpots(spots);
        };

        fetchSpots();

        const subscription = supabase
            .channel("parkingSpot-changes")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "ParkingSpot",
                },
                (payload) => {
                    const newSpot = payload.new as ParkingSpot;
                    console.log("New spot:", newSpot);

                    if (isValidParkingSpot(newSpot)) {
                        setParkingSpots((prevSpots) => [...prevSpots, newSpot]);
                    } else {
                        console.error("Invalid parking spot data:", newSpot);
                    }
                }
            )
            .subscribe();

        // Cleanup function to unsubscribe
        return () => {
            supabase.removeChannel(subscription);
        };
    }, [supabase]);

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

    // Function to validate parking spot data
    const isValidParkingSpot = (spot: ParkingSpot): boolean => {
        return (
            typeof spot.latitude === "number" &&
            typeof spot.longitude === "number" &&
            !isNaN(spot.latitude) &&
            !isNaN(spot.longitude)
        );
    };

    return (
        <Map
            style={{ width: "100vw", height: "100vh", zIndex: 0 }}
            mapId="my-map"
            center={center}
            defaultZoom={initial.zoom}
            disableDefaultUI={false}
            colorScheme={resolvedTheme?.toUpperCase()}
            onBoundsChanged={handleBoundsChanged}
            {...props}
        >
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

            {/* Render a marker for each parking spot */}
            {parkingSpots.map((spot) => (
                <AdvancedMarker
                    key={spot.id}
                    position={{ lat: spot.latitude, lng: spot.longitude }}
                >
                    <Pin />
                </AdvancedMarker>
            ))}

            {children}
        </Map>
    );
};
