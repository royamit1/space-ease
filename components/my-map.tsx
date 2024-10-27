import React, {useState, useEffect} from "react";
import {
    AdvancedMarker,
    Map,
    MapCameraChangedEvent,
    MapProps,
    Pin
} from "@vis.gl/react-google-maps";
import useGeolocation from "react-hook-geolocation";
import {useTheme} from "next-themes";
import {fetchAvailableParkingSpots} from "@/app/actions";
import {createClient} from "@/utils/supabase/client";
import {ParkingSpot} from "@prisma/client";
import {useFooterState} from "@/hooks/useFooterState";

interface MyMapProps extends MapProps {
    children: React.ReactNode;
    searchCoordinates?: { lat: number; lng: number } | null;
}

const initial = {
    lat: 32.07656832175795,
    lng: 34.783993916688004,
    zoom: 14
};

export const MyMap: React.FC<MyMapProps> = ({children, searchCoordinates, ...props}) => {
    const geolocation = useGeolocation();
    const supabase = createClient();
    const theme = useTheme()
    // const parkingSpots = useParkingSpots();
    const [, setFooterState] = useFooterState();  // Zustand setter for FooterState

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
            setCenter({lat: newCenter.lat, lng: newCenter.lng});
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
    // Function to handle pin click and open DetailFooter
    const handlePinClick = (parkingId: number) => {
        const parkingSpot = parkingSpots.find(spot => spot.id === parkingId);
        if (parkingSpot) {
            const constantOffset = 0.008; // Constant value to offset the pin lower
            setCenter({
                lat: parkingSpot.latitude - constantOffset, // Adjust latitude downwards with a constant offset
                lng: parkingSpot.longitude // Keep the longitude the same for horizontal centering
            });
        }
        setFooterState(prev => ({
            mode: {mode: "detail", id: parkingId},
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
                position={{lat: parking.latitude, lng: parking.longitude}}
                onClick={() => handlePinClick(parking.id)}  // Trigger detail mode on pin click
            >
                <Pin/>
            </AdvancedMarker>
        ))}
        {children}
    </Map>
}