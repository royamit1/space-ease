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
            <DialogContent
                className="w-[90vw] max-w-[425px] sm:w-[80vw] sm:max-w-[500px] md:w-[70vw] md:max-w-[600px] lg:w-[60vw] lg:max-w-[700px] xl:w-[50vw] xl:max-w-[800px] rounded-2xl bg-card shadow-lg border-0 min-w-[250px]">
                <div>
                    <DialogHeader className="text-center space-y-4">
                        <div
                            className="mx-auto bg-secondary rounded-full p-3 w-16 h-16 flex items-center justify-center">
                            <Car className="w-8 h-8 text-primary"/>
                        </div>
                        <DialogTitle className="text-2xl font-bold text-card-foreground">
                            Confirm Rental
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Are you sure you want to rent this parking spot?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col gap-3 pt-6 justify-center">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="w-full border-border text-foreground hover:bg-muted"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={onConfirm}
                            className="w-full bg-primary hover:bg-primary-foreground text-primary-foreground"
                        >
                            Confirm Rental
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};