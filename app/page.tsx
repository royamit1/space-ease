'use client'

import React, {useState} from "react";
import {MyMap} from "@/components/my-map";
import {APIProvider} from "@vis.gl/react-google-maps";
import {Header} from "@/components/header";
import {Footer, FooterState} from "@/components/footer";

export default function Index() {
    const [footerState, setFooterState] = useState<FooterState>("collapsed")
    return (
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}>
            <MyMap disableDefaultUI={true}>
                <Header className="fixed top-0 px-7 pt-3 "/>
                <Footer header={<h1 onClick={() => setFooterState("open")}>Hello world</h1>} state={footerState}>
                    <div className="flex-grow bg-green-500 w-full"/>
                    <p className="text-center text-sm m-3" onClick={() => setFooterState("collapsed")}>
                        &copy; 2024 Space-Ease. All rights reserved.
                    </p>
                </Footer>
            </MyMap>
        </APIProvider>
    )
}
