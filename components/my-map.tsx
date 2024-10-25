import React, { useState, useEffect } from "react";
import {
    AdvancedMarker,
    Map,
    MapCameraChangedEvent,
    MapProps,
    Pin
} from '@vis.gl/react-google-maps';
import useGeolocation from "react-hook-geolocation";
import { useTheme } from "next-themes";
import { fetchParkingSpots } from "@/app/actions";

interface MyMapProps extends MapProps {
    children: React.ReactNode;
    searchCoordinates?: { lat: number; lng: number } | null;
}

const initial = {
    "lat": 32.07656832175795,
    "lng": 34.783993916688004,
    "zoom": 14
}

export const MyMap: React.FC<MyMapProps> = ({ children, searchCoordinates, ...props }) => {
    const geolocation = useGeolocation();
    const theme = useTheme();

    const [center, setCenter] = useState<{ lat: number; lng: number }>({
        lat: geolocation.latitude || initial.lat,
        lng: geolocation.longitude || initial.lng,
    });

    // State to store parking spots
    const [parkingSpots, setParkingSpots] = useState<Array<parkingSpot>>([]);

    // Update the map center when new search coordinates are provided
    useEffect(() => {
        if (searchCoordinates) {
            setCenter(searchCoordinates);
        }
    }, [searchCoordinates]);

    type parkingSpot = {
        id: number;
        userId: String;
        latitude: number;
        longitude: number;
        description: String;
        hourlyRate: number;
        startTime: Date;
        endTime: Date;
        createdAt: Date;
        updatedAt: Date;
    }

    // Fetch parking spots and set in state
    useEffect(() => {
        const getAllParkingSpots = async () => {
            const spots : parkingSpot[] = await fetchParkingSpots();
            setParkingSpots(spots);
        };
        getAllParkingSpots();
    }, []);

    // Handle center change to allow user interaction
    const handleBoundsChanged = (event: MapCameraChangedEvent) => {
        const newCenter = event.detail.center;
        if (newCenter) {
            setCenter({ lat: newCenter.lat, lng: newCenter.lng });
        }
    };

    return (
        <Map
            style={{ width: '100vw', height: '100vh', zIndex: 0 }}
            mapId="my-map"
            center={center}
            defaultZoom={initial.zoom}
            disableDefaultUI={false}
            colorScheme={theme.resolvedTheme?.toUpperCase()}
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
            {parkingSpots.map((spot, index) => (
                <AdvancedMarker key={index} position={{ lat: spot.latitude, lng: spot.longitude }}>
                    <Pin />
                </AdvancedMarker>
            ))}

            {children}
        </Map>
    );
};
