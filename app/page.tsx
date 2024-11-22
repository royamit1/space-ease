"use client"

import React, { useState } from "react"
import { MyMap } from "@/components/my-map"
import { APIProvider } from "@vis.gl/react-google-maps"
import { Header } from "@/components/header"
import { FooterStoreProvider } from "@/hooks/useFooterState"
import { Footer } from "@/components/footer"
import Script from "next/script"
import "./styles/styles.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { FooterContent } from "@/components/footer-content"

const queryClient = new QueryClient()

export default function Index() {
    const [searchCoordinates, setSearchCoordinates] = useState<{ lat: number; lng: number } | undefined>(undefined)

    const handleSearch = (lat: number, lng: number) => {
        console.log("Search coordinates:", { lat, lng })
        setSearchCoordinates({ lat, lng })
    }

    return (
        <QueryClientProvider client={queryClient}>
            <FooterStoreProvider>
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}>
                    {/* Load the Google Maps JavaScript API with the Places library */}
                    <ReactQueryDevtools />
                    <Script
                        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
                        strategy="beforeInteractive"
                    />
                    <MyMap searchCoordinates={searchCoordinates}>
                        <Header className="fixed top-0 px-7 pt-3 " onSearch={handleSearch} />
                        <Footer>
                            <FooterContent />
                        </Footer>
                    </MyMap>
                </APIProvider>
            </FooterStoreProvider>
        </QueryClientProvider>
    )
}
