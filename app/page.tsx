'use client'

import React from "react";
import {MyMap} from "@/components/my-map";
import {APIProvider} from "@vis.gl/react-google-maps";
import {Header} from "@/components/header";

export default function Index() {
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}>
            <MyMap disableDefaultUI={true}>
                <Header className="fixed top-0 px-7 pt-3 " />
            </MyMap>
        </APIProvider>
    )
}
