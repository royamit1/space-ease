'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { useFooterState } from "@/hooks/useFooterState";
import { SearchFooter } from "@/components/search-footer";
import { CreateFooter } from "@/components/create-footer";
import { DetailFooter } from "@/components/detail-footer";
import { ParkingSpot } from "@/prisma/generated/client";
import { useParkingSpotById } from "@/hooks/useParkingSpots";

const initialHeight = {
    collapsed: "auto",
    open: "45vh",
    full: "100vh",
}

export const Footer: React.FC = () => {
    const [footerState, setFooterState] = useFooterState((state) => state);
    const [selectedParking, setSelectedParking] = useState<ParkingSpot | null>(null);
    const constraintsRef = useRef(null);

    // Fetch the parking spot if in detail mode
    const { data: parkingData, isError, isLoading } = useParkingSpotById(
        footerState.mode.mode === "detail" ? footerState.mode.id : null
    );

    useEffect(() => {
        if (footerState.mode.mode === "detail" && parkingData) {
            setSelectedParking(parkingData);
        }
    }, [footerState.mode, parkingData]);

    // Handle drag event and change state when drag ends
    const handleDragEnd = (_: any, info: PanInfo) => {
        const yOffset = info.offset.y;
        const isUp = yOffset < -50;
        const isDown = yOffset > 50;

        if (footerState.size === "collapsed" && isUp) {
            setFooterState({ ...footerState, size: "open" });
        } else if (footerState.size === "open") {
            if (isUp) setFooterState({ ...footerState, size: "full" });
            else if (isDown) setFooterState({ ...footerState, size: "collapsed" });
        } else if (footerState.size === "full" && isDown) {
            setFooterState({ ...footerState, size: "collapsed" });
        }
    }

    const renderFooterContent = () => {
        switch (footerState.mode.mode) {
            case "create":
                return <CreateFooter />;
            case "detail":
                return selectedParking ? (
                    <DetailFooter parkingSpot={selectedParking} />
                ) : isLoading ? (
                    <div>Loading...</div>
                ) : isError ? (
                    <div>Error loading parking spot.</div>
                ) : null;
            case "search":
                return <SearchFooter />;
            default:
                return null;
        }
    };

    return (
        <div ref={constraintsRef} className="fixed bottom-0 w-full p-3 my-3 z-10">
            <motion.div
                drag="y"
                dragConstraints={constraintsRef}
                onDragEnd={handleDragEnd}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="bg-background min-h-12 rounded-3xl flex flex-col items-center justify-start overflow-hidden"
                style={{ maxHeight: "calc(100vh - 7rem)" }}
                animate={{ height: initialHeight[footerState.size] }}
            >
                <div className="h-1.5 w-24 md:w-48 xl:w-96 m-3 rounded-full cursor-grab active:cursor-grabbing bg-muted" />
                {footerState.size !== "collapsed" && renderFooterContent()}
            </motion.div>
        </div>
    );
}
