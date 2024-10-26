import React, {useState, useEffect} from "react";
import {
    AdvancedMarker,
    Map,
    MapCameraChangedEvent,
    MapProps,
    Pin
} from '@vis.gl/react-google-maps';
import useGeolocation from "react-hook-geolocation";
import {useTheme} from "next-themes";
import {useParkingSpots} from "@/hooks/useParkingSpots";
import {useFooterState} from "@/hooks/useFooterState";

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
    const parkingSpots = useParkingSpots();
    const [, setFooterState] = useFooterState();  // Zustand setter for FooterState

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
            setCenter({lat: newCenter.lat, lng: newCenter.lng});
        }
    };

    // Function to handle pin click and open DetailFooter
    const handlePinClick = (parkingId: number) => {
        const parkingSpot = parkingSpots.find(spot => spot.id === parkingId);
        if (parkingSpot) {
            const constantOffset = 0.008; // Constant value to offset the pin lower
            setCenter({
                lat: parkingSpot.lat - constantOffset, // Adjust latitude downwards with a constant offset
                lng: parkingSpot.lng // Keep the longitude the same for horizontal centering
            });
        }
        setFooterState(prev => ({
            mode: { mode: "detail", id: parkingId },
            size: prev.size === "collapsed" ? "open" : prev.size // Open only if it was collapsed
        }));
    };

    // Collapse the footer when the user interacts with the map
    const handleMapInteraction = () => {
        setFooterState(prev => ({...prev, size: "collapsed"}));
    };

    return <Map
        style={{width: '100vw', height: '100vh', zIndex: 0}}
        mapId="my-map"
        center={center}
        defaultZoom={initial.zoom}
        disableDefaultUI={false}
        colorScheme={theme.resolvedTheme?.toUpperCase()}
        onBoundsChanged={handleBoundsChanged}
        onDragstart={handleMapInteraction}  // Collapse footer when user interacts with the map
        onClick={handleMapInteraction}
        {...props}
    >
        {/* User location marker */}
        {geolocation.latitude && geolocation.longitude && (
            <AdvancedMarker position={{lat: geolocation.latitude, lng: geolocation.longitude}}>
                <Pin/>
            </AdvancedMarker>
        )}
        {searchCoordinates && (
            <AdvancedMarker position={searchCoordinates}>
                <Pin/>
            </AdvancedMarker>
        )}
        {/* Render markers for each parking spot */}
        {parkingSpots.map(parking => (
            <AdvancedMarker
                key={parking.id}
                position={{lat: parking.lat, lng: parking.lng}}
                onClick={() => handlePinClick(parking.id)}  // Trigger detail mode on pin click
            >
                <Pin/>
            </AdvancedMarker>
        ))}
        {children}
    </Map>
}