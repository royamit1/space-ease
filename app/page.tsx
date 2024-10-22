'use client'

import React from "react";
import {MyMap} from "@/components/my-map";
import {APIProvider} from "@vis.gl/react-google-maps";
import {Header} from "@/components/header";
import {SearchFooter} from "@/components/search-footer";
import Script from "next/script";

export default function Index() {
    return (
        <>
            {/* Load the Google Maps JavaScript API with the Places library */}
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
                strategy="beforeInteractive"
            />
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}>
                <MyMap disableDefaultUI={true}>
                    <Header className="fixed top-0 px-7 pt-3 "/>
                    <SearchFooter/>
                </MyMap>
            </APIProvider>
        </>

    )
}
