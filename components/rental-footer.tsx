import React, {useState} from "react";
import {useFooterState} from "@/hooks/useFooterState";
import {useParkingSpotById} from "@/hooks/useParkingSpots";
import {AlertCircle, CheckCircle, Info, MapPin, StopCircle} from "lucide-react";
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

export const RentalFooter: React.FC = () => {
    const [selectedParkingId, setFooterState] = useFooterState(state => state.mode.mode === "rent" ? state.mode.id : null);
    const {data: parkingSpot, isLoading, error} = useParkingSpotById(selectedParkingId);
    const [showNavigationDialog, setShowNavigationDialog] = useState(false);
    const [selectedButton, setSelectedButton] = useState<string | null>(null); // Track which button is selected

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
        <div className="space-y-6 p-6 bg-[var(--rented-background)] rounded-2xl shadow-xl">
            {/* Rental Confirmation (First thing user sees) */}
            <div className="bg-[var(--success-bg)] text-[var(--foreground)] rounded-xl flex items-center space-x-4">
                <CheckCircle className="w-12 h-12 text-[var(--success)] animate-pulse"/>
                <div>
                    <span className="text-3xl font-semibold">Parking Spot Rented!</span><br/>
                    <span className="text-xl text-[var(--muted-foreground)]">Your spot is now reserved. You’re all set!</span>
                </div>
            </div>

            {/* Parking Spot Address */}
            <div className="p-2 bg-[var(--secondary)] rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-2 text-[var(--foreground)]">{parkingSpot.address}</h3>
            </div>

            {/* Rental Duration and Cost */}
            <div
                className="space-y-4 p-2 bg-[var(--secondary)] rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="flex justify-between">
                    <span className="text-sm text-[var(--muted-foreground)] font-medium">Rental Duration</span>
                    <span
                        className="text-lg font-semibold text-[var(--foreground)]">{rentalDuration.toFixed(2)} hours</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[var(--muted-foreground)] font-medium">Total Cost</span>
                    <span className="text-lg font-semibold text-[var(--foreground)]">${totalCost.toFixed(2)}</span>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-6">
                {/* Stop Rental Button */}
                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-3 shadow-md hover:shadow-lg transition-shadow duration-300 p-3 rounded-lg border-[var(--primary)] text-[var(--primary)]"
                >
                    <StopCircle className="w-6 h-6"/>
                    <span className="text-lg">Stop Rental</span>
                </Button>

                {/* Navigate Button */}
                <Dialog open={showNavigationDialog} onOpenChange={setShowNavigationDialog}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={handleNavigationClick}
                            variant="outline"
                            className="w-full flex items-center justify-center space-x-3 shadow-md hover:shadow-lg transition-shadow duration-300 p-3 rounded-lg border-[var(--primary)] text-[var(--primary)]"
                        >
                            <MapPin className="w-6 h-6"/>
                            <span className="text-lg">Navigate</span>
                        </Button>
                    </DialogTrigger>

                    {/* Styled Navigation Options Dialog */}
                    <DialogContent
                        className="w-[90vw] max-w-[425px] sm:w-[80vw] sm:max-w-[500px] md:w-[70vw] md:max-w-[600px] lg:w-[60vw] lg:max-w-[700px] xl:w-[50vw] xl:max-w-[800px] rounded-3xl bg-card shadow-2xl border-0 min-w-[250px]">
                        <DialogHeader className="text-center space-y-6">
                            <div
                                className="mx-auto bg-secondary rounded-full p-4 w-20 h-20 flex items-center justify-center">
                                <MapPin className="w-10 h-10 text-primary"/>
                            </div>
                            <DialogTitle className="text-3xl font-semibold text-card-foreground">Select Navigation
                                App</DialogTitle>
                            <DialogDescription className="text-lg text-muted-foreground">
                                Choose your preferred navigation app to get directions to this parking spot.
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className="flex flex-col gap-5 pt-8 justify-center">
                            <Button
                                type="button"
                                onClick={() => handleNavigate("google")}
                                className="w-full p-4 rounded-lg bg-primary text-primary-foreground text-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                Google Maps
                            </Button>
                            <Button
                                type="button"
                                onClick={() => handleNavigate("waze")}
                                className="w-full p-4 rounded-lg bg-primary text-primary-foreground text-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                Waze
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};