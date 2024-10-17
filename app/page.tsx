'use client'

import React from "react";
import {MyMap} from "@/components/my-map";
import {APIProvider} from "@vis.gl/react-google-maps";

export default function Index() {
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}>
            <MyMap disableDefaultUI={false} />
        </APIProvider>
    )
}
