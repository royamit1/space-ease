import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {MapPin} from "lucide-react";

interface CreateParkingDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}

export const CreateParkingDialog: React.FC<CreateParkingDialogProps> = ({
                                                                            isOpen,
                                                                            onOpenChange,
                                                                            onConfirm,
                                                                        }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent
                className="w-[90vw] max-w-[425px] sm:w-[80vw] sm:max-w-[500px] md:w-[70vw] md:max-w-[600px] lg:w-[60vw] lg:max-w-[700px] xl:w-[50vw] xl:max-w-[800px] rounded-2xl bg-card shadow-lg border-0 min-w-[250px]"
            >
                <div>
                    <DialogHeader className="text-center space-y-4">
                        <div
                            className="mx-auto bg-secondary rounded-full p-3 w-16 h-16 flex items-center justify-center"
                        >
                            <MapPin className="w-8 h-8 text-primary"/>
                        </div>
                        <DialogTitle className="text-2xl font-bold text-card-foreground">
                            Confirm Parking Spot Creation
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Are you sure you want to create this parking spot?<br/>
                            Make sure all the details are correct.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col gap-3 pt-6 justify-center">
                        <Button
                            type="button"
                            onClick={onConfirm}
                            className="w-full bg-primary hover:bg-primary-foreground text-primary-foreground"
                        >
                            Create Parking Spot
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};
