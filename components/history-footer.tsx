'use client'

import {HistoryParkingList} from "@/components/history-list";
import React from "react";
import {useHistoryParkingSpots} from "@/hooks/useParkingSpots";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";
import GradualSpacing from "@/components/ui/gradual-spacing";
import {Separator} from "@/components/ui/separator";

export const HistoryFooter: React.FC = () => {
    const {data: historyParkingSpots, error} = useHistoryParkingSpots();

    return (
        <div className="flex flex-col w-full h-full">
            <div className="p-3">
                <GradualSpacing
                    className="text-lg font-bold -tracking-widest text-black dark:text-white md:text-2xl"
                    text="History of Parking Spots"
                    delayMultiple={0.03}/>
            </div>
            <Separator/>
            {historyParkingSpots && (
                <HistoryParkingList
                    historyParkingSpots={historyParkingSpots}
                />
            )}
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        An error occurred while fetching parking spots. Please try again later.
                    </AlertDescription>
                </Alert>
            )}
            {!historyParkingSpots && !error && (
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600 font-medium">Loading, please wait...</span>
                </div>
            )}
        </div>
    )
}