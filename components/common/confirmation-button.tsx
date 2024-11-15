import {Button, ButtonProps} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import React, {useState} from "react";
import {TriangleAlert} from "lucide-react";

interface ConfirmationButtonProps extends ButtonProps {
}


export const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({onClick, ...props}) => {
    const [open, setOpen] = useState(false)

    return <>
        <Button {...props} onClick={() => setOpen(true)}/>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex flex-row items-center justify-center space-x-3 mb-6">
                        <div className="bg-secondary rounded-full p-3">
                            <TriangleAlert />
                        </div>
                        <h1 className="text-2xl">Are you sure?</h1>
                    </DialogTitle>
                </DialogHeader>
                <DialogFooter className="flex flex-row space-x-4">
                    <Button className="w-full" variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        className="w-full"
                        onClick={onClick}
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}
