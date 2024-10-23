import React, { useState, useEffect, useRef } from "react";
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
    searchCoordinates?: { lat: number; lng: number };
}

const initial = {
    "lat": 32.07656832175795,
    "lng": 34.783993916688004,
    "zoom": 14
}
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
            setCenter(searchCoordinates);
        }
    }, [searchCoordinates]);

    // Handle center change to allow user interaction
    const handleBoundsChanged = (event: MapCameraChangedEvent) => {
        const newCenter = event.detail.center; // Use the center property from the event
        if (newCenter) {
            setCenter({ lat: newCenter.lat, lng: newCenter.lng }); // Access lat and lng from the center
        }
    };

    return <Map
        style={{ width: '100vw', height: '100vh', zIndex: 0  }}
        mapId="my-map"
        defaultCenter={{lat: geolocation.latitude || initial.lat, lng: geolocation.longitude || initial.lng}}
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