import React from "react";
import {Map, MapProps} from '@vis.gl/react-google-maps';

interface MyMapProps extends MapProps {
}

const initial = {
    "lat": 32.07656832175795,
    "lng": 34.783993916688004,
    "zoom": 14
}
export const MyMap: React.FC<MyMapProps> = (props) => {
    return <Map
        style={{width: '100vw', height: '100vh'}}
        defaultCenter={{lat: initial.lat, lng: initial.lng}}
        defaultZoom={initial.zoom}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        {...props}
    />
}