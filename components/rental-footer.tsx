import React, {useState} from "react";
import {useParkingSpotById} from "@/hooks/useParkingSpots";
import {AlertCircle, CheckCircle, Info, XCircle} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {NavigationDialog} from "@/components/navigation-dialog";
import {ConfirmationButton} from "@/components/common/confirmation-button";
import {ActiveRent} from "@/prisma/generated/client";
import {formatDistance} from "date-fns";
import {endRenting} from "@/app/actions";
import {useQueryClient} from "@tanstack/react-query";
import {useFooterStore} from "@/hooks/useFooterState";
import {useNow} from "@/hooks/useNow";
import {calculateTotalCost} from "@/lib/rent";
import {AnimatedNumber} from "@/components/ui/animated-number";

export const RentalFooter: React.FC<{ activeRent: ActiveRent }> = ({activeRent}) => {
    const footerStore = useFooterStore()
    const queryClient = useQueryClient()
    const now = useNow(5000)
    const {data: parkingSpot, isLoading, error} = useParkingSpotById(activeRent.parkingSpotId);
    const [showNavigationDialog, setShowNavigationDialog] = useState(false);

    const [totalCost, rentalDurationText] = React.useMemo(() => {
        const totalCost = calculateTotalCost(activeRent, now);
        const rentalDurationText = formatDistance(now, activeRent.createdAt)
        return [totalCost, rentalDurationText]
    }, [activeRent, now])

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

    // Handle navigation button clicks (Google Maps and Waze)
    const handleNavigate = (app: string) => {
        setShowNavigationDialog(false);
        if (app === "google") {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(parkingSpot.address)}`, "_blank");
        } else if (app === "waze") {
            window.open(`https://waze.com/ul?ll=0.0&navigate=yes&z=10`, "_blank");
        }
    };

    const handleLeaveParking = async () => {
        await endRenting()
        await queryClient.invalidateQueries({ queryKey: ["activeRent"] })
        footerStore.setState({ mode: {mode: "search"}, size: "open" })
    }

    return (
        <div className="flex flex-col space-y-4 p-5 pt-2 h-full bg-[var(--rented-background)] rounded-2xl shadow-xl">
            {/* Rental Confirmation (First thing user sees) */}
            <div className="flex flex-row items-center justify-start mx-auto">
                <CheckCircle className="w-12 h-12 mx-6 text-primary animate-pulse"/>
                <div>
                    <h3 className="text-3xl font-semibold mb-2">Parking Spot Rented!</h3>
                    <span
                        className="text-lg">Your spot is now reserved. You’re all set!</span>
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
                        className="text-lg font-semibold text-[var(--foreground)]">{rentalDurationText}</span>
                </div>
                <div className="flex">
                    <span className="text-md text-[var(--muted-foreground)] font-medium">Total Cost </span>
                    <span className="text-lg font-semibold text-[var(--foreground)]"><AnimatedNumber value={totalCost} precision={2} stiffness={75} damping={15} /></span>
                </div>
            </div>

            <div className="flex-grow"/>

            {/* Buttons */}
            <div className="flex space-x-6">
                {/* Stop Rental Button */}
                <ConfirmationButton
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-3 shadow-md hover:shadow-lg transition-shadow duration-300 p-3 rounded-lg bg-primary text-primary-foreground"
                    onClick={handleLeaveParking}
                >
                    <XCircle className="w-6 h-6"/>
                    <span className="text-lg">Leave Parking</span>
                </ConfirmationButton>

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