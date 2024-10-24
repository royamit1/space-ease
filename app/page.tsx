'use client'

import React, { useState } from "react";
import {MyMap} from "@/components/my-map";
import {APIProvider} from "@vis.gl/react-google-maps";
import {Header} from "@/components/header";
import {SearchFooter} from "@/components/search-footer";
import Script from "next/script";


const parkingSpots = [
    { id: 1, name: 'Dizengoff Street 101, Tel Aviv', price: '$10', availability: 'Available: 9:00 - 16:00', lat: 32.080480, lng: 34.780527 },
    { id: 2, name: 'Rothschild Boulevard 20, Tel Aviv', price: '$15', availability: 'Available: 12:00 - 15:30', lat: 32.065556, lng: 34.775361 },
    { id: 3, name: 'Florentin Street 12, Tel Aviv', price: '$12', availability: 'Available: 10:00 - 20:00', lat: 32.056210, lng: 34.769918 },
];

export default function Index() {
    const [searchCoordinates, setSearchCoordinates] = useState<{ lat: number; lng: number } | undefined>(undefined);

    const handleSearch = (lat: number, lng: number) => {
        setSearchCoordinates({ lat, lng });
    };

    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}>
            {/* Load the Google Maps JavaScript API with the Places library */}
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
                strategy="beforeInteractive"
            />
            <MyMap searchCoordinates={searchCoordinates} parkingSpots={parkingSpots} disableDefaultUI={true}>
                <Header className="fixed top-0 px-7 pt-3 " onSearch={handleSearch}/>
                <SearchFooter/>
            </MyMap>
        </APIProvider>
    )
}
