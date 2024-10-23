'use client'

import React, { useState } from "react";
import {MyMap} from "@/components/my-map";
import {APIProvider} from "@vis.gl/react-google-maps";
import {Header} from "@/components/header";
import {SearchFooter} from "@/components/search-footer";
import Script from "next/script";

export default function Index() {
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

    const handleSearch = (lat: number, lng: number) => {
        setCoordinates({ lat, lng });
    };

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}>
            {/* Load the Google Maps JavaScript API with the Places library */}
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
                strategy="beforeInteractive"
            />
            <MyMap searchCoordinates={coordinates ?? { lat: 0, lng: 0 }} disableDefaultUI={true}>
                <Header className="fixed top-0 px-7 pt-3 " onSearch={handleSearch}/>
                <SearchFooter/>
            </MyMap>
        </APIProvider>
    )
}
