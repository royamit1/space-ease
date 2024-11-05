import React, {useState} from "react";
import ParkingDetails from "@/components/parking-details";
import {useFooterState} from "@/hooks/useFooterState";
import {useParkingSpotById} from "@/hooks/useParkingSpots";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter, DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Car, X} from "lucide-react";
import {RentParkingDialog} from "@/components/rent-parking-dialog";


export const DetailFooter: React.FC = () => {
    const [selectedParkingId, setFooterState] = useFooterState(state => state.mode.mode === "detail" ? state.mode.id : null);
    const {data: parkingSpot, isLoading, error} = useParkingSpotById(selectedParkingId)
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!parkingSpot) {
        return <div>No parking spot found.</div>;
    }

    const handleRentConfirmation = () => {
        console.log("Rental confirmed for parking spot:", selectedParkingId);
        setIsDialogOpen(false);
    };

    return (
        <div className="flex flex-col w-full h-full overflow-hidden">
            <div className="flex-grow overflow-y-auto">
                <ParkingDetails parkingSpot={parkingSpot}/>
            </div>

            <div className="p-4 bg-gray-100">
                <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => setIsDialogOpen(true)}
                >
                    Rent Now
                </Button>
                <RentParkingDialog
                    isOpen={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    onConfirm={handleRentConfirmation}
                />
            </div>
        </div>
    );
};
