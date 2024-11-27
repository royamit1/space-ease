"use client"

import React, { useEffect, useState } from "react"
import { Map, MapCameraChangedEvent, MapProps } from "@vis.gl/react-google-maps"
import useGeolocation from "react-hook-geolocation"
import { useTheme } from "next-themes"
import { useFooterStore } from "@/hooks/useFooterState"
import { UserMarker } from "@/components/user-marker"
import { AnimatePresence, motion } from "framer-motion"
import CurrentLocationMarker from "@/components/current-location-marker"
import { MapParkingMarkers } from "@/components/map-parking-markers"
import LatLngBoundsLiteral = google.maps.LatLngBoundsLiteral

interface MyMapProps extends MapProps {
    children: React.ReactNode
    searchCoordinates?: { lat: number; lng: number } | null
}

const initial = {
    lat: 32.07656832175795,
    lng: 34.783993916688004,
    zoom: 14,
}

const BOUNCE_CHANGE_DEBOUNCE = 100
export const MyMap: React.FC<MyMapProps> = ({ children, searchCoordinates, ...props }) => {
    const theme = useTheme()
    const store = useFooterStore()
    const [bounds, setBounds] = useState<LatLngBoundsLiteral | null>(null)

    useEffect(() => {
        const token = setTimeout(() => {
            if (bounds) store.setState({ filters: { bounds } })
        }, BOUNCE_CHANGE_DEBOUNCE)
        return () => clearTimeout(token)
    }, [bounds])

    const [searchKey, setSearchKey] = useState(0)

    const [hasSetCurrentLocation, setHasSetCurrentLocation] = useState(false)
    const geolocation = useGeolocation()

    useEffect(() => {
        if (geolocation && hasSetCurrentLocation) {
            setHasSetCurrentLocation(true)
        }
    }, [geolocation])

    // Update the map center when new search coordinates are provided
    useEffect(() => {
        if (searchCoordinates) {
            setSearchKey((prevKey) => prevKey + 1) // Increment the key to force re-render
        }
    }, [searchCoordinates])

    // Collapse the footer when the user interacts with the map
    const handleMapInteraction = () => {
        store.setState({
            mode: { mode: "search" },
            size: "collapsed",
        })
    }

    const handleBoundsChange = (change: MapCameraChangedEvent) => {
        setBounds(change.detail.bounds)
    }

    return (
        <Map
            style={{ width: "100vw", height: "100vh", color: "black", zIndex: 0 }}
            mapId="my-map"
            defaultZoom={initial.zoom}
            defaultCenter={{ lat: initial.lat, lng: initial.lng }}
            disableDefaultUI={true}
            colorScheme={theme.resolvedTheme?.toUpperCase()}
            onDragstart={handleMapInteraction}
            onClick={handleMapInteraction}
            onBoundsChanged={handleBoundsChange}
            {...props}
        >
            <UserMarker />
            <AnimatePresence>
                {searchCoordinates && (
                    <motion.div key={`search-${searchKey}`}>
                        <CurrentLocationMarker position={searchCoordinates} isSearch={true} />
                    </motion.div>
                )}
            </AnimatePresence>
            <MapParkingMarkers />
            <div className="text-foreground">{children}</div>
        </Map>
    )
}
