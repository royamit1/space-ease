import useGeolocation from "react-hook-geolocation";
import {AdvancedMarker, Pin, useMap} from "@vis.gl/react-google-maps";
import React from "react";

export const UserMarker = () => {
    const geolocation = useGeolocation();

    if (!(geolocation.latitude && geolocation.longitude)) return;

    return (
        <AdvancedMarker position={{lat: geolocation.latitude, lng: geolocation.longitude}}>
            <Pin background={'#FBBC04'} />
        </AdvancedMarker>)
}