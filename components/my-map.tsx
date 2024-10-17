import React from "react";
import {AdvancedMarker, Map, MapProps, Pin} from '@vis.gl/react-google-maps';
import useGeolocation from "react-hook-geolocation";


interface MyMapProps extends MapProps {
    children: React.ReactNode;
}

const initial = {
    "lat": 32.07656832175795,
    "lng": 34.783993916688004,
    "zoom": 14
}
export const MyMap: React.FC<MyMapProps> = ({children, ...props}) => {
    const geolocation = useGeolocation();
    return <Map
        style={{width: '100vw', height: '100vh'}}
        mapId="my-map"
        defaultCenter={{lat: geolocation.latitude || initial.lat, lng: geolocation.longitude || initial.lng}}
        defaultZoom={initial.zoom}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        colorScheme="FOLLOW_SYSTEM"
        {...props}
    >
        {geolocation.latitude && geolocation.longitude && (
            <AdvancedMarker position={{lat: geolocation.latitude, lng: geolocation.longitude}}>
                <Pin />
            </AdvancedMarker>
        )}
        {children}
    </Map>
}