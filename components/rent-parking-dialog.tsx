import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Car} from "lucide-react";

interface RentParkingDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}

export const RentParkingDialog: React.FC<RentParkingDialogProps> = ({
                                                                        isOpen,
                                                                        onOpenChange,
                                                                        onConfirm,
                                                                    }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] rounded-2xl bg-white shadow-lg border-0">
                <div>
                    <DialogHeader className="text-center space-y-4">
                        <div
                            className="mx-auto bg-blue-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                            <Car className="w-8 h-8 text-blue-500"/>
                        </div>
                        <DialogTitle className="text-2xl font-bold text-gray-800">
                            Confirm Rental
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Are you sure you want to rent this parking spot?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-center gap-4 pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={onConfirm}
                            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            Confirm Rental
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};