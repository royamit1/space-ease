import React from "react";
import {AdvancedMarker, ControlPosition, Map, MapControl, MapProps, Pin} from '@vis.gl/react-google-maps';
import useGeolocation from "react-hook-geolocation";
import {useTheme} from "next-themes";


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
    const theme = useTheme()
    return <Map
        style={{ width: '100vw', height: '100vh', zIndex: 0  }}
        mapId="my-map"
        defaultCenter={{lat: geolocation.latitude || initial.lat, lng: geolocation.longitude || initial.lng}}
        defaultZoom={initial.zoom}
        disableDefaultUI={false}
        colorScheme={theme.resolvedTheme?.toUpperCase()}
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