import React, { useState, useEffect } from "react";
import {
    AdvancedMarker,
    Map,
    MapCameraChangedEvent,
    MapProps,
    Pin
} from '@vis.gl/react-google-maps';
import useGeolocation from "react-hook-geolocation";
import {useTheme} from "next-themes";

interface MyMapProps extends MapProps {
    children: React.ReactNode;
    searchCoordinates?: { lat: number; lng: number } | null; // Allow null
}

const initial = {
    "lat": 32.07656832175795,
    "lng": 34.783993916688004,
    "zoom": 14
}

// This component uses react-hook-geolocation to get the user's current location and provides a map with the current location centered'
export const MyMap: React.FC<MyMapProps> = ({children, searchCoordinates, ...props}) => {
    const geolocation = useGeolocation();
    const theme = useTheme()

    const [center, setCenter] = useState<{ lat: number; lng: number }>({
        lat: geolocation.latitude || initial.lat,
        lng: geolocation.longitude || initial.lng,
    });

    // Update the map center when new search coordinates are provided
    useEffect(() => {
        if (searchCoordinates) {
            console.log("Centering map to:", searchCoordinates); // Debugging line
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

    return <Map
        style={{ width: '100vw', height: '100vh', zIndex: 0  }}
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
        {children}
    </Map>
}