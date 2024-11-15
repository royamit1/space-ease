import React, {useState} from "react";
import {useFooterState} from "@/hooks/useFooterState";
import {useParkingSpotById} from "@/hooks/useParkingSpots";
import {AlertCircle, CheckCircle, Info, MapPin, StopCircle, XCircle} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {NavigationDialog} from "@/components/navigation-dialog";

export const RentalFooter: React.FC = () => {
    const [selectedParkingId, setFooterState] = useFooterState(state => state.mode.mode === "rent" ? state.mode.id : null);
    const {data: parkingSpot, isLoading, error} = useParkingSpotById(selectedParkingId);
    const [showNavigationDialog, setShowNavigationDialog] = useState(false);

    let rentalDuration = 0;
    let totalCost = 0;

    if (parkingSpot) {
        const startTime = new Date(parkingSpot.startTime);
        const endTime = new Date(parkingSpot.endTime);
        const hourlyRate = parkingSpot.hourlyRate;

        // Calculate the rental duration in hours
        rentalDuration = (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60;
        totalCost = rentalDuration * hourlyRate;
    }

    if (isLoading) {
        return (
            <div
                className="flex items-center justify-center h-screen bg-blue-50 text-blue-700 p-4 rounded-lg shadow-md">
                <span className="font-semibold">Loading...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-red-50 text-red-700 p-4 rounded-lg shadow-md">
                <AlertCircle className="w-6 h-6 mr-2 text-red-600"/>
                <span className="font-semibold">Error:</span>
                <span className="ml-1">{error.message || "An unexpected error occurred."}</span>
            </div>
        );
    }

    if (!parkingSpot) {
        return (
            <div
                className="flex items-center justify-center h-screen bg-yellow-50 text-yellow-700 p-4 rounded-lg shadow-md">
                <Info className="w-6 h-6 mr-2 text-yellow-600"/>
                <span className="font-semibold">Notice:</span>
                <span className="ml-1">No parking spot found.</span>
            </div>
        );
    }

    // Handle navigation dialog opening
    const handleNavigationClick = () => {
        setShowNavigationDialog(true);
    };

    // Handle navigation button clicks (Google Maps and Waze)
    const handleNavigate = (app: string) => {
        setShowNavigationDialog(false);
        if (app === "google") {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(parkingSpot.address)}`, "_blank");
        } else if (app === "waze") {
            window.open(`https://waze.com/ul?ll=0.0&navigate=yes&z=10`, "_blank");
        }
    };

    return (
        <div className="flex flex-col space-y-6 p-5 h-full bg-[var(--rented-background)] rounded-2xl shadow-xl">
            {/* Rental Confirmation (First thing user sees) */}
            <div className="flex justify-evenly items-center">
                <CheckCircle className="w-12 h-12 text-primary animate-pulse"/>
                <div>
                    <span className="text-3xl font-semibold">Parking Spot Rented!</span><br/>
                    <span
                        className="text-xl text-[var(--muted-foreground)]">Your spot is now reserved. You’re all set!</span>
                </div>
            </div>

            <Separator/>

            <div className="space-y-5 ps-5 pe-5">
                {/* Parking Spot Address */}
                <h3 className="text-2xl font-semibold text-[var(--foreground)]">{parkingSpot.address}</h3>

                {/* Rental Duration and Cost */}
                <div className="flex justify-between">
                    <span className="text-md text-[var(--muted-foreground)] font-medium">Rental Duration</span>
                    <span
                        className="text-lg font-semibold text-[var(--foreground)]">{rentalDuration.toFixed(2)} hours</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-md text-[var(--muted-foreground)] font-medium">Total Cost</span>
                    <span className="text-lg font-semibold text-[var(--foreground)]">${totalCost.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex-grow"/>

            {/* Buttons */}
            <div className="flex space-x-6">
                {/* Stop Rental Button */}
                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-3 shadow-md hover:shadow-lg transition-shadow duration-300 p-3 rounded-lg bg-primary text-primary-foreground"
                >
                    <XCircle className="w-6 h-6" />
                    <span className="text-lg">Stop Rental</span>
                </Button>

                {/* Navigate Button */}
                <NavigationDialog
                    isOpen={showNavigationDialog}
                    onOpenChange={setShowNavigationDialog}
                    onNavigate={handleNavigate}
                />
            </div>
        </div>
    );
};